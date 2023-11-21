import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  provider: process.env.DB_PROIVDER,
  supabase_db_url: process.env.SUPABASE_DB_URL,
  supabase_shadow_db_url: process.env.SUPABASE_SHADOW_DB_URL,
}));
