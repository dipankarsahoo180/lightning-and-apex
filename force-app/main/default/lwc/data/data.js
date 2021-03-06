const formSchema = {
    pages: [
        {
            id: 1,
            name: "group_information",
            label: "Employer Information", // Pass empty string if you want to hide page label
            type: "page",
            hide: false, // This flag is used to hide the page dynamically.
            elements: [
                {
                    type: "text",
                    name: "group_name",
                    label: "Group Name",
                    required: true,
                    readOnly: false,
                    className: "shortText",
                    width: 12,
                    helptext: "Enter your Company Name",
                    placeholder: "",
                    maxlength: 30,
                    pattern: false,
                    masking: "",
                    minlength: "",
                    changeHandler: "SearchGroupByName",
                    handlerInput:{
                        Search: "group_name"
                    },
                    icon: "",
                    value: "Ford Motors",
                },
                {
                    type: "text",
                    name: "billing_street",
                    label: "Billing Street",
                    required: true,
                    readOnly: false,
                    className: "shortText",
                    placeholder: "",
                    width: 12,
                    maxlength: "",
                    pattern: "",
                    icon: "",
                    helptext: "",
                },
                {
                    type: "text",
                    name: "zipcode",
                    label: "Zip Code",
                    required: true,
                    readOnly: false,
                    className: "shortText",
                    pattern: "[0-9]{5}",
                    placeholder: "",
                    width: 12,
                    min: "",
                    max: "",
                    maxlength: "",
                    minlength: "",
                    icon: "",
                    helptext: "",
                    missingValueErrMsg: "Input is required.",
                    patternErrMsg: "Not valid input.",
                },
                {
                    type: "select",
                    name: "state",
                    label: "State",
                    required: true,
                    readOnly: false,
                    className: "shortText",
                    width: 12,
                    helptext: "Please select your state.",
                    placeholder: "",
                    maxlength: 30,
                    pattern: "",
                    masking: "",
                    minlength: "",
                    icon: "",
                    value: "",
                    options: [
                                {label: 'Rajasthan', value: 'Rajasthan'},
                                {label: 'Delhi', value: 'Delhi'},
                                {label: 'Maharashtra', value: 'Maharashtra'}
                            ]
                },
                {
                    type: "select",
                    name: "city",
                    label: "City",
                    required: true,
                    readOnly: false,
                    className: "shortText",
                    width: 12,
                    helptext: "",
                    placeholder: "",
                    maxlength: 30,
                    pattern: "",
                    masking: "",
                    minlength: "",
                    icon: "",
                    value: "",
                    options: [
                                {label: 'Jaipur', value: 'Jaipur'},
                                {label: 'Delhi', value: 'Delhi'},
                                {label: 'Mumbai', value: 'Mumbai'}
                            ]
                },
                {
                    type: "select",
                    name: "county",
                    label: "County",
                    required: true,
                    readOnly: false,
                    className: "shortText",
                    width: 12,
                    helptext: "",
                    placeholder: "",
                    maxlength: 30,
                    pattern: "",
                    masking: "",
                    minlength: "",
                    icon: "",
                    value: "",
                    options:[
                                {label: 'Wisconsin', value: 'Wisconsin'},
                                {label: 'Illinois', value: 'Illinois'}
                            ]
                }
            ],
            navButtons: {
                next: { label: "First Next" },
                prev: { label: "First Prev" }
            }
        },
        {
            id: 2,
            name: "employer_qualification",
            label: "Employer Qualification", // Pass empty string if you want to hide page label
            type: "page",
            hide: false, // This flag is used to hide the page dynamically.
            elements: [
                {
                    type: "text",
                    name: "dental_enrollee",
                    label: "Dental enrollee",
                    required: true,
                    readOnly: false,
                    className: "shortText",
                    width: 12,
                    helptext: "",
                    placeholder: "",
                    maxlength: 30,
                    pattern: "",
                    masking: "",
                    minlength: "",
                    icon: "",
                    value: "",
                }
            ],
            navButtons: {
                next: { label: "Second Next" },
                prev: { label: "Second Prev" }
            }
        }
    ],
    config: {
        navButtons: {
            next: { label: "Proceed" },
            prev: { label: "Go Back" }
        }
    }
}

export { formSchema };