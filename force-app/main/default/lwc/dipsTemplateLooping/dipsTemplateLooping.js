import { LightningElement } from 'lwc';

export default class DipsTemplateLooping extends LightningElement {

    listofItemsForEachLoop = ['Bag','Tiffin','Water Bottle','Books','Pen'];
    listofItemsInIterator = this.listofItemsForEachLoop.map(this.newListofObject);
    
    newListofObject(currentValue, index, arr){
        return {name:currentValue, Serial:index }
    }
}