import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProductService, Product, Comment } from "../../shared/product.service";
import { StarsComponent } from "../stars/stars.component"
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  @ViewChild(StarsComponent)
  private starsComponent: StarsComponent;

  product;
  comments;
  productTitle: string;
  protectId: number;
  newRating: number = 5;
  newComment: string = "";
  isCommentHidden: boolean = true;
  btnContent: string = "点击显示评论框";
  // sum: number = 0;

  // 当前是否关注该股票的价格
  isWatched:boolean = false;
  currentBid:number;

  constructor(
    private routeInfo: ActivatedRoute,
    public productService: ProductService,
  ) { }

  ngOnInit() {
    // this.productTitle = this.routeInfo.snapshot.params["productTitle"]
    this.protectId = this.routeInfo.snapshot.params["id"];
    // this.product = this.productService.getProduct(this.protectId);
    // 由于product使用频率非常高因此采用手动订阅的方式更方便一些
    this.productService.getProduct(this.protectId).subscribe(
      (data) =>{ 
        this.product = data;
        this.currentBid = this.product.price;
       }
    );
    // 模板中使用comments的时候使用了异步管道
    this.comments = this.productService.getCommentsForProductId(this.protectId);
    // this.productService.getCommentsForProductId(this.protectId).subscribe(
    //   (data) =>{ this.comments = data }
    // )
  }

  // addComment() {
  //   if(!this.newComment.trim()){ return }
  //   let comment = new Comment(0, this.protectId, new Date().toString(), "someone", this.newRating, this.newComment);
  //   this.comments.unshift(comment);
  //   this.newComment = "";
  //   this.newRating = 5;
  //   // this.isCommentHidden = true;
  //   let sum = this.comments.reduce((sum, comment) => sum + comment.rating, 0);
  //   this.product.rating = sum/this.comments.length

  // }

  // ratingChange(i) {
  //   this.newRating = i + 1;
  // }

  isShowCommentTag(){
    this.isCommentHidden = !this.isCommentHidden;
    if(this.isCommentHidden){ 
      this.btnContent = "点击显示评论框" 
    }else{
      this.btnContent = "点击收回评论框"
    }
  }

  watchProduct() {
    this.isWatched = !this.isWatched;
  }

}
