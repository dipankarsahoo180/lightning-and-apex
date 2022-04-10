import { LightningElement } from 'lwc';
export default class BubbleThree extends LightningElement {
    name
    addr
    constructor(){
        super();
        this.template.addEventListener('bubbling',this.handleBubbleFromChild.bind(this))
    }
    handleBubbleFromChild(event){
        this.name = event.detail.name;
        this.addr = event.detail.area;
    }
}