const express = require("express");
const app = express.Router();
const Order = require("../models/Order");
const cors = require("cors");
const Cart = require('../models/Cart');
app.use(cors());
// app.use(express.static(process.env.STATIC_DIR));
app.use(express.urlencoded({ extended: true }));

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const bodyParser = require("body-parser");
const { createOrder } = require("../controller/order");
const protect = require("../middlewares/protect");
const sendEmail = require("../utils/sendEmail");
const getAdminInvoiceTempate = require("../utils/adminInvoiceTemplate");
app.use(bodyParser.raw({ type: "*/*" }));
app.post("/create-checkout-session", protect, async (req, res) => {
  try {
    const domainURL = process.env.FRONTEND_DOMAIN;
    const savedOrder = await createOrder(req, res);
    const sessionObject = {
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "sgd",
            product_data: {
              name: "Sunshine",
            },
            unit_amount: parseInt((savedOrder?.total || 0) * 100),
          },
          quantity: parseInt(1),
        },
      ],

      success_url: `${domainURL}/checkout?completed=true&orderId=${savedOrder._id}`,
      cancel_url: `${domainURL}/error.html`,
    };

    const session = await stripe.checkout.sessions.create(sessionObject);
    await Order.findByIdAndUpdate(savedOrder?._id, { sessionId: session.id });

    // console.log(result);
    res.json({ url: session.url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Stripe requires the raw body to construct the event
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      // On error, log and return the error message
      console.log(`❌ Error message: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Successfully constructed event
    console.log("✅ Success:", event.id);
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log("PaymentIntent was successful!");
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        console.log("PaymentMethod was attached to a Customer!");
        break;
      case "checkout.session.completed":
        const foundOrder = await Order.findOne({
          sessionId: event.data.object.id,
        })
          .populate({
            path: "items",
            populate: {
              path: "product",
              model: "Product",
            },
          })
          .populate("drawingStyle");
        if (!foundOrder) {
          return res
            .status(404)
            .json({ message: "Error while placing the order" });
        }
        foundOrder.isPayment = true;
        const updateResult = await foundOrder.save();
        console.log(updateResult);
        console.log("DONEE");
        await Cart.findOneAndDelete({
          user: foundOrder.user,
        });
        let template = getAdminInvoiceTempate(foundOrder);
        sendEmail(
          process.env.ADMIN_EMAIL,
          template,
          "You have recieved a new Order"
        );
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }
);

module.exports = app;
