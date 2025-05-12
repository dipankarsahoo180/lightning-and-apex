import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class NavigationComponent extends NavigationMixin(LightningElement) {

    name = '';
    email = '';
    phone = '';

    handleChange(event) {
      
      var dataId = event.target.dataset.id;

      if(dataId == "name") {
        this.name = event.target.value;
      } 
      else if(dataId == "email") {
        this.email = event.target.value;
      }
      else if(dataId == "phone") {
        this.phone = event.target.value;
      }
    }

    navigateToComponent() {

      console.log("navigate to component");
      this[NavigationMixin.Navigate]({
        // Pass in pageReference
        type: 'standard__component',
        attributes: {
          componentName: 'c__myComponent',
        },
        state: {
          c__name: this.name,
          c__email: this.email,
          c__phone: this.phone
        },
      });
    }

    handleClick(event) {
      console.log("handle click");
      this.navigateToComponent();
    }
}