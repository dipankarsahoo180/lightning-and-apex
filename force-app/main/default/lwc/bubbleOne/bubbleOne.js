import { LightningElement, api } from 'lwc';
export default class BubbleOne extends LightningElement {
    name= 'Dipankar Sahoo'
    area='Bhubaneswar'

    handleClick(event){
        const myEvent = new CustomEvent(
            'bubbling',
            {
                detail:{name:this.name, area:this.area},
                bubbles:true,
                composed: true
            }
        );
        this.dispatchEvent(myEvent);
    }
}