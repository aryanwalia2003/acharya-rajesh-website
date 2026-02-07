/**
 * Custom Snowflake ID Generator
 * Generates 53-bit time-sortable unique IDs safe for JavaScript Numbers.
 *
 * Structure (53 bits):
 * - 41 bits: Timestamp (milliseconds since custom EPOCH)
 * - 5 bits: Worker ID (0-31)
 * - 7 bits: Sequence (0-127)
 */

export class IdGenerator {
  private static instance: IdGenerator;

  // Configuration Constants
  private readonly EPOCH = 1704067200000; // January 1, 2024
  private readonly WORKER_ID_BITS = 5;
  private readonly SEQUENCE_BITS = 7;

  // Limits
  private readonly MAX_WORKER_ID = Math.pow(2, this.WORKER_ID_BITS) - 1; // 31
  private readonly MAX_SEQUENCE = Math.pow(2, this.SEQUENCE_BITS) - 1; // 127

  // Multipliers (Using math instead of bitwise << to avoid 32-bit truncation in JS)
  private readonly WORKER_ID_MULTIPLIER = Math.pow(2, this.SEQUENCE_BITS); // 128
  private readonly TIMESTAMP_MULTIPLIER = Math.pow(
    2,
    this.SEQUENCE_BITS + this.WORKER_ID_BITS
  ); // 4096

  // State
  private workerId: number;
  private sequence: number = 0;
  private lastTimestamp: number = -1;

  private constructor(workerId: number = 1) {
    if (workerId > this.MAX_WORKER_ID || workerId < 0) {
      throw new Error(`Worker ID must be between 0 and ${this.MAX_WORKER_ID}`);
    }
    this.workerId = workerId;
  }

  /**
   * Singleton Accessor
   * @param workerId Optional worker ID (only used on first initialization)
   */
  public static getInstance(workerId: number = 1): IdGenerator {
    if (!IdGenerator.instance) {
      IdGenerator.instance = new IdGenerator(workerId);
    }
    return IdGenerator.instance;
  }

  /**
   * Generates the next unique ID
   * @returns number (Safe 53-bit integer)
   */
  public nextId(): number {
    let timestamp = Date.now();

    // Clock moved backwards check
    if (timestamp < this.lastTimestamp) {
      throw new Error(
        `Clock moved backwards. Refusing to generate ID for ${
          this.lastTimestamp - timestamp
        }ms`
      );
    }

    // If generating in the same millisecond
    if (this.lastTimestamp === timestamp) {
      // Increment sequence and mask with max sequence
      this.sequence = (this.sequence + 1) & this.MAX_SEQUENCE;

      // Sequence overflow (more than 128 IDs in 1ms) -> Wait for next ms
      if (this.sequence === 0) {
        timestamp = this.waitNextMillis(this.lastTimestamp);
      }
    } else {
      // New millisecond, reset sequence
      this.sequence = 0;
    }

    this.lastTimestamp = timestamp;

    // Math logic to construct the 53-bit number
    // (timestamp - epoch) << 12 | workerId << 7 | sequence
    const id =
      (timestamp - this.EPOCH) * this.TIMESTAMP_MULTIPLIER +
      this.workerId * this.WORKER_ID_MULTIPLIER +
      this.sequence;

    return id;
  }

  /**
   * Busy-wait loop until the next millisecond
   */
  private waitNextMillis(lastTimestamp: number): number {
    let timestamp = Date.now();
    while (timestamp <= lastTimestamp) {
      timestamp = Date.now();
    }
    return timestamp;
  }
}

// Export a singleton instance by default
export const idGenerator = IdGenerator.getInstance(
  Number(process.env.WORKER_ID) || 1
);
