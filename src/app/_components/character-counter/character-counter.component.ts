import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-counter',
  templateUrl: './character-counter.component.html',
  styleUrls: ['./character-counter.component.sass']
})
export class CharacterCounterComponent implements OnInit {
  public characterCount: number;
  colored: number
  grey: number
  @Input() minimumCount: number
  @Input() set characterCounter(value: number) {
    this.characterCount = value;
    const r = 27.5;
    const circleLength = 2*Math.PI*r;
    this.grey = circleLength - this.colored > 0 ? circleLength - this.colored : 0;
    this.colored = value > 0 ? (circleLength * value)/20: 1;

    console.log("Character Counter Thing: ", this.colored)
    console.log(value)
  }
  constructor() { }

  ngOnInit(): void {

    // let gray = circleLength - this.colored > 0 ? circleLength - this.colored : 0;

  }

}
