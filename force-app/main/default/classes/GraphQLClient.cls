public class GraphQLClient {
    
    public void callGraphQLApi() {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:dsomnistudio_new/services/data/v61.0/graphql');
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json');
        try{
            // Construct your GraphQL query
            String query = 'query($industry:Picklist){uiapi{query{Account(where:{Industry:{eq:$industry}}){edges{node{Id Name{value} Industry{value}}}}}}}';
            
            // Variables for the GraphQL query
            Map<String, Object> variablesMap = new Map<String, Object>();
            variablesMap.put('industry', 'ELectronics');
            
            // Construct the request body
            Map<String, Object> requestBodyMap = new Map<String, Object>();
            requestBodyMap.put('query', query);
            requestBodyMap.put('variables', variablesMap);
            
            // Convert the request body map to JSON
            String requestBody = JSON.serialize(requestBodyMap);
            req.setBody(requestBody);
            Http http = new Http();
            HttpResponse res = http.send(req);
            
            // Check the response
            if (res.getStatusCode() == 200) {
                System.debug('Response: ' + res.getStatus());
                System.debug('Response: ' +JSON.serializePretty((Map<String, Object>) JSON.deserializeUntyped(res.getBody())));
                // Process the response body as needed
            } else {
                System.debug('Error: ' + res.getStatus() );
                System.debug('Error: ' + res.getStatus() + ' - ' + res.getStatusCode());
            }
        }catch (exception e){
            System.debug('Exception:: '+e.getMessage()+e.getStackTraceString());
        }
    }
}