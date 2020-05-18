import { User } from "./user";

export class UserFactory {

    static empty(): User {
        // liefert ein leeres user Element
        let user = new User(
            null,
            '',
            '',
            '',
            '',
            '',
            [{
                id: null,
                street: '',
                house_number: null,
                post_code: null,
                place: '',
                country: ''
            }],
            {
                id: null,
                street: '',
                house_number: null,
                post_code: null,
                place: '',
                country: ''
            }
        );
        return user;
    }

    // liefert ein bestehendes user Element mit bestehenden Daten
    static fromObject(rawUser: any): User {
        return new User(
            rawUser.id,
            rawUser.firstName,
            rawUser.lastName,
            rawUser.email,
            rawUser.password,
            rawUser.flag,
            rawUser.address_id,
            rawUser.address
        )
    }
}
