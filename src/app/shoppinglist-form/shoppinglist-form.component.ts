import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ShoppinglistFactory} from "../shared/shoppinglist-factory";
import {ShoppinglistStoreService} from "../shared/shoppinglist-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Item} from "../shared/item";
import {Shoppinglist} from "../shared/shoppinglist";
import {AuthenticationService} from "../shared/authentication.service";
import {getToken} from "codelyzer/angular/styles/cssLexer";

@Component({
    selector: 'bs-shoppinglist-form',
    templateUrl: './shoppinglist-form.component.html',
    styles: []
})
export class ShoppinglistFormComponent implements OnInit {

    shoppinglistForm: FormGroup;
    shoppinglist = ShoppinglistFactory.empty();
    minDate = new Date();

    errors: { [key:string]: string } = {};

    isUpdatingShoppinglist = false;
    items: FormArray;

    constructor(
        private fb: FormBuilder,
        private sls: ShoppinglistStoreService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {

        const id = this.route.snapshot.params['id'];

        if (id) {
            this.isUpdatingShoppinglist = true;
            this.sls.getSingle(id).subscribe(s => {
                this.shoppinglist = s[0];
                this.initShoppinglist();
            });
        }

        this.initShoppinglist();

    }


    initShoppinglist() {
        this.buildItemArray();

        this.shoppinglistForm = this.fb.group({
            id: this.shoppinglist.id,
            title:    [this.shoppinglist.title, Validators.required ],
            due_date: [this.shoppinglist.due_date, Validators.required ],

            items: this.items
        });
    }

    buildItemArray () {
        if(this.shoppinglist.list_items.length == 0) {
            this.shoppinglist.list_items.push(new Item(null, '', null, '', null))
        }

        this.items = this.fb.array(
            this.shoppinglist.list_items.map(
                i => this.fb.group({
                    id:         this.fb.control(i.id),
                    title:      this.fb.control(i.title),
                    amount:     this.fb.control(i.amount),
                    extra_info: this.fb.control(i.extra_info),
                    max_price:  this.fb.control(i.max_price)
                })
            )
        );
    }

    addItemControl() {
        this.items.push(this.fb.group({ title: null, amount: null, extra_info: null, max_price: null }));
    }

    submitForm() {
        const shoppinglist: Shoppinglist = ShoppinglistFactory.fromObject(this.shoppinglistForm.value);
        shoppinglist.list_items = this.shoppinglistForm.value.items;

        let validate = this.errorHandling(shoppinglist);

        if(this.isUpdatingShoppinglist && validate == true) {
            shoppinglist.creator_id = this.shoppinglist.creator_id;
            shoppinglist.status = this.shoppinglist.status;

            this.sls.update(shoppinglist).subscribe(res => {
                this.router.navigate(['../../shoppinglists', shoppinglist.id],
                    { relativeTo: this.route });
            });
        } else if(validate == true) {
            // user
            shoppinglist.creator_id = AuthenticationService.getCurrentUserId();
            shoppinglist.status = 'open';

            this.sls.create(shoppinglist).subscribe(res => {
                this.shoppinglist = ShoppinglistFactory.empty();
                this.shoppinglistForm.reset(ShoppinglistFactory.empty());
                this.router.navigate(['../shoppinglists'],
                    { relativeTo: this.route });
            });
        }
    }

    errorHandling(shoppinglist): boolean {
        if (shoppinglist.title == null) {
            alert("Ein Einkauslisten Name ist verpflichtend!");
            return false;
        }

        if (shoppinglist.due_date < this.minDate) {
            alert("Bitte kontrollieren Sie das Datum. Dieses muss in der Zukunft liegen!");
            return false;
        }

        if((shoppinglist.list_items[0].title == null)
            || (shoppinglist.list_items[0].amount == null)
            || (shoppinglist.list_items[0].max_price == null)) {
            alert("Es muss mindestens ein Artikel der Einkaufsliste hinzugefügt werden." +
                "\nTitel, Menge und maximaler Preis sind verpflichtende Felder.");
            return false;
        }


        for (let i = 0; i < shoppinglist.list_items.length; i++) {
            if ((shoppinglist.list_items[i].title == null
                || shoppinglist.list_items[i].title == "")

                && (shoppinglist.list_items[i].amount == null
                || shoppinglist.list_items[i].amount == "")

                && (shoppinglist.list_items[i].extra_info == null
                || shoppinglist.list_items[i].extra_info == "")

                && (shoppinglist.list_items[i].max_price == null
                || shoppinglist.list_items[i].max_price == "")) {
                continue;
            } else {
                if (shoppinglist.list_items[i].title == null) {
                    alert("Ein Artikel besitzt keinen Titel.");
                    return false;
                }

                if (isNaN(shoppinglist.list_items[i].amount) || shoppinglist.list_items[i].amount < 1) {
                    alert("Ein Artikel besitzt keine gültige Menge (größer 0).");
                    return false;
                }

                if (isNaN(shoppinglist.list_items[i].max_price) || shoppinglist.list_items[i].max_price < 0) {
                    alert("Ein Artikel besitzt keinen gültigen Betrag (größer 0)." +
                        "\nNotiz: Verwenden Sie für das Komma einen Punkt (zB 2.30).");
                    return false;
                }
            }
        }

        return true;
    }

}
