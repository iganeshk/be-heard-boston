import { FormControl, FormArray, ValidatorFn, AbstractControl, FormGroup, Validators } from '@angular/forms';
export class MainModel {

    public code: string;
    codeArray: string[];
    public email: string;
    public data: any;
    public redeemed: number | string;

    public expectedRange?(equalControlValue): ValidatorFn {
        return (control: AbstractControl): {
            [key: string]: any;
        } => {
            if (control.value) {
                return control.value.toString().length == equalControlValue ? null : { expectedRange: true };
            } else {
                return null;
            }
        };
    }

    private customEmailValidator(controlName): ValidatorFn {
        return (control: AbstractControl): {
            [key: string]: any;
        } => {
            if (!control['_parent']) return null;

            if (!control['_parent'].controls[controlName]) throw new TypeError('Form Control ' + controlName + ' does not exists.');

            let controlMatch = control['_parent'].controls[controlName];

            // cehecking the field is dirty
            if (controlMatch.dirty === true) {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(controlMatch.value)) {
                    controlMatch.setErrors(null);
                    return null;
                } else {

                    return { email: true };
                }
            }

        };
    }

    public codeValidationRule() {
        return {
            code: new FormControl(null, this.expectedRange(6)),
            codeArray: new FormArray([
                new FormControl(null, Validators.required),
                new FormControl(null, Validators.required),
                new FormControl(null, Validators.required),
                new FormControl(null, Validators.required),
                new FormControl(null, Validators.required),
                new FormControl(null, Validators.required),
            ])
        };
    }

    public emailValidationRule() {
        return {
            email: new FormControl('', this.customEmailValidator('email')),
        };
    }
}
