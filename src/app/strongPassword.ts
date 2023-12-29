import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export function strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    // Define your password strength criteria here
    const hasUpperCase = /[A-Z]/.test(control.value);
    const hasLowerCase = /[a-z]/.test(control.value);
    const hasDigit = /\d/.test(control.value);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
    const isStrong =
      hasUpperCase && hasLowerCase && hasDigit && hasSpecialCharacter;

    return isStrong ? null : { weakPassword: true };
  };
}
