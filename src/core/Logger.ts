import { ILogger } from './interfaces';

/**
 * Logger implementation - Single Responsibility Principle
 */
export class Logger implements ILogger {
  constructor(private readonly prefix: string) {}

  log(...args: unknown[]): void {
    console.log(`[${this.prefix}]`, ...args);
  }

  warn(...args: unknown[]): void {
    console.warn(`[${this.prefix}]`, ...args);
  }

  error(...args: unknown[]): void {
    console.error(`[${this.prefix}]`, ...args);
  }
}
