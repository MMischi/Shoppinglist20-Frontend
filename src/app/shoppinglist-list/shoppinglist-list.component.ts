import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Address, Item, Shoppinglist, User } from "../shared/shoppinglist";
import {ShoppinglistStoreService} from "../shared/shoppinglist-store.service";
import {UserFactory} from "../shared/user-factory";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-shoppinglist-list',
  templateUrl: './shoppinglist-list.component.html',
  styles: []
})
export class ShoppinglistListComponent implements OnInit {

    filter = "open";
    shoppinglists: Shoppinglist[];
    user: User = UserFactory.empty();

    constructor(
        private sls: ShoppinglistStoreService,
        private authService: AuthenticationService
    ) { }

    @Output() showDetailsEvent = new EventEmitter<Shoppinglist>();

    ngOnInit(): void {
        const id = AuthenticationService.getCurrentUserId();
        this.sls.getSingleUser(id).subscribe(res => {
            this.user = res[0];

            if(this.user.flag == 'volunteer') {
                this.sls.getAllVolunteerId(this.user.id).subscribe(res => this.shoppinglists = res);
            } else {
                this.sls.getAllByUserId(this.user.id).subscribe(res => this.shoppinglists = res);
            }
        });
    }

    setFilter(choose: string) {
        this.filter = choose;
    }
}
