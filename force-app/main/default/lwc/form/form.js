import { LightningElement, track } from 'lwc';
import {formSchema} from 'c/data';

export default class Form extends LightningElement {
    @track pages = [];
    @track prevLabel;
    @track nextLabel;

    currentPageIndex = 0;

    connectedCallback() {
        this.initForm(formSchema);
    }

    // Form schema Initialization 
    initForm(formSchema){
        let {pages, config} = formSchema;
        this.setConfig(config);
        this.setPages(pages);
        this.setPageToDisplay();
    }

    setConfig(config){
        this.config = config;
    }

    setPages(pages){
        this.pages = pages;
    }

    setPageToDisplay(){
        this.pages[this.currentPageIndex].isActive = true;
        this.pages.filter((p, index) => index !== this.currentPageIndex).forEach(p => p.isActive = false);
        this.prevLabel = this.pages[this.currentPageIndex].navButtons.prev.label || this.config.navButtons.prev.label;
        this.nextLabel = this.pages[this.currentPageIndex].navButtons.next.label || this.config.navButtons.next.label;
    }

    handleNextInParent(){
        console.log('Next Parent');
          this.currentPageIndex += 1;
          this.setPageToDisplay();
    }

    handlePrevInParent(){
         console.log('Prev Parent');
         this.currentPageIndex -= 1;
         this.setPageToDisplay();
    }
}