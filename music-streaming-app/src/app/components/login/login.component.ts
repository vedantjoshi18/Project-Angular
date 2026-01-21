import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginData = { email: '', password: '' };

    constructor(private router: Router, private snackBar: MatSnackBar) { }

    onSubmit(form: NgForm) {
        if (form.valid) {
            console.log('Login data', this.loginData);
            this.snackBar.open('Login Successful!', 'OK', { duration: 3000 });
            this.router.navigate(['/songs']);
        }
    }
}
