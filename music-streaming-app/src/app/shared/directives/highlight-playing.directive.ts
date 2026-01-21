import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[appHighlightPlaying]'
})
export class HighlightPlayingDirective implements OnChanges {
    @Input() appHighlightPlaying: boolean = false;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.appHighlightPlaying) {
            this.renderer.setStyle(this.el.nativeElement, 'background-color', 'rgba(63, 81, 181, 0.1)');
            this.renderer.setStyle(this.el.nativeElement, 'border-left', '4px solid #3f51b5');
        } else {
            this.renderer.removeStyle(this.el.nativeElement, 'background-color');
            this.renderer.removeStyle(this.el.nativeElement, 'border-left');
        }
    }
}
