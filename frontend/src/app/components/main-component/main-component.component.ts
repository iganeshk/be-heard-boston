import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup  } from '@angular/forms';

import { MainService } from './../../services/main.service';
@Component({
    selector: 'app-main-component',
    templateUrl: './main-component.component.html',
    styleUrls: ['./main-component.component.css']
})

export class MainComponentComponent implements OnInit {
    @ViewChild('focus') focusField: ElementRef;
    loaded: boolean = true;
    goBack: boolean = false;
    successResponse: boolean = false;
    errorResponse: boolean = false;
    focused: boolean = false;
    isValidCode: boolean = true;
    enteredCode: string = null;
    claimUrl: string = '';
    code: any;
    codeArray: number[] = [];
    public codeFG: FormGroup;
    public emailFG: FormGroup;

    public customPatterns = { '0': { pattern: new RegExp('\[a-zA-Z0-9\]') } };

    constructor(
        private fb: FormBuilder,
        private renderer2: Renderer2,
        private mainService: MainService
    ) { }

    ngOnInit() {
        setTimeout(() => {
            this.focusField.nativeElement.focus();
        }, 15);
    }

    codeSubmit() {
        this.loaded = false;
        this.isValidCode = true;
        this.mainService.checkCode({code : this.code})
            .subscribe((response: any) => {

                if (response.data === false) {
                    this.loaded = true;
                    this.isValidCode = false;
                    this.focusField.nativeElement.focus();
                } else {
                    this.enteredCode = response.data.code;
                    this.claimPrize(this.enteredCode);
                }
            });

    }

    private claimPrize(code) {
        this.mainService.claimPrize({code : code})
            .subscribe((response) => {
                setTimeout(() => {
                    this.goBack = true;
                    this.successResponse = true;
                    this.loaded = true;
                    this.claimUrl = response.data.claim_url;
                }, 2000);
            }, error => {
                this.goBack = true;
                this.errorResponse = true;
                this.loaded = true;
            });
    }

    private resetPage() {
        this.enteredCode = null;
        this.goBack = false;
        this.successResponse = false;
        this.errorResponse = false;
        this.code = '';
        this.codeArray = [];
        this.isValidCode = true;
        setTimeout(() => {
            this.focusField.nativeElement.focus();
        }, 15);
    }

    splitCode() {
        this.codeArray = this.code.slice('');
    }

}
