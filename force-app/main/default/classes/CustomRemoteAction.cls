global class CustomRemoteAction implements Callable
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
        if (methodName == 'getContacts')
        {
            String AccountId = (String)inputs.get('AccountId');
            output.put('AllContacts', getContacts(AccountId));
        }
        return true;
    }

    List<Object> getContacts(String AccountId)
    {
        List<Contact> allContacts =   [Select Id,Firstname,LastName,Phone,Email, AccountId from Contact where AccountId =:AccountId];
        List<Object> output = new List <Object>();
        for(Contact eachContact : allContacts){
            Map<String,Object> contactMap = new Map<String,Object>();
            contactMap.put('ContactId',eachContact.Id);
            contactMap.put('ContactFirstName',eachContact.LastName);
            contactMap.put('ContactLastName',eachContact.LastName);
            contactMap.put('ContactEmail',eachContact.Email);
            contactMap.put('AccountId',eachContact.AccountId);
            contactMap.put('ContactPhone',eachContact.Phone);
            output.add(contactMap);
        }
        return output;
    }
    
}