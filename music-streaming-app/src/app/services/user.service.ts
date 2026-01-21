import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private user = {
        name: 'Demo User',
        email: 'demo@example.com'
    };

    constructor() { }

    getUser() {
        return this.user;
    }

    isAuthenticated(): boolean {
        return true; // Mock
    }
}
