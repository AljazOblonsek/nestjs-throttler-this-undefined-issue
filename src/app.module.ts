import { ExecutionContext, Injectable, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Injectable()
class CustomThrottlerGuard extends ThrottlerGuard {
  protected generateKey(
    context: ExecutionContext,
    suffix: string,
    name: string,
  ): string {
    return this.generateKeyCustomMethod();
  }

  private generateKeyCustomMethod(): string {
    return 'some key from private method.';
  }
}

@Module({
  imports: [ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }])],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule {}
