import { LightningElement, track,api } from 'lwc';
//import TestPicklistValues from 'c/testPicklistValues';
import TestUtility from 'c/testUtility';

const qA = [
    {
        qLabel: `Can we set the properties in connectedCallback() in Lightning Web Component ?`,
        aLabel: `Yes, You can set a property value and also can define the variable.`,
        Id: 1
    },
    {
        qLabel : `Can we Access elements the component owns inside the   connectedCallback()method in Lightning Web Component?`,
        aLabel: `You can’t access child elements in the component body because they don’t exist yet.`,
        Id: 2
    },
    {
        qLabel: `Can we call an apex method inside the  connectedCallback() method in Lightning Web Component?`,
        aLabel: `Yes, We can call a apex method inside the connectedCallback() in Lightning Web Component.`,
        Id: 3
    },
    {
        qLabel : `Can we create and dispatch events in  connectedCallback() method of Lightning Web Component?`,
        aLabel: `Yes, it allows you to fire an custom event. Also, you can listen for events (such as publish-subscribe events).`,
        Id: 4
    },
    {
        qLabel: `Why do we extend  LightningElement ?`,
        aLabel: `LightningElement contains all the lifecycle hooks methods over which Salesforce did some customization.`,
        Id: 5
    },
    {
        qLabel : `Can we Access elements the component owns inside the   connectedCallback()method in Lightning Web Component?`,
        aLabel: `You can’t access child elements in the component body because they don’t exist yet.`,
        Id: 6
    }
];

export default class QuestionAnswers extends TestUtility {
    @track data = qA;
    kuchrandom = super.something('Valueeeeeeeeee');
    kuchrandom2 = super.name;

    connectedCallback() {
        // this.setAttribute('class','test-class');
        this.data = qA.map((item,index) => {
            item.Id = index + 1;
            return item;
        });
    }

    renderedCallback(){
        // console.log("this.querySelector('.test-class')");
        // console.log(this.querySelector('.test-class'));
    }
    toggleAnswer(event){
        event.stopPropagation();
        console.log(this.kuchrandom);
        console.log(this.kuchrandom2);
        const qId =  event.target.getAttribute("data-q-id");
        if (qId){
            const currentQa = this.data.find(q => q.Id == qId);
            if (currentQa){
                currentQa.showAnswer =  !currentQa.showAnswer;
            }
        }   
    }
}