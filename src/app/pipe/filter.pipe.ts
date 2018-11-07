import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  // 参数一：流入管道的数据（数组类型） 必写参数
  // 参数二：过滤的字段（也就是使用数组中值的哪个属性来进行过滤）可写参数
  // 参数三：过滤的关键字 可写参数
  transform(list: any[], filterrFiled: string, keyWord: string): any {
    // 如果科协参数中有任何一个不存在则返回流入的数据
    if(!filterrFiled || !keyWord){ return list }
    // 返回一个数组，过滤掉属性中没有关键字的项
    return list.filter( item => {
      let filedValue = item[filterrFiled]
      return filedValue.indexOf(keyWord) >= 0
    });
  }

}
