import { Item } from "./item";
export { Item } from "./item";

import { Comment } from "./comment";
export { Comment } from "./comment";

import { Address, User } from "./user";
export { Address, User } from "./user";


export class Shoppinglist {
    constructor (
        public id:number,
        public title:string,
        public due_date:Date,
        public price:number,
        public bill_url:string,
        public status:string,

        public creator_id:number,
        public volunteer_id:number,

        public list_items:Item[],
        public comments:Comment[]
    ) { }
}
