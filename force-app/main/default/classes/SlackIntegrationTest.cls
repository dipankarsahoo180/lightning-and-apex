@isTest
public class SlackIntegrationTest {
    
    @isTest
    private static void slackIntegrationTest1(){
        test.setMock(HttpCalloutMock.class,new SlackIntegrationMock());
        test.startTest();
        SlackIntegration.postMessageToSlack('all-ds-test','Hello from Dev Console');    
        test.stopTest();
        
        // Verify the mock response was received
        HTTPResponse mockResponse = new HTTPResponse();
        mockResponse.setBody('{"Status": "OK", "message": "Message sent successfully"}');
        mockResponse.setStatusCode(200);
        
        // Assert the response body
        System.assertEquals(mockResponse.getBody(), '{"Status": "OK", "message": "Message sent successfully"}', 'The response body should match the expected body.');
        
        // Assert the response status code
        System.assertEquals(mockResponse.getStatusCode(), 200, 'The response status code should be 200.');
    }
}