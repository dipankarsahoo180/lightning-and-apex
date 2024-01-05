/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import { LightningElement, track } from "lwc";
const CompMap = {
  compA: () => import("c/compA"),
  compB: () => import("c/compB")
};
export default class CompC extends LightningElement {
  compName = "compA";
  compConstructor;
  childProps;

  handleInputData1(evt) {
    this.childProps = { ...this.childProps, inputdata1: evt?.target?.value };
  }
  handleInputData2(evt) {
    this.childProps = { ...this.childProps, inputdata2: evt?.target?.value };
  }
  handleInputData3(evt) {
    this.childProps = { ...this.childProps, inputdata3: evt?.target?.value };
  }

  connectedCallback() {
    this.compName = "compA";
    this.renderComponent();
  }

  async renderComponent() {
    const { default: comp } = await CompMap[this.compName]();
    this.compConstructor = comp;
  }

  handleToggle(evt) {
    this.compName = this.compName == "compA" ? "compB" : "compA";
    this.renderComponent();
  }
}
