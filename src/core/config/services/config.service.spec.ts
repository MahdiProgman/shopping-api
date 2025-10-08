jest.mock('../utils/load-config', () => ({
  loadConfig: () => ({
    app: {
      port: 3030,
    },
  }),
}));

import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let configService: ConfigService;

  beforeEach(() => {
    configService = new ConfigService();
  });

  it('should be return app config successfully', () => {
    const result = configService.getAppConfig();

    expect(result).toEqual({
      port: 3030,
    });
  });
});
