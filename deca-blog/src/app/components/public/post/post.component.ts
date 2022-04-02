import { Component, OnInit } from '@angular/core';
import { IArticleResponse } from 'src/app/_models/apiResponseModels/ArticleResponse';
import { IGetArticleModel } from 'src/app/_models/IGetArticleModel';
import { RequestParams } from 'src/app/_models/requestParams';
import { ArticleService } from 'src/app/_services/_article_service/article.service';
import { Router } from '@angular/router';
declare let alertify: any;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
 articleInfo: IGetArticleModel[];
 requestParams: RequestParams = { PageNumber : 1 , PerPage : 7 };
  loading: boolean;
  constructor( private articleService: ArticleService, private router : Router) { }

  onScroll(){
    this.requestParams.PerPage+=7;
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.loading = true;
    this.articleService.getArticle(this.requestParams).subscribe((data)=>{
      let getData: IArticleResponse = data.Data;
      this.articleInfo = getData.Data;

      

      
      console.log(this.articleInfo)

      if(this.articleInfo.length > 0){
        this.articleInfo.forEach(element => {
         if(element.Tags.length >= 3)
         element.Tags = element.Tags.slice(0,3);
        });
      }
      
      this.loading = false;
    },
    (error)=> {
      this.loading = false;
    } 
   )
  }
}