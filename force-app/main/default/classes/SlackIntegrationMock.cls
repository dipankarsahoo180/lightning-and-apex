public class SlackIntegrationMock implements HttpCalloutMock {
    
    public httpResponse respond(HttpRequest req){
        System.debug('request in test class'+JSON.serializepretty(req.getBody()));
        HttpResponse res = new httpResponse();
        res.setStatusCode(200);
        Map<String,String> resMap = new Map<String,String>{'Status'=>'OK','message'=>'Message sent successfully'};
        res.setBody(JSON.serializepretty(resMap));
        return res;
    }

}