({
    // This is used to set the published value entered in the  input 
    handleInput : function(component, event, helper) {
       component.set("v.messagePublished",event.target.value)
    },
    // This is used to publish the message 
    handlePublish : function(component, event, helper) {
        let message = component.get("v.messagePublished");
        console.log("Message to be published is "+message);
        // dipsFieldOne is the field name set in the message channel
        let publishedMessage = {
            dipsFieldOne:{
                value : message
            }
        }
        component.find("lmsMessage").publish(publishedMessage);
    }

})