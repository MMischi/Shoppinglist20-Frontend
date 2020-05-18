import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthenticationService } from "../shared/authentication.service";

interface Response {
    response: string;
    result: {
        token: string;
    };
}

@Component({
    selector: 'div.bs-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthenticationService
    ) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    login() {
        const val = this.loginForm.value;

        if (val.username && val.password) {
            this.authService.login(val.username, val.password).subscribe(res => {
                const resObj = res as Response;
                if (resObj.response === "success") {
                    this.authService.setLocalStorage(resObj.result.token);
                    this.router.navigateByUrl('/');
                }
            });
        }
    }
}
