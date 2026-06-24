import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { OperatorController } from './operator/operator.controller';
import { OfficerController } from './officer/officer.controller';
import { ApiController } from './api/api.controller';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  controllers: [AuthController, OperatorController, OfficerController, ApiController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
