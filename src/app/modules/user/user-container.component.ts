import { Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../core/firebase-auth-service';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss']
})
export class UserContainerComponent implements OnInit {
  public errorMessages$ = this.afAuthService.authErrorMessages$;
  public user$ = this.afAuthService.user$;
  public isLoading$ = this.afAuthService.isLoading$;
  public loginForm: FormGroup;
  public hide = true;
  submitted = false;
  email: string;
  password: string;
  error;

  constructor(private formBuilder: FormBuilder,
    private afAuthService: FirebaseAuthService,
    private route:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
    console.log(this.loginForm.valid);
  }
  
  get f() { return this.loginForm.controls; }

  private createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  public signUp() {
    this.submitted = true;
    console.log(this.loginForm.value);
    console.log(this.loginForm.valid);
    this.checkFormValidity(() => {
      this.afAuthService.signUpFirebase(this.loginForm.value);
    });
  }

  public login() {
    console.log(this.loginForm.value);
    this.checkFormValidity(() => {
      this.afAuthService.loginFirebase(this.loginForm.value);
      this.route.navigateByUrl('/notes');
    });
  }

  private checkFormValidity(cb) {
    if (this.loginForm.valid) {
      cb();
    } else {
      this.errorMessages$.next("Please enter correct Email and Password value");
    }
  }

  public logOut() {
    this.afAuthService.logOutFirebase();
  }

  public getErrorMessage(controlName: string, errorName: string): string {
    const control = this.loginForm.get(controlName);
    return control.hasError("required")
      ? "You must enter a value"
      : control.hasError(errorName)
        ? `Not a valid ${errorName}`
        : "";
  }
}
