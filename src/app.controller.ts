import { CrawlService } from './crawl/crawl.service';
import { AppService } from './app.service';
import { Body, Controller, Get, Param, Post, Render, Res } from '@nestjs/common';
import {PostService} from './post/post.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, 
    private crawlService: CrawlService, 
    private readonly postService: PostService){}

  @Get()
  @Render('index')
  async getHello() {
    const postlist = await this.postService.posts({}).then(res=> res)
    
    return { 
      message : this.appService.getHello(),
      posts: postlist
    }
  }

  @Get('crawl')
  crawl(@Body() data: {link: string}){
    return this.crawlService.crawl(data.link);
  }

  @Get('post/:id')
  async getPostById(@Param('id') id: number) : Promise<{}> 
  {
    return (await this.postService.post({ id: Number(id) })).content;
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
