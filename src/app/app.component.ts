import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import * as $ from 'jquery';
// import 'jquery-ui'

declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  dataSourse:Observable<any>;
  wrongHttp:Observable<any>;
  products:Array<any> = [];

  constructor(
    // private http: Http, //比较早的版本使用http
    private http: HttpClient,
    // angular4.3版本以后开始使用httpClient
  ){
    // 设置请求头
    // let myHeader:Headers = new Headers();
    // myHeader.append("Authorization", "Basic 123456");
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": "Basic 123456"
      })
    }
    // 注意这部分代码只是定义了一个get请求，并没有发送（参数1地址，canshu2请求头）
    this.dataSourse = this.http.get("/api/stock", httpOptions).pipe(
      // map((item) => item.json()),
      // 在比较早的版本下可以使用json(),httpClient中默认就会是JSON响应因此使用的话会报错json不是一个function
    )

    this.wrongHttp = this.http.get("/api/stockkkk", httpOptions)
  }

  ngOnInit () {
    // console.log($);
    // 只有在订阅的时候上面定义的get请求才会发送了
    this.dataSourse.subscribe(
      (data) => { 
        console.log(data);
        this.products = data;//对后台返回的数据进行操作
      }    
    )


    $(".son").draggable({
      containment: '.father',
      cursor: 'move'
    });

 
    $(".father1").niceScroll({
      touchbehavior: false,
      cursorcolor: "gray",
      cursoropacitymax: 1,
      cursorwidth: 5,
      cursorborder: "none",
      cursorborderradius: "4px",
      background: "rgba(0,0,0,.3)",
      autohidemode: true
    });

    
  }

  wrong() {
    this.wrongHttp.subscribe(
      (data) => {},
      (err) => {
        console.error("错误被捕获了" + err);
      }
    )
  }

}
