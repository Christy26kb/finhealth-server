import { registerAs } from '@nestjs/config';

export default registerAs('application', () => ({
  env: process.env.NODE_ENV,
  desc: process.env.APP_DESC,
  name: process.env.APP_NAME,
  url: process.env.APP_URL,
  port: process.env.APP_PORT,
  version: process.env.APP_VERSION,
}));
