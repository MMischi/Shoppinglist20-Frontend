import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from "./shared/authentication.service";
import {ShoppinglistStoreService} from "./shared/shoppinglist-store.service";
import {User} from "./shared/shoppinglist";

@Component({
    selector: 'bs-root',
    templateUrl: './app.component.html',
    styles: []
})

export class AppComponent {

    user: User;

    constructor (
        private authService: AuthenticationService
    ) { }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    getLoginLabel() {
        if(this.isLoggedIn()) {
            return "Logout";
        } else {
            return "Login";
        }
    }

    logout(){
        this.authService.logout();
    }
}
