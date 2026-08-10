// Simple logging utility for the application
export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
  error?: Error;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";

  private log(entry: LogEntry) {
    const logMessage = `[${entry.timestamp}] [${entry.level}] ${entry.message}`;
    
    switch (entry.level) {
      case LogLevel.DEBUG:
        if (this.isDevelopment) {
          console.debug(logMessage, entry.context || "", entry.error || "");
        }
        break;
      case LogLevel.INFO:
        console.info(logMessage, entry.context || "");
        break;
      case LogLevel.WARN:
        console.warn(logMessage, entry.context || "");
        break;
      case LogLevel.ERROR:
        console.error(logMessage, entry.context || "", entry.error || "");
        break;
    }
  }

  debug(message: string, context?: Record<string, unknown>) {
    this.log({
      level: LogLevel.DEBUG,
      message,
      timestamp: new Date().toISOString(),
      context,
    });
  }

  info(message: string, context?: Record<string, unknown>) {
    this.log({
      level: LogLevel.INFO,
      message,
      timestamp: new Date().toISOString(),
      context,
    });
  }

  warn(message: string, context?: Record<string, unknown>) {
    this.log({
      level: LogLevel.WARN,
      message,
      timestamp: new Date().toISOString(),
      context,
    });
  }

  error(message: string, error?: Error, context?: Record<string, unknown>) {
    this.log({
      level: LogLevel.ERROR,
      message,
      timestamp: new Date().toISOString(),
      error,
      context,
    });
  }
}

export const logger = new Logger();
