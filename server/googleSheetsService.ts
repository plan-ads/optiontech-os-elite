import { google } from "googleapis";
import { JWT } from "google-auth-library";

// Parse Google Service Account credentials from environment
function getGoogleAuth() {
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_SHEETS_API_KEY not configured");
  }

  try {
    const credentials = JSON.parse(apiKey);
    const auth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive",
      ],
    });
    return auth;
  } catch (error) {
    throw new Error(`Failed to parse Google credentials: ${error}`);
  }
}

// Get Google Sheets client
function getSheetsClient() {
  const auth = getGoogleAuth();
  return google.sheets({ version: "v4", auth });
}

// Interface for customer data
export interface CustomerData {
  email: string;
  name: string;
  plan: "Free" | "Professional" | "Nuclear";
  accountId?: string;
  status: "active" | "inactive" | "pending";
  linkedAccounts?: string[];
  subscriptionDate?: string;
  expiryDate?: string;
}

/**
 * Read all customers from Google Sheet
 */
export async function readCustomersFromSheet(): Promise<CustomerData[]> {
  try {
    const sheets = getSheetsClient();
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!sheetId) {
      throw new Error("GOOGLE_SHEET_ID not configured");
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "'Account_Labels'!A:H",
    });

    const rows = response.data.values || [];
    if (rows.length === 0) {
      return [];
    }

    // Skip header row and parse data
    const customers: CustomerData[] = rows.slice(1).map((row: any[]) => ({
      email: row[0] || "",
      name: row[1] || "",
      plan: (row[2] || "Free") as "Free" | "Professional" | "Nuclear",
      accountId: row[3] || "",
      status: (row[4] || "active") as "active" | "inactive" | "pending",
      linkedAccounts: row[5] ? row[5].split(",") : [],
      subscriptionDate: row[6] || "",
      expiryDate: row[7] || "",
    }));

    return customers.filter((c) => c.email);
  } catch (error) {
    console.error("Error reading from Google Sheets:", error);
    throw error;
  }
}

/**
 * Write customer data to Google Sheet
 */
export async function writeCustomerToSheet(
  customer: CustomerData,
  rowIndex?: number
): Promise<void> {
  try {
    const sheets = getSheetsClient();
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!sheetId) {
      throw new Error("GOOGLE_SHEET_ID not configured");
    }

    const values = [
      [
        customer.email,
        customer.name,
        customer.plan,
        customer.accountId || "",
        customer.status,
        customer.linkedAccounts?.join(",") || "",
        customer.subscriptionDate || "",
        customer.expiryDate || "",
      ],
    ];

    const range = rowIndex
      ? `'Account_Labels'!A${rowIndex + 1}:H${rowIndex + 1}`
      : "'Account_Labels'!A:H";

    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    });
  } catch (error) {
    console.error("Error writing to Google Sheets:", error);
    throw error;
  }
}

/**
 * Update customer plan in Google Sheet
 */
export async function updateCustomerPlanInSheet(
  email: string,
  newPlan: "Free" | "Professional" | "Nuclear"
): Promise<void> {
  try {
    const customers = await readCustomersFromSheet();
    const customerIndex = customers.findIndex((c) => c.email === email);

    if (customerIndex === -1) {
      throw new Error(`Customer ${email} not found in sheet`);
    }

    const customer = customers[customerIndex];
    customer.plan = newPlan;
    customer.status = newPlan === "Free" ? "active" : "pending";

    await writeCustomerToSheet(customer, customerIndex);
  } catch (error) {
    console.error("Error updating customer plan:", error);
    throw error;
  }
}

/**
 * Add linked account to customer
 */
