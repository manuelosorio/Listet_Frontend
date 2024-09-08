import {
  AfterViewChecked,
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appMasonry]',
  standalone: true,
})
export class MasonryDirective
  implements AfterViewInit, AfterViewChecked, OnDestroy {
  private resizeListener?: () => void;
  private mutationObserver?: MutationObserver;
  private readonly isBrowser: boolean;
  private readonly gap: any;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.gap = 16; // Adjust the value "16" to control the gap between items
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.positionItems();
      this.mutationObserver = new MutationObserver(() => {
        this.positionItems();
      });
      this.mutationObserver.observe(this.el.nativeElement, {
        childList: true,
        subtree: true,
      });
      this.resizeListener = this.renderer.listen(
        'window',
        'resize',
        this.positionItems.bind(this)
      );
    }
  }
  ngAfterViewChecked(): void {
    if (this.isBrowser) {
      this.positionItems();
    }
  }
  ngOnDestroy(): void {
    if (this.resizeListener) {
      this.resizeListener();
    }
  }

  private getNumberOfColumns(): number {
    const breakpoint: number = 768; // Change to your desired breakpoint
    return window.innerWidth >= breakpoint ? 2 : 1;
  }

  private positionItems(): void {
    const container = this.el.nativeElement;
    const items = container.children;

    if (items.length === 0) {
      return;
    }

    const columnWidth = items[0].offsetWidth;
    const numberOfColumns = this.getNumberOfColumns();
    const columnHeights = new Array(numberOfColumns).fill(0);

    Array.from(items).forEach((item: any): void => {
      const columnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      const posX = columnIndex * (columnWidth + this.gap);
      const posY = columnHeights[columnIndex];

      this.renderer.setStyle(
        item,
        'transform',
        `translateX(${posX}px) translateY(${posY}px)`
      );
      columnHeights[columnIndex] += item.offsetHeight + this.gap;
    });

    this.renderer.setStyle(
      container,
      'height',
      `${Math.max(...columnHeights)}px`
    );
  }
}
