import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaderResponse, } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { ProductService } from "./product.service";
import { mergeMap, catchError } from "rxjs/operators";
@Injectable()
export class QingqiuInterceptor implements HttpInterceptor {
	constructor(
		public productService: ProductService,
	) { }

	// intercept函数中
	// 参数1原始请求信息， 
	// 参数2是请求与需要传递到的下一个http处理程序 
	// 返回的数据类型是流，http事件
	// intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	//     // 克隆一个请求，参数是对象，该对象是设置请求头的对象
	//     const myReq = req.clone({
	//         headers: req.headers.set(
	//             "Authorizationoooo", "myToken"
	//         )
	//     })
	//     // 给所有的请求添加拦截，设置请求头（设置了身份令牌token）然后放行克隆的请求
	//     return next.handle(myReq);
	// }


	// 比上面稍微复杂一点的拦截，请求拦截和响应拦截
	// 本例中返回的数据是响应头（不包含响应体）或者响应
	// next是HttpHandler类的实例
	// 该类型可以把HttpRequest转换成HttpEvent组成的流（包含HttpResponse）
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<
		| HttpHeaderResponse
		| HttpResponse<any>
	> {
		// 请求拦截： 给每个请求都设置了请求头（可以根据实际业务逻辑编写）
		const myReq = req.clone({
			headers: req.headers.set(
				"Authorizationoooo", "myToken"
			)
		})
		// next调用handle方法将请求准换为HttpEvent类型的流（一般是响应）
		return next.handle(myReq).pipe(
			// 当handle()的执行中没有报错则执行mergeMap函数
			mergeMap((event: HttpResponse<any>) => {
				// 对响应进行拦截操作
				return this.handleData(event)
			}),
			// 当handle()的执行中没报错则执行catchError函数
			catchError((err: HttpErrorResponse) => {
				// 对捕获到的错误进行拦截操作
			  return this.handleData(err)
			}),
		)
	}



	// 处理响应拦截的具体函数，参数是响应或者错误对象
	private handleData(
		event: HttpResponse<any> | HttpErrorResponse
	): Observable<any> {
		// 无论是响应还是响应头都能获得响应的状态吗
		switch (event.status) {
			case 200:
				if (event instanceof HttpResponse) {
					// 这里可以根据实际业务逻辑书写
					console.log("请求状态是200，请求成功");
					// bodyyyy是响应体，也就是后台返回的数据，
					// 同样也就是前端请求被订阅后subscribe的第一个参数函数中接收到的数据
					let bodyyyy: any = event.body;
					console.log(bodyyyy);
				}
				break;
			case 404:
				if(event instanceof HttpErrorResponse){
					console.log(this.productService.gotoUrl);
					// 调用了路由跳转事件，可根据实际业务写真实的逻辑
					this.productService.gotoUrl();
					console.log("请求不存在跳转到了登录页面");
				}
				break;
		}
		return of(event)
	}
}