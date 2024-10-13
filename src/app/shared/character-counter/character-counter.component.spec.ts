import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterCounterComponent } from './character-counter.component';
import { IconsModule } from '@modules/icons/icons.module';

describe('CharacterCounterComponent', () => {
  let component: CharacterCounterComponent;
  let fixture: ComponentFixture<CharacterCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCounterComponent, IconsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set characterCount and maxCharacterCount correctly', () => {
    component.CharacterCounter = 10;
    expect(component.characterCount).toBe(10);
    expect(component.maxCharacterCount).toBe(10);
  });

  it('should update coloredArea and greyedArea correctly', () => {
    component.CharacterCounter = 10;
    const circleLength = 2 * Math.PI * component.radius;
    expect(component.coloredArea).toBe((circleLength * 10) / 20);
    expect(component.greyedArea).toBe(circleLength - component.coloredArea);
  });

  it('should update coloredArea2 and greyedArea2 correctly', () => {
    component.CharacterCounter = 10;
    const circleLength2 = 2 * Math.PI * component.radius2;
    expect(component.coloredArea2).toBe((circleLength2 * 10) / 500);
    expect(component.greyedArea2).toBe(circleLength2 - component.coloredArea2);
  });

  it('should set coloredArea to 1 when characterCount is 0', () => {
    component.CharacterCounter = 0;
    expect(component.coloredArea).toBe(1);
  });

  it('should calculate coloredArea correctly when characterCount is greater than 0', () => {
    component.CharacterCounter = 10;
    const circleLength = 2 * Math.PI * component.radius;
    expect(component.coloredArea).toBe((circleLength * 10) / 20);
  });

  it('should set greyedArea to 0 when coloredArea is equal to circleLength', () => {
    component.CharacterCounter = 20;
    expect(component.greyedArea).toBe(0);
  });

  it('should set coloredArea2 to 0 when maxCharacterCount is 0', () => {
    component.CharacterCounter = 0;
    expect(component.coloredArea2).toBe(0);
  });

  it('should calculate coloredArea2 correctly when maxCharacterCount is greater than 0', () => {
    component.CharacterCounter = 10;
    const circleLength2 = 2 * Math.PI * component.radius2;
    expect(component.coloredArea2).toBe((circleLength2 * 10) / 500);
  });

  it('should set greyedArea2 to 0 when coloredArea2 is equal to circleLength2', () => {
    component.CharacterCounter = 500;
    expect(component.greyedArea2).toBe(0);
  });
  it('should set radius2 to radius when minimumCharacters is undefined', () => {
    expect(component.radius2).toBe(component.radius);
  });

  it('should greyedArea to 0 when characterCount is greater than maxCharacterCount', () => {
    component.CharacterCounter = 30;
    expect(component.greyedArea).toBe(0);
  });
  it('should greyedArea2 to 0 when characterCount is greater than maxCharacterCount', () => {
    component.CharacterCounter = 515;
    expect(component.greyedArea2).toBe(0);
  });
});
