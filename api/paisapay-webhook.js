const crypto = require("crypto");

function decryptPayload(encryptedPayload, secretKey) {
  const key = Buffer.from(secretKey, "utf8");

  if (key.length !== 32) {
    throw new Error(
      `PAISAPAY_SECRET_KEY must be exactly 32 bytes. Current: ${key.length}`
    );
  }

  const normalizedPayload = String(
    encryptedPayload || ""
  ).replace(/ /g, "+");

  const decipher = crypto.createDecipheriv(
    "aes-256-ecb",
    key,
    null
  );

  decipher.setAutoPadding(true);

  let decrypted = decipher.update(
    normalizedPayload,
    "base64",
    "utf8"
  );

  decrypted += decipher.final("utf8");

  return JSON.parse(decrypted);
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const expectedToken = process.env.PAISAPAY_TOKEN;
    const secretKey = process.env.PAISAPAY_SECRET_KEY;

    if (!expectedToken || !secretKey) {
      console.error("PaisaPay credentials missing");
      return res.status(500).send("error");
    }

    const { token, payload } = req.body || {};

    if (!token || !payload) {
      console.error("Missing webhook data");
      return res.status(400).send("error");
    }

    if (token !== expectedToken) {
      console.error("Invalid PaisaPay webhook token");
      return res.status(401).send("error");
    }

    const payment = decryptPayload(
      payload,
      secretKey
    );

    console.log("PaisaPay Webhook:", payment);

    const {
      order_id,
      amount,
      status,
      utr,
      payment_time,
      udf1,
    } = payment;

    if (status === "SUCCESS") {
      console.log("PAYMENT SUCCESS", {
        order_id,
        amount,
        utr,
        payment_time,
        udf1,
      });

      /*
       * IMPORTANT:
       * Production ma ahi database/order status
       * PAID karvano.
       */
    } else if (status === "FAILED") {
      console.log("PAYMENT FAILED", {
        order_id,
        udf1,
      });
    } else {
      console.log("PAYMENT STATUS:", status);
    }

    /*
     * PaisaPay documentation requires
     * webhook acknowledgement as "success".
     */
    return res.status(200).send("success");
  } catch (error) {
    console.error("PaisaPay webhook error:", error);

    return res.status(400).send("error");
  }
};