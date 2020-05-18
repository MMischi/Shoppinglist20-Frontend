import { Address } from './address';
export { Address } from './address';

export class User {
    constructor (
        public id:number,
        public firstName:string,
        public lastName:string,
        public email:string,
        public password:string,
        public flag:string,
        public address_id:Address[],
        public address: Address
    ) { }
}
