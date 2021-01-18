import { PrismaService } from './../prisma/prisma.service';
import { PostService } from './../post/post.service';
import { Module, HttpModule } from '@nestjs/common';
import { CrawlService } from './crawl.service';

@Module({
  imports: [HttpModule],
  providers: [CrawlService, PostService, PrismaService]
})
export class CrawlModule {}
