import {Visitor} from "./Visitor";


export abstract class Test{
    id: number
    name: string;
    abstract accept(visitor:Visitor)
}