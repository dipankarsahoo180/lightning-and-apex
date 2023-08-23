global without sharing class CustomRemoteAction implements Callable
{
    /*
        inputs - arguments - List<Object> of passed in arguments
        output - result - The result of the Function being called. Supports single Object values, List<Object> or Map<String, Object>
    */
    public Object call(String action, Map<String, Object> args) {

        Map<String, Object> input = (Map<String, Object>)args.get('input');
        Map<String, Object> output = (Map<String, Object>)args.get('output');
        Map<String, Object> options = (Map<String, Object>)args.get('options');

        return invokeMethod(action, input, output, options);
    }
    
    global Boolean invokeMethod(String methodName, Map<String, Object> inputs, Map<String, Object> output, Map<String, Object> options)
    {
        if (methodName == 'toObjArray') //calling from dataraptor with multiple arguements(List of args)
        {
            List<Object> arguments = (List<Object>)inputs.get('arguments');
            output.put('result', convert(arguments));
        }
        else if (methodName == 'getContacts') //calling from Integration procedure
        {
            String AccountId = (String)inputs.get('AccountId');
            output.put('AllContacts', getContacts(AccountId));
        }
        /**
         * FORMULA: FUNCTION('CustomRemoteAction','getContactsFromDR',%AccountId%)
         * FORMULA RESULT PATH: getAllContacts will always get output.get('result') value 
         * So you should always do output.put('result')//hardcode result
         */
        else if (methodName == 'getContactsFromDR') //calling from dataraptor
        {
            List<Object> arguments = (List<Object>)inputs.get('arguments');
            String AccountId = (String)arguments[0];
            output.put('result', getContacts(AccountId));
        }
        else if (methodName == 'getPicklistValues') //called from omniscript and dataraptor
        {
            output.put('options', industryPicklistMap()); //if you are calling it from omniscript select element, 'option' should be hardcoded.
            output.put('result', industryPicklistMap()); //if you are calling it from dataraptor, 'result' should be hardcoded.
        }
        return true;
    }

    List<Object> getContacts(String AccountId)
    {
        List<Contact> allContacts =   [Select Id,Firstname,LastName,Phone,Email,AccountId,CreatedDate,LastModifiedDate from Contact where AccountId =:AccountId WITH USER_MODE];
        List<Object> output = new List <Object>();
        for(Contact eachContact : allContacts){
            Map<String,Object> contactMap = new Map<String,Object>();
            contactMap.put('ContactId',eachContact.Id);
            contactMap.put('ContactFirstName',eachContact.LastName);
            contactMap.put('ContactLastName',eachContact.LastName);
            contactMap.put('ContactEmail',eachContact.Email);
            contactMap.put('AccountId',eachContact.AccountId);
            contactMap.put('ContactPhone',eachContact.Phone);
            contactMap.put('ContactCreatedDate',eachContact.CreatedDate);
            contactMap.put('ContactModifiedDate',eachContact.LastModifiedDate);
            output.add(contactMap);
        }
        return output;
    }
    
    public static List<Map<String,String>> industryPicklistMap(){
        // Get the describe result for the Account object
        Schema.DescribeSObjectResult accountDescribe = Account.SObjectType.getDescribe();
        
        // Get the field describe result for the Industry field
        Schema.DescribeFieldResult industryFieldDescribe = accountDescribe.fields.getMap().get('Industry').getDescribe();
        
        List<Schema.PicklistEntry> picklistValues = industryFieldDescribe.getPicklistValues();
        
        //create a map of picklist label and values
        List<Map<String,String>> picklistValueList = new List<Map<String,String>>();
        // Now you can iterate through picklistValues to get the individual picklist values
        for (Schema.PicklistEntry picklistValue : picklistValues) {
            String value = picklistValue.getValue();
            String label = picklistValue.getLabel();
            picklistValueList.add(new Map<String,String>{'value'=>'--'+label+'--','name'=>value});
        }
        return picklistValueList;
    }

    /**
     FUNCTION('CustomRemoteAction','toObjArray',LIST(%AssetIds%),'AssetId','Dipankar',LIST(%AssetIds%))
     * FUNCTION(
        'CustomRemoteAction',       //class name
        'toObjArray',               //method name
        LIST(%AssetIds%),           //List<Object> arguments = (List<Object>)inputs.get('arguments')[0]
        'AssetId',                  //arguments[1]
        'Param3',                   //arguments[2]
        %AnyDynamicValue%,          //arguments[3]
        ..n arguments               //arguments[n-1]
    )
    **/
    private LIST<Map<String, Object>> convert(List<Object> arguments)
    {
        try{
            LIST<Map<String, Object>> result = new LIST<Map<String, Object>>();
            Map<String,Object> inputlist = (Map<String,Object>)arguments[0];
            System.System.debug('arguments==>'+arguments);
            String key = (String)arguments[1];
            //any list passed from DR formula come in the format of Map<String,Object>
            //Map<'VLOCITY-FORMULA-LIST',List<Object>
            List<Object> listofElements = (List<Object>)inputlist.get('VLOCITY-FORMULA-LIST');
            for(Object str : listofElements){
                result.add(new Map<String,Object>{key => str});
            }
            return result;
        }catch(Exception e){
            return new LIST<Map<String, Object>>(); 
        }
    }
    
}