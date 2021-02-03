import { CrawlService } from './crawl/crawl.service';
import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrawlModule } from './crawl/crawl.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [CrawlModule, HttpModule],
  controllers: [AppController],
  providers: [AppService, CrawlService, PrismaService],
})
export class AppModule {}
