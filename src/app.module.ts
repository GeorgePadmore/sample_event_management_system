import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { HttpInterceptor } from './httpInterceptor';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouteModule } from './route/route.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      // signOptions: {  },
      signOptions: { expiresIn: '24h' },
    }),
    RouteModule,
    AuthModule,
    // RouteModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpInterceptor,
    },
  ],
})
export class AppModule {}
