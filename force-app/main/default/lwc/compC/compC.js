import { LightningElement } from 'lwc';
const compData = {
    compA : () => import ("c/compA"),
    compB : () => import ("c/compB"),
}
export default class CompC extends LightningElement {
    compName= 'compA';
    compConstructor;
    
    connectedCallback (){
        this.compName = 'compA';
        this.renderComponent();        
    }

    async renderComponent(){
        const  {default:comp} = await compData[this.compName]();
        this.compConstructor = comp;
    }
    
    handleClick(evt){
        this.compName = this.compName == 'compA' ? 'compB' :'compA';
        this.renderComponent();
    }
}