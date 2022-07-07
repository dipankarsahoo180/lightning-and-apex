({
    // This function is used to listen and subscribe the publish value
    handleReceivedMessage : function(component, message, helper) { 
        // dipsFieldOne is the field name set in the message channel
        let receivedMessage = message.getParam("dipsFieldOne").value;
        component.set("v.messageReceived",receivedMessage)

    }

})