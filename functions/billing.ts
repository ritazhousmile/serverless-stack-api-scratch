import Stripe from "stripe";
import { calculateCost } from "./libs/billing-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event: any, context: any) {
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = "Scratch charge";

  // Load our secret key from the environment variables
  const stripe = new Stripe(process.env.stripeSecretKey || "");

  try {
    await stripe.charges.create({
      source,
      amount,
      description,
      currency: "usd"
    });
    return success({ status: true });
  } catch (e: any) {
    console.log("Error processing payment:", e.message);
    return failure({ message: e.message });
  }
} 