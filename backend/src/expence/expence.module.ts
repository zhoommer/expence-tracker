import { Module } from '@nestjs/common';
import { ExpenceService } from './expence.service';
import { ExpenceController } from './expence.controller';

@Module({
  providers: [ExpenceService],
  controllers: [ExpenceController]
})
export class ExpenceModule {}
