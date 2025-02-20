public class SlackIntegration {
    
    // Method to send message to Slack channel
    public static void postMessageToSlack(String channel, String message) {
        
        // Slack Incoming Webhook URL (or can use Slack API with access token)
        String slackWebhookUrl = 'https://slack.com/api/chat.postMessage';
        String accessToken = 'Your-bot-user-oauth-token-from-oauth-and-permissions-tab';
        // Prepare JSON payload to send to Slack
        Map<String, String> payload = new Map<String, String>();
        payload.put('channel', channel); 
        payload.put('text', message);
        
        // Convert payload map to JSON string
        String jsonPayload = JSON.serialize(payload);
        
        // Create HTTP request
        HttpRequest req = new HttpRequest();
        req.setEndpoint(slackWebhookUrl);
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Authorization', 'Bearer '+ accessToken); // Replace with your Slack token
        req.setBody(jsonPayload);
        
        // Send HTTP request
        Http http = new Http();
        HttpResponse res = http.send(req);
        
        // Log the response (optional)
        System.debug('Response: ' + res.getBody());
    }
}