/* eslint-disable eqeqeq */
/* eslint-disable @lwc/lwc/no-async-operation */
import { LightningElement, track } from "lwc";
import { OmniscriptBaseMixin } from "omnistudio/omniscriptBaseMixin";
import util from "omnistudio/utility";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class SwipeChildForAttendance extends OmniscriptBaseMixin(
  LightningElement
) {
  // declare a variable to store the initial touch position
  touchStartX;
  @track children = [
    {
      key: "0036guhikl4JEMHAA4",
      FirstName: "Mitchell",
      HomePhone: "(443) 420-6355",
      LastName: "Clarke"
    },
    {
      key: "0036guhikl4JEO1AAO",
      FirstName: "Sarah",
      HomePhone: "(443) 420-6355",
      LastName: "Clarke"
    },
    {
      key: "0036g00001MEgIrAAL",
      FirstName: "Johnson",
      LastName: "Clarke"
    },
    {
      key: "003Jw000003EI1lIAG",
      FirstName: "Ben",
      LastName: "Clarke"
    },
    {
      key: "0036guhikl4JEL2AAO",
      FirstName: "Lara",
      HomePhone: "(443) 420-6355",
      LastName: "Clarke"
    },
    {
      key: "0036guhikl4JEL3AAO",
      FirstName: "Michael",
      HomePhone: "(443) 420-6355",
      LastName: "Clarke",
      Email: "testing@testing.com"
    }
  ];
  @track jsonData;

  connectedCallback() {
    //to get the json data from the omniscript
    this.jsonData = JSON.parse(JSON.stringify(this.omniJsonData));
    //convert the children node into an array if not already to iterate it and show individual child details.
    if (this.jsonData?.children)
      this.children = Array.isArray(this.jsonData?.children)
        ? this.jsonData?.children
        : [this.jsonData?.children];
    console.warn(
      "this.omniJsonData",
      JSON.parse(JSON.stringify(this.omniJsonData))
    );
    this.children?.forEach((el) => {
      el.className = (el.FirstName || "") + (el.LastName || "");
    });
  }

  // define a handler for the touchstart event
  handleTouchStart(event) {
    // get the first touch object from the event
    const touch = event.touches[0];
    // store the x-coordinate of the touch position
    this.touchStartX = touch.clientX;
  }

  // define a handler for the touchend event
  handleTouchEnd(event) {
    // get the first touch object from the event
    const touch = event.changedTouches[0];
    // get the x-coordinate of the touch position
    const touchEndX = touch.clientX;
    // calculate the distance and direction of the swipe
    const swipeDistance = touchEndX - this.touchStartX;
    console.warn("swipeDistance", swipeDistance);
    const swipeDirection =
      swipeDistance > 35 ? "right" : swipeDistance < -35 ? "left" : "";
    console.warn("swipeDirection", swipeDirection);
    // get the card element from the template
    const childDetails = this.children?.find(
      (el) => el.key == event.currentTarget.dataset.key
    );
    const className =
      (childDetails.FirstName || "") + (childDetails.LastName || "");
    const card = this.template.querySelector(`.${className}`);
    if (swipeDirection === "right") {
      this.handleRightDirection(card, childDetails);
    } else if (swipeDirection === "left") {
      this.handleLeftDirection(card, childDetails);
    }
  }

  // define a handler for the dragstart event
  handleDragStart(event) {
    // store the x-coordinate of the drag start position
    this.dragStartX = event.clientX;
  }

  // define a handler for the dragend event
  handleDragEnd(event) {
    // get the x-coordinate of the drag end position
    const dragEndX = event.clientX;
    // calculate the distance and direction of the swipe
    const swipeDistance = dragEndX - this.dragStartX;
    console.warn("swipeDistance", swipeDistance);
    const swipeDirection =
      swipeDistance > 35 ? "right" : swipeDistance < -35 ? "left" : "";
    console.warn("swipeDirection", swipeDirection);
    // get the card element from the template
    const childDetails = this.children?.find(
      (el) => el.key == event.currentTarget.dataset.key
    );
    const className =
      (childDetails.FirstName || "") + (childDetails.LastName || "");
    const card = this.template.querySelector(`.${className}`);
    if (swipeDirection === "right") {
      this.handleRightDirection(card, childDetails);
    } else if (swipeDirection === "left") {
      this.handleLeftDirection(card, childDetails);
    }
  }

  //move card to right side
  handleRightDirection(card, childDetails) {
    this.handleUpdateStyling(card, "green");
    // move the card to the right by adding a translateX transform
    card.style.transform = "translateX(30%)";
    console.warn("right direction function called");
    console.warn(childDetails.FirstName + " has been selected");
    this.handleCreateUpdateAttendanceEvents(childDetails.key, "Day Present");
  }

  //move card to left side
  handleLeftDirection(card, childDetails) {
    this.handleUpdateStyling(card, "red");
    // move the card to the left by adding a translateX transform
    card.style.transform = "translateX(-30%)";
    console.warn("left direction function called");
    console.warn(childDetails.FirstName + " has been selected");
    this.handleCreateUpdateAttendanceEvents(childDetails.key, "Day Absent");
  }

  //update the background, font and color
  handleUpdateStyling(card, backgroundColor) {
    card.querySelector(":scope > .card").style.backgroundColor =
      backgroundColor;
    card.querySelector(":scope > .card").style.color = "white";
    card
      .querySelector(":scope > .card")
      .classList.remove("slds-text-body_small");
    card
      .querySelector(":scope > .card")
      .classList.add("slds-text-body_regular");
  }

  //call integration procedure to update data
  handleCreateUpdateAttendanceEvents(ContactId, AttendanceType) {
    if (!this.jsonData?.children) return;

    const input = {
      ContactId: ContactId,
      AttendanceType: AttendanceType
    };

    //IP Call Starts
    //This request alson needs to be stringified again
    let request_getIPRemote = {
      type: "IntegrationProcedures",
      value: {
        ipMethod: "Contacts_createUpdateChildrenAttendance",
        optionsMap: "{}",
        inputMap: "{}"
      }
    };

    //Stringify the input
    request_getIPRemote.value.inputMap = JSON.stringify(input);

    util
      .getDataHandler(JSON.stringify(request_getIPRemote))
      .then((result) => {
        result = JSON.parse(result);
        console.log("Response ", result);
        let resp = result?.IPResult || "";
        console.log("IP result is ", resp);
        this.handleShowConfirmationMsg(resp?.Inserted || false, AttendanceType);
      })
      .catch((error) => {
        console.log("IP error is : ", error);
      });
  }
  //show toast message based upon attendance created/updated
  handleShowConfirmationMsg(Inserted, AttendanceType) {
    this.title = Inserted ? "Attendance Marked" : "Attendance Updated";
    this.message = AttendanceType;
    console.warn(this.title, this.message);
    const event = new ShowToastEvent({
      title: this.title,
      message: this.message,
      variant: "success",
      mode: "dismissable"
    });
    this.dispatchEvent(event);
  }
}
