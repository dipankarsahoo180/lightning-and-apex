/* eslint-disable no-useless-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import { LightningElement } from "lwc";

export default class StaticForm extends LightningElement {
  cbValue = "";
  options = [
    { label: "Text", value: "text" },
    { label: "Dropdown", value: "dropdown" },
    { label: "Checkbox", value: "checkbox" }
  ];
  currentElement;
  isText = false;

  isDD = false;
  ddOptions = [
    { label: "New", value: "new" },
    { label: "In Progress", value: "inProgress" },
    { label: "Finished", value: "finished" }
  ];
  isCB = false;
  cbOptions = [
    { label: "Ross", value: "option1" },
    { label: "Rachel", value: "option2" }
  ];

  handleChange(ev) {
    this.resetAllFlags();
    this.currentElement = ev.detail.value;
    if (this.currentElement == "text") {
      this.isText = true;
      return;
    }

    if (this.currentElement == "dropdown") {
      this.isDD = true;
      return;
    }

    if (this.currentElement == "checkbox") {
      this.isCB = true;
      return;
    }
  }

  resetAllFlags() {
    this.isText = false;
    this.isDD = false;
    this.isCB = false;
  }
}
