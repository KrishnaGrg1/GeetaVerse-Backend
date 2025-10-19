import { Module, Global } from '@nestjs/common';
import { FileReaderUtil } from './utils/file-reader.util';

@Global()
@Module({
  providers: [FileReaderUtil],
  exports: [FileReaderUtil],
})
export class CommonModule {}
