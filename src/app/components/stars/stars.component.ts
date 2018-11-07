import { Component, OnInit, Input, Output, EventEmitter, OnChanges, } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit, OnChanges {

  @Input() rating:number = 0;

  stars:boolean[] = [];

  @Input() readonly:boolean = true;

  @Output() ratingChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
    // console.log(this.rating)
    this.stars = [];
    for(let i=1; i<=5; i++){
      this.stars.push(i>this.rating)
    }
  }

  clickStar(i) {
    if(this.readonly){ return }
    this.rating = i +1;
    this.ngOnInit();
    this.ratingChange.emit(i+1);
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  // stars = [
  //   true,
  //   true,
  //   false,
  //   false,
  //   true,
  // ]

}
