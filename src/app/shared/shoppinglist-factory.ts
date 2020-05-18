import { Shoppinglist } from "./shoppinglist";

export class ShoppinglistFactory {

    // liefert ein leeres shoppinglist Element
    static empty(): Shoppinglist {
         let shoppinglist = new Shoppinglist (
            null,
            '',
            new Date(),
            null,
            null,
            'open',

            null,
             null,

            [{
                id:null,
                title:'',
                amount:null,
                extra_info:'',
                max_price:null
            }],
            [{
                id:null,
                comment:'',
                user_id:null
            }]
        );

        return shoppinglist;
    }

    // liefert ein bestehendes shoppinglist Element mit bestehenden Daten
    static fromObject(rawShoppinglist: any): Shoppinglist {
        return new Shoppinglist(
            rawShoppinglist.id,
            rawShoppinglist.title,
            typeof(rawShoppinglist.due_date) === 'string' ?
                new Date(rawShoppinglist.due_date) : rawShoppinglist.due_date,
            rawShoppinglist.price,
            rawShoppinglist.bill_url,
            rawShoppinglist.status,
            rawShoppinglist.list_items,
            rawShoppinglist.comments,
            rawShoppinglist.creator,
            rawShoppinglist.volunteer
        )
    }

}
