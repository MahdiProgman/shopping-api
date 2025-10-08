import { loadConfig } from './load-config';

describe('loadConfig', () => {
  beforeEach(() => {
    process.env = {
      APP_PORT: '3030',
    };
  });

  it('should be return the configs successfully', () => {
    const config = loadConfig();

    expect(config).toEqual({
      app: {
        port: 3030,
      },
    });
  });

  it('should be throw an error because can not validate these envs', () => {
    process.env.APP_PORT = 'true';

    expect(() => loadConfig()).toThrow(Error);
  });
});
