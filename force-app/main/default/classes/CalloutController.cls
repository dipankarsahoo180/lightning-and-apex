public class CalloutController {
    // Unique label corresponding to the continuation
    public String requestLabel;
    // Result of callout
    public String result {get;set;}
    
    public Object processResponse() {             
        HttpResponse response = Continuation.getResponse(requestLabel);   
        system.debug('@@response'+response);        
        result = response.getBody();  
        system.debug('@@ this.result'+result);
        // Return null to re-render the original Visualforce page  
        return null;
    }
    
    public Object startRequest() {  
        // Create continuation with a timeout  
        Continuation con = new Continuation(40); 
        String sessionId = UserInfo.getSessionId();
        // Set callback method  
        con.continuationMethod='processResponse';  
        // Create callout request  
        HttpRequest req = new HttpRequest();
        req.setHeader('Authorization', 'Bearer ' + sessionID);
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Accept', 'application/json');               
        // Add callout request to continuation   requestLabel = con.addHttpRequest(req);  
        system.debug('@@ requestLabel'+requestLabel);  
        // Return the continuation  
        return con;  
    }
    
    
}