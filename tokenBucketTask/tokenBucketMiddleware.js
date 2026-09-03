import TokenBucket from "./tokenBucketAlgorithm.js";

const buckets = new Map();

const CAPACITY = 10;
const REFILL_RATE = 5; // 5 requests per second

export function rateLimiter(req, res, next) {
  const clientId = req.ip;

  if (!buckets.has(clientId)) {
    buckets.set(
      clientId,
      new TokenBucket(CAPACITY, REFILL_RATE)
    );
  }

  const bucket = buckets.get(clientId);

  const allowed = bucket.consume();

  if (!allowed) {
    return res.status(429).json({
      success: false,
      message: "Too many requests. Try again later.",
    });
  }

  next();
}

export default rateLimiter