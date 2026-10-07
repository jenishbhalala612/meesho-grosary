const crypto = require("crypto");

function encryptPayload(data, secretKey) {
  const key = Buffer.from(secretKey, "utf8");

  if (key.length !== 32) {
    throw new Error(
      `PAISAPAY_SECRET_KEY must be exactly 32 bytes. Current: ${key.length}`
    );
  }

  const cipher = crypto.createCipheriv(
    "aes-256-ecb",
    key,
    null
  );

  cipher.setAutoPadding(true);

  let encrypted = cipher.update(
    JSON.stringify(data),
    "utf8",
    "base64"
  );

  encrypted += cipher.final("base64");

  return encrypted;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { amount, mobile } = req.body || {};

    const numericAmount = Number(amount);

    if (
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment amount",
      });
    }

    const cleanMobile = String(mobile || "")
      .replace(/\D/g, "")
      .slice(-10);

    if (cleanMobile.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Valid 10 digit mobile number required",
      });
    }

    const token = process.env.PAISAPAY_TOKEN;
    const secretKey = process.env.PAISAPAY_SECRET_KEY;

    if (!token || !secretKey) {
      return res.status(500).json({
        success: false,
        message: "PaisaPay credentials are not configured",
      });
    }

    const orderId = `ORD_${Date.now()}`;

    const payloadData = {
      amount: numericAmount.toFixed(2),
      mobile: cleanMobile,
      udf1: orderId,
    };

    const encryptedPayload = encryptPayload(
      payloadData,
      secretKey
    );

    return res.status(200).json({
      success: true,

      orderId,

      paymentUrl:
        "https://pay.paisapay.site/create_order.php",

      token,

      payload: encryptedPayload,
    });
  } catch (error) {
    console.error("PaisaPay create payment error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to start payment",
    });
  }
};