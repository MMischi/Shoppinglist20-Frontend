import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Shoppinglist, User} from "../shared/shoppinglist";
import {ShoppinglistStoreService} from "../shared/shoppinglist-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShoppinglistFactory} from "../shared/shoppinglist-factory";
import {UserFactory} from "../shared/user-factory";
import {AuthenticationService} from "../shared/authentication.service";
import {FormBuilder} from "@angular/forms";
import {Comment} from "../shared/shoppinglist";

@Component({
  selector: 'bs-shoppinglist-details',
  templateUrl: './shoppinglist-details.component.html',
  styles: []
})
export class ShoppinglistDetailsComponent implements OnInit {

    shoppinglist: Shoppinglist = ShoppinglistFactory.empty();

    creator: User = UserFactory.empty();
    volunteer: User = UserFactory.empty();
    user: User;

    constructor(
        private fb: FormBuilder,
        private sls: ShoppinglistStoreService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const params = this.route.snapshot.params;

         // Es kam ein Arry zurück, daher s[0]
        this.sls.getSingle(params['id']).subscribe(s => {
           this.shoppinglist = s[0];

            const id = this.shoppinglist.creator_id;
            this.sls.getSingleUser(id).subscribe(res => {
                this.creator = res[0];
            });

            if(this.shoppinglist.volunteer_id != null) {
                const id = this.shoppinglist.volunteer_id;
                this.sls.getSingleUser(id).subscribe(res => {
                    this.volunteer = res[0];
                });
            }

            const currentUserId = AuthenticationService.getCurrentUserId();
            this.sls.getSingleUser(currentUserId).subscribe(res => {
                this.user = res[0];
            });
         });
    }

    updateStatus() {
        if(this.shoppinglist.status == 'open') {
            this.shoppinglist.status = "in Arbeit";
            this.shoppinglist.volunteer_id = this.user.id;

            this.sls.update(this.shoppinglist).subscribe(res => {
                this.router.navigate(['../../shoppinglists', this.shoppinglist.id],
                    { relativeTo: this.route });
            });
        }
    }

    closeList(price) {
        if(!isNaN(price) && price > 0) {
            this.shoppinglist.status = "closed";
            this.shoppinglist.price = price;

            this.sls.update(this.shoppinglist).subscribe(res => {
                this.router.navigate(['../../shoppinglists', this.shoppinglist.id],
                    { relativeTo: this.route });
            });
        } else {
            alert('Es muss ein Betrag (zB: 30.20) eingegeben werden!');
        }
    }

    comment(input: string) {
        input = `${this.user.firstName} ${this.user.lastName}: ${input}`;

        let newComment = new Comment(null, input, this.user.id);
        this.shoppinglist.comments.push(newComment);

        this.sls.update(this.shoppinglist).subscribe(res => {
            this.router.navigate(['../../shoppinglists', this.shoppinglist.id],
                { relativeTo: this.route });
        });
    }

    removeShoppinglist() {
        if(confirm('Shoppinglist wirklich löschen?')) {
            this.sls.remove(this.shoppinglist.id)
                .subscribe(res => this.router.navigate(['../']
                    , {relativeTo: this.route}));
        }
    }


}
