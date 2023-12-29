import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  auth_provider: process.env.AUTH_PROVIDER,
  cognito_user_pool_id: process.env.AWS_COGNITO_USER_POOL_ID,
  cognito_client_id: process.env.AWS_COGNITO_CLIENT_ID,
  cognito_user_pool_region: process.env.AWS_COGNITO_USER_POOL_REGION,
  cognito_authority: `${process.env.AWS_COGNITO_AUTHORITY_PREFIX}${process.env.AWS_COGNITO_USER_POOL_REGION}${process.env.AWS_COGNITO_USER_POOL_ID}`,
}));
