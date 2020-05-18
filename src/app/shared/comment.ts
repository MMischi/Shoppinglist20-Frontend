import { User } from './user';

export class Comment {
    constructor (
        public id:number,
        public comment:string,
        public user_id:number
    ) { }
}