export async function addLinkedAccountToSheet(
  email: string,
  accountId: string
): Promise<void> {
  try {
    const customers = await readCustomersFromSheet();
    const customerIndex = customers.findIndex((c) => c.email === email);

    if (customerIndex === -1) {
      throw new Error(`Customer ${email} not found in sheet`);
    }

    const customer = customers[customerIndex];
    if (!customer.linkedAccounts) {
      customer.linkedAccounts = [];
    }

    if (!customer.linkedAccounts.includes(accountId)) {
      customer.linkedAccounts.push(accountId);
    }

    customer.status = "active";
    await writeCustomerToSheet(customer, customerIndex);
  } catch (error) {
    console.error("Error adding linked account:", error);
    throw error;
  }
}

/**
 * Get customer from sheet by email
 */
export async function getCustomerFromSheet(
  email: string
): Promise<CustomerData | null> {
  try {
    const customers = await readCustomersFromSheet();
    return customers.find((c) => c.email === email) || null;
  } catch (error) {
    console.error("Error getting customer from sheet:", error);
    throw error;
  }
}

/**
 * Sync subscription data to Google Sheet
 */
export async function syncSubscriptionToSheet(
  userId: string,
  email: string,
  planId: number,
  planName: string
): Promise<void> {
  try {
    const customer = await getCustomerFromSheet(email);

    if (customer) {
      customer.plan = (planName as any) || "Free";
      customer.status = planName === "Free" ? "active" : "pending";
      const customers = await readCustomersFromSheet();
      const index = customers.findIndex((c) => c.email === email);
      if (index !== -1) {
        await writeCustomerToSheet(customer, index);
      }
    } else {
      const newCustomer: CustomerData = {
        email,
        name: email.split("@")[0],
        plan: (planName as any) || "Free",
        status: planName === "Free" ? "active" : "pending",
        subscriptionDate: new Date().toISOString(),
      };
      await writeCustomerToSheet(newCustomer);
    }
  } catch (error) {
    console.error("Error syncing subscription to sheet:", error);
    throw error;
  }
}


/**
 * Get accounts for a specific user from Google Sheet
 * Returns all accounts linked to the user's email
 */
export async function getAccountsFromSheet(userEmail: string): Promise<any[]> {
  try {
    if (!userEmail) {
      return [];
    }

    // Get customer data from sheet
    const customer = await getCustomerFromSheet(userEmail);
    
    if (!customer || !customer.linkedAccounts) {
      return [];
    }

    // Parse linked accounts (they should be stored as comma-separated or JSON array)
    let accounts: any[] = [];
    
    if (typeof customer.linkedAccounts === "string") {
      try {
        // Try to parse as JSON array
        accounts = JSON.parse(customer.linkedAccounts);
      } catch {
        // If not JSON, try to split by comma
        accounts = customer.linkedAccounts
          .split(",")
          .map((account: string) => ({
            customerId: account.trim(),
            accountName: `Account ${account.trim()}`,
            accountEmail: userEmail,
            source: "sheets",
          }));
      }
    } else if (Array.isArray(customer.linkedAccounts)) {
      accounts = customer.linkedAccounts;
    }

    return accounts;
  } catch (error) {
    console.error("Error getting accounts from sheet:", error);
    return [];
  }
}

/**
 * Get all plans for a specific user from Google Sheet
 */
export async function getPlansFromSheet(userEmail: string): Promise<any> {
  try {
    if (!userEmail) {
      return null;
    }

    const customer = await getCustomerFromSheet(userEmail);
    
    if (!customer) {
      return null;
    }

    return {
      plan: customer.plan,
      status: customer.status,
      subscriptionDate: customer.subscriptionDate,
      expiryDate: customer.expiryDate,
    };
  } catch (error) {
    console.error("Error getting plans from sheet:", error);
    return null;
  }
}

/**
 * Validate account data from Google Sheet
 */
export async function validateAccountData(accountData: any): Promise<boolean> {
  try {
    // Check if required fields exist
    if (!accountData.customerId) {
      return false;
    }

    // Check if customer ID is valid (should be numeric)
    if (!/^\d+$/.test(accountData.customerId.toString())) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error validating account data:", error);
    return false;
  }
}
