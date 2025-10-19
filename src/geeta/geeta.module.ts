import { Module } from '@nestjs/common';
import { GeetaController } from './geeta.controller';
import { GeetaService } from './geeta.service';
import { FileReaderUtil } from '../common/utils/file-reader.util';

@Module({
  controllers: [GeetaController],
  providers: [GeetaService, FileReaderUtil],
  exports: [GeetaService],
})
export class GeetaModule {}
