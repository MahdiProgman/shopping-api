import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let loggerService: LoggerService;

  beforeEach(() => {
    loggerService = new LoggerService();
  });

  it.each(['info', 'warn', 'error'])(
    'should be log the text in %i level',
    (level) => {
      loggerService[level as keyof LoggerService](`this is ${level} log`);
    },
  );
});
