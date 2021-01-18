import { PostService } from './../post/post.service';
import { Injectable, HttpService } from '@nestjs/common';
import cheerio = require('cheerio')

@Injectable()
export class CrawlService {
    constructor(private http: HttpService, private postService: PostService){}
    async crawl(link : string):Promise<any>{
        const data = await this.http.get(`https://woowabros.github.io/`)
            .toPromise()
            .then(res=>res.data);
        const $ = cheerio.load(data);

        $('.list-module').each(
            async ()=>{
                console.log(this);
                
                const $meta = $(this).find('.postmeta').text();
                const $title = $(this).find('.post-link').text();
                const $description = $(this).find('.post-description').text();
                const $img = $(this).find('.gravatar').attr('src');
                const $url = $(this).find('a.list-module');
                

                // const route = $url.attr('href');
                // const content = await this.http.get(`https://woowabros.github.io/${route}`)
                //     .toPromise()
                //     .then(res=>res.data);
                // const $content = cheerio.load(content);
                // const contents =  $content('.post-content').html();

                // this.postService.createPost(
                //     {'title': $title, 'content': contents }
                // )
                // console.log('-----------------------------------');
            }
        )

        // for (let i = 0 ; i < 5; i ++){
        //     const title = $title.eq(i).html();

        //     console.log($title.eq(i).html());
        //     console.log($description.eq(i).html());
        //     console.log($meta.eq(i).text().trim());
        //     // console.log($img.eq(i).attr('src'));

        //     const route = $url.eq(i).attr('href');
        //     const content = await this.http.get(`https://woowabros.github.io/${route}`)
        //         .toPromise()
        //         .then(res=>res.data);
        //     const $content = cheerio.load(content);
        //     const contents =  $content('.post-content').html();

        //     this.postService.createPost(
        //         {title, 'content':contents }
        //     )
        //     console.log(i);
            
        //     console.log('-----------------------------------');
        // }

        return "done";
    }
}
