import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserFactory} from "../shared/user-factory";
import {ShoppinglistStoreService} from "../shared/shoppinglist-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Address, User} from "../shared/user";

@Component({
    selector: 'bs-register',
    templateUrl: './register.component.html',
    styles: []
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    user = UserFactory.empty();

    errors: { [key:string]: string } = {};

    address_id: FormArray;

    constructor(
        private fb: FormBuilder,
        private bs: ShoppinglistStoreService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.initRegister();
    }

    initRegister() {
        this.buildAddressArray();

        this.registerForm = this.fb.group({
            id: this.user.id,
            firstName:  ['', Validators.required],
            lastName:   ['', Validators.required],
            email:      ['', [Validators.required, Validators.email]],
            password:   ['', Validators.required],
            flag:       ['', Validators.required],

            address_id: this.address_id
        });
    }

    buildAddressArray() {
        if(this.user.address_id.length == 0) {
            this.user.address_id.push(new Address(null, '', null, null, '', ''));
        }

        this.address_id = this.fb.array(
            this.user.address_id.map(
                a => this.fb.group({
                    id: this.fb.control(a.id),
                    street:       ['', Validators.required],
                    house_number: ['', Validators.required],
                    post_code:    ['', Validators.required],
                    place:        ['', Validators.required],
                    country:      ['', Validators.required]
                })
            )
        );
    }

    register() {
        const user: User = UserFactory.fromObject(this.registerForm.value);

        this.errorHandling(user);

        this.bs.register(user).subscribe(res => {
            this.user = UserFactory.empty();
            this.registerForm.reset(UserFactory.empty());
            this.router.navigate(['../login'],
                { relativeTo: this.route });
        });
    }

    errorHandling(user): boolean {

        if((user.address_id[0].street == null)
            || (user.address_id[0].house_number == null)
            || (user.address_id[0].post_code == null)
            || (user.address_id[0].place == null)
            || (user.address_id[0].country == null)) {
            alert("Entwas bei der Adresse ist falsch. Jedes Feld muss ausgefüllt sein. ");
            return false;
        }

        if(isNaN(user.address_id[0].house_number)) {
            alert("Das Feld Hausnummer verlangt eine Zahl.");
            return false;
        }

        if(isNaN(user.address_id[0].post_code)) {
            alert("Das Feld PLZ verlangt eine Zahl.");
            return false;
        }

        return true;
    }
}
