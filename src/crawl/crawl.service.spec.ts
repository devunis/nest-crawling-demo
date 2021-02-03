import { HttpService, HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { load } from 'cheerio';
import { PrismaService } from '../prisma/prisma.service';

describe('CrawlService', () => {
  let http: HttpService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [PrismaService]
    }).compile();
    http = module.get<HttpService>(HttpService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', async () => {
    const crawl_uri = 'https://woowabros.github.io/'
    const body = await http.get(crawl_uri)
            .toPromise()
            .then(res=>res.data);
    
    const $ = load(body);

    const list = $('.list-module');

    for (let i = 1; i <= list.length; i ++){
      const $data = $(list.eq(-i));
        
      const $id = $data.find('a').attr('href').split('/').slice(2).join('').replace('.html','');
      const $title = $data.find('.post-link').text()
      const $content = $data.find('.post-description').text()
      const $author = $data.find('.post-meta').text().split(',')[2].trim()
      const $img = $data.find('.gravatar').attr('src');
      const $url = crawl_uri + $data.find('a').attr('href');

      console.log($id);
      console.log(i, '# title : ', $title);
      console.log('content : ' ,$content);
      console.log('author : ', $author);
      console.log('img : ', $img);
      console.log('url : ', $url);

      await prisma.article.create({
        data:{
          title: $title,
          author: $author,
          authorPic: $img,
          url: `https://woowabros.github.io/${$url}`,
          content: $content, 
          uid: $id,
        }
      }).then(
        res=>console.log(res)
      ).catch(
        err=>console.log(err)
      )
      
    }




    // $('.list-module').each(
    //   async (i, elem) => {
    //     const $data = $(elem);

    //     const $id = $data.find('a').attr('href').split('/').slice(2).join('').replace('.html','');
    //     const $title = $data.find('.post-link').text()
    //     const $content = $data.find('.post-description').text()
    //     const $author = $data.find('.post-meta').text().split(',')[2].trim()
    //     const $img = $data.find('.gravatar').attr('src');
    //     const $url = crawl_uri + $data.find('a').attr('href');
        
        // console.log('id : ', $id);
        // console.log(i, '# title : ', $title);
        // console.log('content : ' ,$content);
        // console.log('author : ', $author);
        // console.log('img : ', $img);
        // console.log('url : ', $url);

        // await prisma.article.create({
        //   data:{
        //       title: $title,
        //       author: $author,
        //       authorPic: $img,
        //       url: `https://woowabros.github.io/${$url}`,
        //       content: $content, 
        //       uid: $id,
        //   }
        // }).then(
        //   res=>console.log(res)
        // ).catch(
        //   err=>console.log(err)
        // )

    //   }
    // )
  });

});
