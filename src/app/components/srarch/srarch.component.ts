import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, RequiredValidator } from '@angular/forms';
import { ProductService } from "../../shared/product.service"

@Component({
  selector: 'app-srarch',
  templateUrl: './srarch.component.html',
  styleUrls: ['./srarch.component.scss']
})
export class SrarchComponent implements OnInit {

  formModel: FormGroup;
  categories: string[];


  constructor(
    public productService: ProductService,
  ) {
    let fb = new FormBuilder();
    this.formModel = fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, this.positiveNumberValdator],],
      category: ['-1'],
      // 默认值给成-1就是不校验
    })
  }

  ngOnInit() {
    this.categories = this.productService.getAllCategories();
  }

  positiveNumberValdator(control: FormControl){
    if(!control.value){return null;}
    let price = parseInt(control.value);
    if(price > 0){
      return null
    }else {
      return {positiveNumber: true}
    }
  }

  onSearch(){
    if(this.formModel.valid){
      this.productService.searchEvent.emit(this.formModel.value);
    }
  }


}


