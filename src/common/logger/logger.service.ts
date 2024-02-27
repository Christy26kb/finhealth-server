import { Injectable } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';

@Injectable()
export class LoggerService {
  private readonly logger: Logger;
  private context: string;
  private static instance: LoggerService;

  constructor(context: string) {
    this.context = context;
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
      ),
      defaultMeta: { service: 'app' },
      transports: [
        new transports.Console({
          format: format.combine(
            format.timestamp(),
            format.colorize(),
            format.printf(
              (info) => `${info.level}: [${info.timestamp}]${info.message}`,
            ),
          ),
        }),
      ],
    });
  }

  private createLog(level: string, message: string) {
    const moduleName = this.context;
    const messageString =
      typeof message === 'object' && message
        ? JSON.stringify(message, null, 2)
        : message;
    this.logger.log(level, `[${moduleName}] ${messageString}`);
  }

  /**
   * Create the instance of the logger to be used across the application code.
   * @param {string} context The context of this logger instance to be printed.
   * @returns {LoggerService} The instance of the logger.
   */
  public static getInstance(context: string): LoggerService {
    LoggerService.instance = new LoggerService(context);
    return LoggerService.instance;
  }

  error(message: string) {
    this.createLog('error', message);
  }

  info(message: string) {
    this.createLog('info', message);
  }

  warn(message: string) {
    this.createLog('warn', message);
  }

  debug(message: string) {
    this.createLog('debug', message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
