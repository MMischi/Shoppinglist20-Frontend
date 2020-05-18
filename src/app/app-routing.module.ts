import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ShoppinglistListComponent} from "./shoppinglist-list/shoppinglist-list.component";
import {ShoppinglistDetailsComponent} from "./shoppinglist-details/shoppinglist-details.component";
import {ShoppinglistFormComponent} from "./shoppinglist-form/shoppinglist-form.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";


const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'shoppinglists', component: ShoppinglistListComponent },
    { path: 'shoppinglists/:id', component: ShoppinglistDetailsComponent },

    { path: 'addList', component: ShoppinglistFormComponent },
    { path: 'updateList/:id', component: ShoppinglistFormComponent },

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
