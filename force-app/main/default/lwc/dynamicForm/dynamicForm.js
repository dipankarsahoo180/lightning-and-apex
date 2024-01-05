/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import { LightningElement, track } from "lwc";

const COMP_MAP = {
  text: () => import("lightning/input"),
  dropdown: () => import("lightning/combobox"),
  checkbox: () => import("lightning/checkboxGroup")
};
export default class DynamicForm extends LightningElement {
  //cbValue= '';
  options = [
    { label: "Text", value: "text" },
    { label: "Dropdown", value: "dropdown" },
    { label: "Checkbox", value: "checkbox" }
  ];
  currentElement;
  //isText = false;
  //isDD = false;
  ddOptions = [
    { label: "New", value: "new" },
    { label: "In Progress", value: "inProgress" },
    { label: "Finished", value: "finished" }
  ];
  //isCB = false;
  cbOptions = [
    { label: "Ross", value: "option1" },
    { label: "Rachel", value: "option2" }
  ];

  /************************New Variables  */
  component; // Holds current component instance
  childProps; // Hold current component attributes for the instance

  async handleChange(ev) {
    this.currentElement = ev.detail.value;
    this.childProps = this.handleProps(this.currentElement);
    const { default: ctor } = await COMP_MAP[this.currentElement]();
    this.component = ctor;
  }

  handleProps(type) {
    switch (type) {
      case "text":
        return { label: "Enter some text", type: "text" };
      case "dropdown":
        return {
          label: "Dropdown",
          placeholder: "Dropdown",
          options: this.ddOptions
        };
      case "checkbox":
        return { label: "Checkbox Group", value: "", options: this.cbOptions };
      default:
        return {};
    }
  }
}
