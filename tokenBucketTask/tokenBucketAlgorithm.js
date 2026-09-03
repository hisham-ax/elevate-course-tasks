class TokenBucket {
    constructor(capacity,refillRate) {
        this.capacity = capacity;
        this.refillRate = refillRate;
        this.tokens = capacity;
        this.lastRefill = Date.now();
    }
     consume() {
    const now = Date.now();

   
    const elapsed = (now - this.lastRefill) / 1000;

    
    this.tokens = Math.min(
      this.capacity,
      this.tokens + elapsed * this.refillRate
    );

    this.lastRefill = now;

   
    if (this.tokens < 1) {
      return false;
    }

    
    this.tokens--;

    return true;
  }

}
export default TokenBucket;