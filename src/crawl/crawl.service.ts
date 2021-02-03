import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, HttpService } from '@nestjs/common';
import * as cheerio from 'cheerio';

@Injectable()
export class CrawlService {
    constructor(private http: HttpService, private prisma: PrismaService){}
    async crawl(link : string):Promise<any>{
        const crawl_uri = 'https://woowabros.github.io/'
        const data = await this.http.get(crawl_uri)
            .toPromise()
            .then(res=>res.data);
        const $ = cheerio.load(data);

        const list = $('.list-module');

        for (let i = 1; i <= list.length; i ++){
            const $data = $(list.eq(-i));
        
            const $id = $data.find('a').attr('href').split('/').slice(2).join('').replace('.html','');
            const $title = $data.find('.post-link').text()
            const $content = $data.find('.post-description').text()
            const $author = $data.find('.post-meta').text().split(',')[2].trim()
            const $img = $data.find('.gravatar').attr('src');
            const $url = $data.find('a').attr('href');

            await this.prisma.article.create({
                data:{
                    title: $title,
                    author: $author,
                    authorPic: $img,
                    url: `https://woowabros.github.io${$url}`,
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
        //     async(i, elem) => {
        //         const $data = $(elem);
        
        //         const $id = $data.find('a').attr('href').split('/').slice(2).join('-').replace('.html','');
        //         const $title = $data.find('.post-link').text()
        //         const $content = $data.find('.post-description').text()
        //         const $author = $data.find('.post-meta').text().split(',')[2].trim()
        //         const $img = $data.find('.gravatar').attr('src');
        //         const $url = $data.find('a').attr('href');

        //         console.log(i);
                

                // await this.prisma.article.create({
                //     data:{
                //         title: $title,
                //         author: $author,
                //         authorPic: $img,
                //         url: `https://woowabros.github.io/${$url}`,
                //         content: $content, 
                //         uid: $id,
                //     }
                // }).then(
                //     res=>console.log(res)
                // ).catch(
                //     err=>console.log(err)
                // )
                
        //       }
        // )
        return "done";
    }
}
