({
    doInit : function(component, event, helper) {
        let data = component.get('v.data');
        let recordId = component.get('v.recordId');
        data = {
            "ContextId":recordId
        }
        component.set('v.data',data);
    }
})