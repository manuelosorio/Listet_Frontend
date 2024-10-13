import { Component, input, Input, InputSignal, OnInit } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-character-counter',
  templateUrl: './character-counter.component.html',
  styleUrls: ['./character-counter.component.sass'],
  standalone: true,
  imports: [NgStyle, FeatherModule, NgIf],
})
export class CharacterCounterComponent implements OnInit {
  public characterCount!: number;
  public maxCharacterCount!: number;
  public coloredArea!: number;
  public coloredArea2!: number;
  public greyedArea!: number;
  public greyedArea2!: number;
  public radius!: number;
  public radius2!: number;
  minimumCharacters: InputSignal<number> = input<number>(0);
  maximumCharacters: InputSignal<number> = input<number>(0);
  @Input() set CharacterCounter(value: number) {
    this.minCharacterIndicator(value);
    this.maxCharacterIndicator(value);
  }
  constructor() {}

  ngOnInit(): void {
    this.radius = 27.5;
    const circleLength = 2 * Math.PI * this.radius;
    this.coloredArea =
      this.characterCount > 0 ? (circleLength * this.characterCount) / 20 : 1;
    this.greyedArea =
      circleLength - this.coloredArea > 0 ? circleLength - this.coloredArea : 0;

    this.radius2 = this.minimumCharacters() ? this.radius + 4 : this.radius;
    const circleLength2 = 2 * Math.PI * this.radius2;
    this.coloredArea2 =
      this.maxCharacterCount > 0
        ? (circleLength * this.maxCharacterCount) / 500
        : 0;
    this.greyedArea2 =
      circleLength2 - this.coloredArea2 > 0
        ? circleLength2 - this.coloredArea2
        : 0;
  }

  private minCharacterIndicator(value: number) {
    this.characterCount = value;
    const circleLength = 2 * Math.PI * this.radius;
    this.coloredArea = value > 0 ? (circleLength * value) / 20 : 1;
    this.greyedArea =
      circleLength - this.coloredArea > 0 ? circleLength - this.coloredArea : 0;
  }
  private maxCharacterIndicator(value: number) {
    this.maxCharacterCount = value;
    const circleLength = 2 * Math.PI * this.radius2;
    this.coloredArea2 = value > 0 ? (circleLength * value) / 500 : 0;
    this.greyedArea2 =
      circleLength - this.coloredArea2 > 0
        ? circleLength - this.coloredArea2
        : 0;
  }
}
