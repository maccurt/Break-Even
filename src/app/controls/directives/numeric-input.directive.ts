import {
    Directive, ElementRef, OnInit,
    Input, ChangeDetectorRef, Output, EventEmitter,
    HostListener,
    OnChanges
} from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[numeric-input]' 
})
export class NumericInputDirective implements OnInit {
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter(false);

    @Input() min = 0;
    @Input() max!: number;
    @Input() decimals!: number;
    keyDownValue = '';
    previousKeyWasDecimal = false;

    constructor(private el: ElementRef, private change: ChangeDetectorRef) { }

    ngOnInit(): void {
        if (isNaN(this.decimals)) {
            this.decimals = 0;
        } else {
            this.decimals = Math.abs(Math.floor(this.decimals));
        }
    }

    @HostListener('paste', ['$event'])
    paste = (event: Event): void => {
        event.preventDefault();
    };

    @HostListener('keydown', ['$event'])
    keyDown = (event: KeyboardEvent): void => {
        if (this.previousKeyWasDecimal && event.key === '.') {
            // console.log('previous key was decimal prevent');
            event.preventDefault();
            return;
        }
        this.previousKeyWasDecimal = (event.key === '.');
        // Prevent the arrow down or up from changing the numeric input type from
        // changing the numer
        // tslint:disable-next-line
        if (event.keyCode === 40 || event.keyCode === 38) {
            event.preventDefault();
            return;
        }

        this.keyDownValue = this.el.nativeElement.value;
    };

    @HostListener('keyup', ['$event'])
    keyUp = (event: KeyboardEvent): void => {

        const inputValue = this.el.nativeElement.value;

        if (!isNaN(this.max)) {
            if (!isNaN(inputValue)) {
                const num = Number(inputValue);

                if (num > this.max) {
                    this.el.nativeElement.value = this.keyDownValue;
                    this.ngModelChange.emit(this.el.nativeElement.value);

                }
            }
        }

        // Dont allow negative but in first position
        if (inputValue.indexOf('-') > 0) {
            this.el.nativeElement.value = this.keyDownValue;
        }

        // Don't allow there to be more decmials than allowed.
        // Why do you not like this?
        // because it forces cursor to be at the end of the value it jumps the curor around
        // TODO can you fix the above issues?
        const decimalIndex = this.el.nativeElement.value.indexOf('.');
        if (decimalIndex >= 0) {
            const diff = this.el.nativeElement.value.length - decimalIndex;
            if (diff > this.decimals + 1) {
                this.el.nativeElement.value = this.keyDownValue;
            }
        }
    };

    @HostListener('keypress', ['$event'])
    checkInput = (event: KeyboardEvent): void => {

        // This was put in because Firefox was still getting here
        // tslint:disable-next-line
        if (event.keyCode === 8) {
            return;
        }

        const value: string = this.el.nativeElement.value;
        // tslint:disable-next-line
        const inputChar = String.fromCharCode(event.charCode);

        // Do not allow characters that don't represnt numbers
        // Can this logic be only calculated one and made testable
        const allowNegative = this.min < -0;
        const allowDecimalPrecision = this.decimals > 0;
        if (!this.checkNumericKey(allowNegative, allowDecimalPrecision, inputChar)) {
            event.preventDefault();
            return;
        }

        // don't allow multiple decimals
        if (value.indexOf('.') >= 0 && event.key === '.') {
            event.preventDefault();
            return;
        }

        // don't allow multiple negative sigh
        if (value.indexOf('-') >= 0 && event.key === '-') {
            event.preventDefault();
            return;
        }
    };

    checkNumericKey = (allowNegative: boolean, allowDecimalPrecision: boolean, character: string): boolean => {

        if (!allowNegative && allowDecimalPrecision) {
            return /[0-9\.\ ]/.test(character);
        }

        if (allowNegative && allowDecimalPrecision) {
            return /[0-9\.\-\ ]/.test(character);
        }

        return /[0-9]/.test(character);
    };

    getPattern = (allowNegative: boolean, allowDecimalPrecision: boolean): RegExp => {

        if (!allowDecimalPrecision && !allowNegative) {
            return new RegExp(/[0-9\ ]/);
        }

        if (allowNegative && allowDecimalPrecision) {
            return new RegExp(/^-?[0-9]?\d*(\.\d+)?$/);
        }

        return new RegExp(/[0-9\.\ ]/);
    };
}
