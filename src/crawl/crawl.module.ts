import { PrismaService } from './../prisma/prisma.service';
import { Module, HttpModule } from '@nestjs/common';
import { CrawlService } from './crawl.service';

@Module({
  imports: [HttpModule],
  providers: [CrawlService, PrismaService]
})
export class CrawlModule {}
