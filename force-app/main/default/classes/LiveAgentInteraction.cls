public without sharing class LiveAgentInteraction {
    
    public static String getPromptResponse(String accountId) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        
        // Set the endpoint URL for the Live Prompt API (check your org's settings)
        String endpoint = URL.getOrgDomainURL().toExternalForm()+'/services/data/v63.0/einstein/prompt-templates/MarkDownTemplate/generations'; 
        // Set the method and headers (assuming you’re sending a POST request)
        request.setEndpoint(endpoint);
        request.setMethod('POST');
        request.setTimeout(120000);
        request.setHeader('Authorization', 'Bearer ' + userInfo.getSessionId());
        request.setHeader('Content-Type', 'application/json');
        
        // Create the body for the request (this will depend on the API structure from Prompt template)
        String requestBody = Json.serialize(jsonMap(accountId));
        
        request.setBody(requestBody);
        
        // Send the request to the Live Prompt API
        HttpResponse response = http.send(request);
        
        // Process the response
        // Successfully got a response from the agent
        String responseBody = response.getBody();
        try { 
            // Assuming the response contains a message field
            Map<String, Object> result = (Map<String, Object>) JSON.deserializeUntyped(responseBody);
            String agentResponse = (String)JSON.serializePretty(result.get('responseMessages'));// Adjust the field based on actual response structure
            // Return the agent's response
            return agentResponse;
        } catch(Exception e) {
            // Handle error in case of failure
            String message =  'Error: ' + response.getStatusCode() + ' - ' + response.getStatus();
            return e.getStackTraceString();
        }
    }
    
    public static Map<String,Object> jsonMap(String accountId){
        Map<String, Object> jsonMap = new Map<String, Object>();
        
        // Set the top-level keys
        jsonMap.put('isPreview', 'false');
        
        // Create the inputParams map
        Map<String, Object> inputParamsMap = new Map<String, Object>();
        Map<String, Object> valueMap = new Map<String, Object>();
        Map<String, Object> accountMap = new Map<String, Object>();
        Map<String, Object> accountValueMap = new Map<String, Object>();
        
        // Set the account ID
        accountValueMap.put('id', accountId);
        accountMap.put('value', accountValueMap);
        valueMap.put('Input:Account', accountMap);
        inputParamsMap.put('valueMap', valueMap);
        jsonMap.put('inputParams', inputParamsMap);
        
        // Create the additionalConfig map
        Map<String, Object> additionalConfigMap = new Map<String, Object>();
        additionalConfigMap.put('numGenerations', 1);
        additionalConfigMap.put('temperature', 0);
        additionalConfigMap.put('frequencyPenalty', 0.0);
        additionalConfigMap.put('presencePenalty', 0.0);
        additionalConfigMap.put('additionalParameters', new Map<String, Object>()); // Empty map for additionalParameters
        additionalConfigMap.put('applicationName', 'PromptBuilderPreview');
        
        // Add additionalConfig to the main map
        jsonMap.put('additionalConfig', additionalConfigMap);
        
        return jsonMap;
    }
}