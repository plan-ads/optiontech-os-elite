import { describe, it, expect, beforeAll } from "vitest";
import { readCustomersFromSheet } from "./googleSheetsService";

describe("Google Sheets Integration", () => {
  beforeAll(() => {
    // Verify environment variables are set
    expect(process.env.GOOGLE_SHEETS_API_KEY).toBeDefined();
    expect(process.env.GOOGLE_SHEET_ID).toBeDefined();
  });

  it("should read customers from Google Sheet", async () => {
    try {
      const customers = await readCustomersFromSheet();
      expect(Array.isArray(customers)).toBe(true);
      console.log(`✅ Successfully read ${customers.length} customers from Google Sheet`);
    } catch (error) {
      console.error("❌ Failed to read from Google Sheet:", error);
      throw error;
    }
  });

  it("should have valid customer data structure", async () => {
    try {
      const customers = await readCustomersFromSheet();
      if (customers.length > 0) {
        const customer = customers[0];
        expect(customer).toHaveProperty("email");
        expect(customer).toHaveProperty("plan");
        expect(customer).toHaveProperty("status");
        console.log("✅ Customer data structure is valid");
      }
    } catch (error) {
      console.error("❌ Failed to validate customer data:", error);
      throw error;
    }
  });
});
