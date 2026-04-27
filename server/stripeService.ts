import Stripe from "stripe";
import * as db from "./db";
import { ENV } from "./_core/env";

// Initialize Stripe (will use STRIPE_SECRET_KEY from env when available)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");

/**
 * Create a Stripe customer for a user
 */
export async function createStripeCustomer(userId: number, email: string, name?: string) {
  try {
    // Check if customer already exists
    const existing = await db.getStripeCustomerByUserId(userId);
    if (existing) {
      return existing;
    }

    // Create new customer in Stripe
    const customer = await stripe.customers.create({
      email,
      name: name || "",
      metadata: {
        userId: userId.toString(),
      },
    });

    // Save to database
    const saved = await db.getOrCreateStripeCustomer(userId, customer.id);
    return saved;
  } catch (error) {
    console.error("Error creating Stripe customer:", error);
    throw error;
  }
}

/**
 * Create a checkout session for subscription
 */
export async function createCheckoutSession(
  userId: number,
  stripePriceId: string,
  successUrl: string,
  cancelUrl: string
) {
  try {
    // Get or create Stripe customer
    const user = await db.getUserById(userId);
    if (!user) throw new Error("User not found");

    const customer = await createStripeCustomer(userId, user.email || "", user.name || "");

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.stripeCustomerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: userId.toString(),
      },
    });

    return session;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}

/**
 * Handle successful payment
 */
export async function handlePaymentSuccess(
  stripePaymentId: string,
  subscriptionId: number,
  amount: number
) {
  try {
    // Create payment record
    await db.createPayment({
      subscriptionId,
      stripePaymentId,
      amount: amount.toString(),
      status: "succeeded",
      paymentMethod: "card",
      paidAt: new Date(),
    });

    // Update subscription status to active
    await db.updateSubscriptionStatus(subscriptionId, "active");

    return { success: true };
  } catch (error) {
    console.error("Error handling payment success:", error);
    throw error;
  }
}

/**
 * Handle payment failure
 */
export async function handlePaymentFailure(
  stripePaymentId: string,
  subscriptionId: number,
  amount: number
) {
  try {
    // Create payment record
    await db.createPayment({
      subscriptionId,
      stripePaymentId,
      amount: amount.toString(),
      status: "failed",
      paymentMethod: "card",
    });

    // Update subscription status to pending
    await db.updateSubscriptionStatus(subscriptionId, "pending");

    return { success: true };
  } catch (error) {
    console.error("Error handling payment failure:", error);
    throw error;
  }
}

/**
 * Handle subscription update from webhook
 */
export async function handleSubscriptionUpdate(stripeSubscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);

    // Find subscription in database
    const subscriptions = await db.getAllPendingLinkRequests(); // This is a placeholder
    // In production, you'd query the subscriptions table by Stripe subscription ID

    return { success: true, subscription };
  } catch (error) {
    console.error("Error handling subscription update:", error);
    throw error;
  }
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(body: string, signature: string, secret: string): boolean {
  try {
    stripe.webhooks.constructEvent(body, signature, secret);
    return true;
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return false;
  }
}

/**
 * Get Stripe instance
 */
export function getStripe() {
  return stripe;
}
