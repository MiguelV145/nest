export class User{
    id: number;
    name: string
    email: string;
    password: string;
    craetedAt: Date;

    constructor( id: number, name: string, email: string, password: string){
        this.id=id;
        this.name=name;
        this.email=email;
        this.password=password;
        this.craetedAt=new Date()

    }
}