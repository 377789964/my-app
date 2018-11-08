import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, find } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // products = [
  //   new Product(1, "第一个商品", 1.99, 1.5, "这是第一个商品，入门学习", ["电子产品", "硬件设备"]),
  //   new Product(2, "第二个商品", 2.99, 2.5, "这是第二个商品，入门学习", ["硬件设备"]),
  //   new Product(3, "第三个商品", 3.99, 3.5, "这是第三个商品，入门学习", ["电子产品", "硬件设备"]),
  //   new Product(4, "第四个商品", 4.99, 4.5, "这是第四个商品，入门学习", ["图书"]),
  //   new Product(5, "第五个商品", 5.99, 3.5, "这是第五个商品，入门学习", ["电子产品", "个人护理"]),
  //   new Product(6, "第六个商品", 6.99, 2.5, "这是第六个商品，入门学习", ["个人护理"]),
  //   new Product(7, "第七个商品", 7.99, 4.5, "这是第七个商品，入门学习", ["电子产品", "硬件设备"]),
  // ];

  // comments = [
  //   new Comment(1, 1, "2017-02-02 22:22:22", "张三", 3, "东西不错"),
  //   new Comment(2, 1, "2017-02-03 22:22:22", "李四", 3, "东西不错"),
  //   new Comment(3, 2, "2017-03-02 22:22:22", "王五", 3, "东西不错"),
  //   new Comment(4, 1, "2017-04-02 22:22:22", "哇国", 3, "东西不错"),
  //   new Comment(5, 2, "2017-05-02 22:22:22", "丽丽", 3, "东西不错"),
  //   new Comment(6, 1, "2017-06-02 22:22:22", "晓红", 3, "东西不错"),
  //   new Comment(7, 2, "2017-07-02 22:22:22", "蒙蒙", 3, "东西不错"),
  //   new Comment(8, 2, "2017-08-02 22:22:22", "蒙蒙", 3, "东西不错"),
  //   new Comment(9, 2, "2017-09-02 22:22:22", "丽丽", 3, "东西不错"),
  //   new Comment(10, 3, "2017-10-02 22:22:22", "晓红", 3, "东西不错"),
  //   new Comment(11, 4, "2017-11-02 22:22:22", "哇国", 3, "东西不错"),
  //   new Comment(12, 5, "2017-12-02 22:22:22", "王五", 3, "东西不错"),
  // ]


  constructor(
    private http: HttpClient,
    public router: Router,
  ) { }

  // 路由跳转
  gotoUrl(val?) {
    if(val){
      this.router.navigate([val])
    }else {
      this.router.navigate(["/ProductDetail", 2]);
    }
  }

  getProducts(): Observable<any>{
    // return this.products;
    return this.http.get("/api/stock");
  }

  getProduct(id: number): Observable<any> {
    // return this.products.find((item) => {return item.id == id})
    return this.http.get("/api/stock/"+id);
  }

  getCommentsForProductId(id: number): Observable<any>{
    // return this.comments.filter((item) => {return item.productId == id})
    return this.http.get("/api/comments/"+id+"/comments");
  }

  getAllCategories(): string[] {
    return ["电子产品", "硬件设备", "图书", "个人护理"];
  }

  // <>中应该写传递的数据类型，typeScript是强数据类型的语言，any是不指定数据类型
  searchEvent:EventEmitter<any> = new EventEmitter()

  search(params: ProductServiceParams): Observable<any> {
    // get方式发送请求参数1请求路径，参数对象，对象中有很多属性，包含参数，请求头等信息
    console.log(params);
    // return this.http.post("/api/ppp", null ,this.encodeParams6(params))
    // return this.http.post("/api/ppp", {
    //   title: "123456",
    //   id: "123",
    // })
    return this.http.get("/api/stock", this.encodeParams6(params));
  }

  httpOptions = {
    params: new HttpParams().set("price", "4"),
    headers: new HttpHeaders({
      "Authorization": "Basic 123456"
    })
  }

  paramsData = {
    params: new HttpParams().set("price", "4").set("name", "123456")
  }

  // 格式化提交给后台数据的函数(angular4.3以后新版本的新写法HttpParams类型)
  encodeParams6(data){
    let res = new HttpParams(); //angular4.3以后提交参数是HttpParams类型的数据
    let {keys, values, entries} = Object;
    for (let [key, value] of entries(data)) {
      if(value){
      //angular4.3以后使用set(参数1， 参数2)方法添加要提交的数据
      // 参数1是键，参数2是值，键值都是字符串格式
        res = res.set(key, value+"") 
      }
   }
   //该对象是get方法的第二个参数对象，定义了对象中的params属性
    return { params: res } 
  }


// 格式化提交给后台数据的函数(angular4.3以前版本的新写法ProductServiceParams类型)
  encodeParams(params: ProductServiceParams){
    let res: URLSearchParams;
    res = Object.keys(params)// 将对象中所有的键取出来组层一个数组
          .filter(key => params[key]) // 对数组进行过滤，如果对象的键没有值则过滤掉（只剩下有值的键）
// reduce是数组的一个方法，参数一是函数（数组每项都会执行该函数），参数二是执行该函数的一个初始值
          // 函数中接收4个参数分别是：
          // 参数1是上次调用后的返回值，也就是执行本次函数的初始值
          // 参数2，数组中当前被处理的元素
          // 参数3，当前元素在数组中的索引
          // 参数4调用reduce的数组
          .reduce((sum: URLSearchParams, key: string) => {
            sum.append(key, params[key]);
            return sum;
          }, new URLSearchParams())
    return res;
  }


}



export class ProductServiceParams {
  constructor(
    public name: string,
    public price: number,
    public categorry: string,
  ){}
}

export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>,
  ){}
}

export class Comment {
  constructor(
    public id: number,
    public productId: number,
    public timmestamp: string,
    public user: string,
    public rating: number,
    public content: string,
  ){}
}

