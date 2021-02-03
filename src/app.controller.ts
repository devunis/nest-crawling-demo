import { PrismaService } from 'src/prisma/prisma.service';
import { CrawlService } from './crawl/crawl.service';
import { AppService } from './app.service';
import { Body, Controller, Get, Param, Render, Res } from '@nestjs/common';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, 
    private crawlService: CrawlService,
    private prisma: PrismaService
  ){}

  @Get()
  @Render('index')
  async getHello() {
    const articlelist = await this.prisma.article.findMany().then(res=> res);
    
    return { 
      message : this.appService.getHello(),
      articles: articlelist.reverse()
    }
  }

  @Get('crawl')
  crawl(@Body() data: {link: string}){
    return this.crawlService.crawl(data.link);
  }

  // @Post('post')
  // async createDraft(
  //   @Body() postData: { link: string},
  // ): Promise<PostModel[]> {
  //   const { title, content} = await this.crawlService.crawl(postData.link);
  //   return this.postService.createPost({
  //     title,
  //     content,
  //   });
  // }

}
