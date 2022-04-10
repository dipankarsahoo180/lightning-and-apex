import { LightningElement } from 'lwc';
export default class TestUtility extends LightningElement {
    name= 'test';
    something(something){
        return `this is a test with value passed is ${something}`;
    }
}