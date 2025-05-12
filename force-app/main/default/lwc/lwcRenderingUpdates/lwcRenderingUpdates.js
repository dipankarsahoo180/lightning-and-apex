import { LightningElement } from 'lwc';

export default class LwcRenderingUpdates extends LightningElement {
    styleViaAttributes(e){
        this.template.querySelector('[class="class-one class-two"]').style.backgroundColor = 'red';
    }

    //do this instead
    styleViaClassName(e){
        this.template.querySelector('.class-one.class-two').style.backgroundColor = 'green';
    }
}