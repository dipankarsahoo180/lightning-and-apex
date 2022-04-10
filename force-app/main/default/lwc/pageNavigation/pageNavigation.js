import { LightningElement, api} from 'lwc';

export default class PageNavigation extends LightningElement {
    @api prevLabel;
    @api nextLabel;

    handleNext(){
        console.log('child handling next');
        this.dispatchEvent(new CustomEvent('next'));
    }

    handlePrev(){
        console.log('child handling previous');
        this.dispatchEvent(new CustomEvent('prev'));
    }

}