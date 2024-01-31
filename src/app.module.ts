import { Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';

import { AppConfigModule } from './config/app/app-config.module';
import { AppConfigService } from './config/app/app-config.service';
import { DatabaseConfigModule } from './config/db/db-config.module';
import { AuthConfigModule } from './config/auth/auth-config.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { IncomesModule } from './modules/incomes/incomes.module';

/**
 * App Module
 *
 * @module
 */
@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    AppConfigModule,
    DatabaseConfigModule,
    AuthConfigModule,
    AuthModule,
    UsersModule,
    ProfilesModule,
    IncomesModule,
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppModule {}
