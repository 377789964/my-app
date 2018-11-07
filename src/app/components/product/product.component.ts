import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../shared/product.service"
import { FormControl } from '@angular/forms';
import { filter, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  private product: Observable<any>;
  private keyWord;

  private titleFilter:FormControl = new FormControl()
  
  constructor(
    public productService: ProductService,
  ) {

    this.titleFilter.valueChanges.pipe(debounceTime(500))
      .subscribe(
        val => this.keyWord = val
      )

  }

  ngOnInit() {
    this.product = this.productService.getProducts();
    // 订阅productService中发布的事件searchEvent
    this.productService.searchEvent.subscribe((val) => {
      // 订阅到服务发布的事件后调用服务的search函数
      console.log(val)
      this.product = this.productService.search(val)
    })

    // this.product = [
    //   new Product(1, "第一个商品", 1.99, 1.5, "这是第一个商品，angular6股票管理系统", ["电子产品", "硬件设备"]),
    //   new Product(2, "第二个商品", 2.99, 2.5, "这是第二个商品，angular6股票管理系统", ["硬件设备"]),
    //   new Product(3, "第三个商品", 3.99, 3.5, "这是第三个商品，angular6股票管理系统", ["电子产品", "硬件设备"]),
    //   new Product(4, "第四个商品", 4.99, 4.5, "这是第四个商品，angular6股票管理系统", ["图书"]),
    //   new Product(5, "第五个商品", 5.99, 3.5, "这是第五个商品，angular6股票管理系统", ["电子产品", "个人护理"]),
    //   new Product(6, "第六个商品", 6.99, 2.5, "这是第六个商品，angular6股票管理系统", ["个人护理"]),
    //   new Product(7, "第七个商品", 7.99, 4.5, "这是第七个商品，angular6股票管理系统", ["电子产品", "硬件设备"]),

    // ]
  }

}

// export class Product {

//   constructor(
//     public id: number,
//     public title: string,
//     public price: number,
//     public rating: number,
//     public desc: string,
//     public categories: Array<string>,
//   ){

//   }
// }
