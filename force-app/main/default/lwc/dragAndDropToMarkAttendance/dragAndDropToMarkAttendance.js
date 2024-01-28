/* eslint-disable eqeqeq */
/* eslint-disable @lwc/lwc/no-async-operation */
import { LightningElement, track } from "lwc";
import { OmniscriptBaseMixin } from "omnistudio/omniscriptBaseMixin";
import util from "omnistudio/utility";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class DragAndDropToMarkAttendance extends OmniscriptBaseMixin(
  LightningElement
) {
  // declare a variable to store the initial touch position
  @track children = [
    {
      key: "0036guhikl4JEMHAA4",
      FirstName: "Mitchell",
      HomePhone: "(443) 420-6355",
      LastName: "Clarke",
      CourseOffering: {
        CourseOfferingId: "1"
      }
    },
    {
      key: "0036guhikl4JEO1AAO",
      FirstName: "Sarah",
      HomePhone: "(443) 420-6355",
      LastName: "Clarke",
      CourseOffering: {
        CourseOfferingId: "2"
      }
    }
    // {
    //   "key": "0036g00001MEgIrAAL",
    //   "FirstName": "Johnson",
    //   "LastName": "Clarke",
    //   "CourseOffering":{
    //     "CourseOfferingId":"6"
    //   }
    // },
    // {
    //   "key": "003Jw000003EI1lIAG",
    //   "FirstName": "Ben",
    //   "LastName": "Clarke",
    //   "CourseOffering":{
    //     "CourseOfferingId":"3"
    //   }
    // },
    // {
    //   "key": "0036guhikl4JEL2AAO",
    //   "FirstName": "Lara",
    //   "HomePhone": "(443) 420-6355",
    //   "LastName": "Clarke",
    //   "CourseOffering":{
    //     "CourseOfferingId":"4"
    //   }
    // },
    // {
    //   "key": "0036guhikl4JEL3AAO",
    //   "FirstName": "Michael",
    //   "HomePhone": "(443) 420-6355",
    //   "LastName": "Clarke",
    //   "Email": "testing@testing.com"
    //   ,
    //   "CourseOffering":{
    //     "CourseOfferingId":"5"
    //   }
    // }
  ];
  @track jsonData;

  connectedCallback() {
    //to get the json data from the omniscript
    this.jsonData = JSON.parse(JSON.stringify(this.omniJsonData));
    //convert the children node into an array if not already to iterate it and show individual child details.
    if (this.jsonData?.children)
      this.children = Array.isArray(this.jsonData?.children) ? this.jsonData?.children : [this.jsonData?.children];
    console.warn( "this.omniJsonData", JSON.parse(JSON.stringify(this.omniJsonData)) );
    this.children?.forEach((el) => {
      const trimmedName = (el.FirstName || "") + (el.LastName || "");
      el.className = trimmedName.replaceAll(" ", "");
      el.absent = false;
      el.default = true;
      el.present = false;
      el.tardy = false;
      el.courseId = el.CourseOffering?.CourseOfferingId;
    });
  }

  // define a handler for the dragstart event
  handleDragStart(event) {
    event.target.style.backgroundColor = "";
    event.target.style.color = "black";
  }

  handleDragEnd(event) {
    event.preventDefault();
  }

  // define a handler for the dragend event
  handleDrop(event) {
    const type = event.currentTarget.dataset.type;
    this.children.forEach((el) => {
      if (el.key == event.currentTarget.dataset.key) {
        el.absent = type == "absent" ? true : false;
        el.tardy = type == "tardy" ? true : false;
        el.default = type == "default" ? true : false;
        el.present = type == "present" ? true : false;
      }
    });
    event.target.style.backgroundColor = "green";
    event.target.style.color = "white";
    this.handleCreateAttendance(
      event.currentTarget.dataset.key,
      event.currentTarget.dataset.courseId,
      event.currentTarget.dataset.type
    );
  }

  handleCreateAttendance(key, courseId, type) {
    if (type == "absent") {
      this.handleCreateUpdateAttendanceEvents(key, courseId, "Day Absent");
    } else if (type == "tardy") {
      this.handleCreateUpdateAttendanceEvents(key, courseId, "Day Tardy");
    } else if (type == "present") {
      this.handleCreateUpdateAttendanceEvents(key, courseId, "Day Present");
    } else {
      this.handleCreateUpdateAttendanceEvents(key, courseId, "");
    }
  }

  container;
  touchStartX;
  touchStartY;
  // Updated JS
  handleTouchStart(event) {
    this.touchStartX = event.touches ? event.changedTouches[0].clientX : event.clientX;
    this.touchStartY = event.touches ? event.changedTouches[0].clientY : event.clientY;
    this.container = event.currentTarget;
    this.container.style.position = "relative";
    this.prevTranslateX = 0;
    this.prevTranslateY = 0;
  }

  handleTouchMove(event) {
    event.preventDefault();
    const deltaX = (event.touches ? event.changedTouches[0].clientX : event.clientX) - this.touchStartX;
    const deltaY = (event.touches ? event.changedTouches[0].clientY : event.clientY) - this.touchStartY;

    const translateX = this.prevTranslateX + deltaX;
    const translateY = this.prevTranslateY + deltaY;

    this.container.style.transform = `translate(${translateX}px, ${translateY}px)`;

    this.touchStartX = event.touches ? event.changedTouches[0].clientX : event.clientX;
    this.touchStartY = event.touches ? event.changedTouches[0].clientY : event.clientY;

    this.prevTranslateX = translateX;
    this.prevTranslateY = translateY;
  }

  handleTouchEnd(event) {
    // Get the current position
    const rect = event.currentTarget.getBoundingClientRect();
    const currentX = rect.left;
    const width = rect.right-rect.left;
    const boundary = this.getBoundingClientRect();
    const totalWidth = boundary.right - boundary.left;
    console.log("Current :", currentX,width);
    console.log("Rectange :", boundary.left,totalWidth,boundary.right);

    // Your additional logic here

    let type = "";
    if (currentX <= boundary.left+width) {
      type = "absent";
    } else if (currentX > boundary.left+width && currentX <= boundary.left+(2*width)+10) {
      type = "tardy";
    } else if (currentX > boundary.left+(2*width)+10 && currentX <= boundary.right-(width*1.5)) {
      type = "default";
    } else {
      type = "present";
    }

    this.children.forEach((el) => {
      if (el.key == event.currentTarget.dataset.key) {
        el.absent = type == "absent" ? true : false;
        el.tardy = type == "tardy" ? true : false;
        el.default = type == "default" ? true : false;
        el.present = type == "present" ? true : false;
      }
    });
    // reset container
    this.container.style.transform = "translate(0px, 0px)";
    this.handleCreateAttendance(
      event.currentTarget.dataset.key,
      event.currentTarget.dataset.courseId,
      type
    );
  }

  //call integration procedure to update data
  handleCreateUpdateAttendanceEvents(ContactId, courseId, AttendanceType) {
    if (!this.jsonData?.children) return;

    const input = {
      ContactId: ContactId,
      CourseOfferingId: courseId,
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
