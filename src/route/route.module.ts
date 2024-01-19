import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [RouteController],
  providers: [RouteService, AuthController, AuthService],
})
export class RouteModule {}
