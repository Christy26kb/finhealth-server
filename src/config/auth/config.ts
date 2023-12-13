import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  auth_provider: process.env.AUTH_PROVIDER,
  cognito_user_pool_id: process.env.AWS_COGNITO_USER_POOL_ID,
  cognito_client_id: process.env.AWS_COGNITO_CLIENT_ID,
}));
