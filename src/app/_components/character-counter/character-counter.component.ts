import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-counter',
  templateUrl: './character-counter.component.html',
  styleUrls: ['./character-counter.component.sass']
})
export class CharacterCounterComponent implements OnInit {
  public characterCount: number;
  public maxCharacterCount: number;
  public coloredArea: number;
  public coloredArea2: number;
  public greyedArea: number;
  public greyedArea2: number;
  public radius: number;
  public radius2: number;
  @Input() minimumCharacters: number;
  @Input() maximumCharacters: number;
  @Input() set minCharacterCounter(value: number) {
    this.characterCount = value;
    const circleLength = 2*Math.PI*this.radius;
    this.coloredArea = value > 0 ? (circleLength * value)/20 : 1;
    this.greyedArea = circleLength - this.coloredArea > 0 ? circleLength - this.coloredArea : 0;
  }
  @Input() set maxCharacterCounter(value: number) {
    this.maxCharacterCount = value;
    const circleLength = 2*Math.PI*this.radius2;
    this.coloredArea2 = value > 0 ? (circleLength * value)/500 : 0;
    this.greyedArea2 = circleLength - this.coloredArea2 > 0 ? circleLength - this.coloredArea2 : 0;
  }
  constructor() {
  }

  ngOnInit(): void {
    this.radius = 27.5;
    const circleLength = 2*Math.PI*this.radius;
    this.coloredArea = this.characterCount > 0 ? (circleLength * this.characterCount)/20 : 1;
    this.greyedArea = circleLength - this.coloredArea > 0 ? circleLength - this.coloredArea : 0;

    this.radius2 = this.minimumCharacters !== undefined ? this.radius + 4 : this.radius;
    const circleLength2 = 2*Math.PI*this.radius2;
    this.coloredArea2 = this.maxCharacterCount > 0 ? (circleLength * this.maxCharacterCount)/500 : 0;
    this.greyedArea2 = circleLength2 - this.coloredArea2 > 0 ? circleLength2 - this.coloredArea2 : 0;
  }

}
