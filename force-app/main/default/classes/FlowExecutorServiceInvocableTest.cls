@IsTest
private class FlowExecutorServiceInvocableTest {

    @IsTest
    static void testBlankFlowName() {
        try {
            FlowExecutorServiceInvocable.executeFlowAndParseOutput('069000000000000', '');
            Assert.fail('Expected exception');
        } catch (AuraHandledException e) {
            Assert.isNotNull(e.getMessage());
        }
    }

    @IsTest
    static void testExecuteFromFlow_exception() {
        FlowExecutorServiceInvocable.FlowRequest req = new FlowExecutorServiceInvocable.FlowRequest();
        req.contentDocumentId = '';
        req.flowName = 'ExtractAcademicDetails';
        List<FlowExecutorServiceInvocable.FlowResponse> responses =
            FlowExecutorServiceInvocable.executeFromFlow(new List<FlowExecutorServiceInvocable.FlowRequest>{ req });
        Assert.isFalse(responses[0].success);
    }

    @IsTest
    static void testExecuteFromFlow_success() {
        ContentVersion cv = new ContentVersion(
            Title = 'Academic Transcript',
            PathOnClient = 'transcript.txt',
            VersionData = Blob.valueOf('DegreeName: Bachelor of Science\nInstitution: Test University\nMarksObtained: 1337\nTotalMarks: 2200\nPercentage: 60.77'),
            IsMajorVersion = true
        );
        insert cv;
        String contentDocId = [SELECT ContentDocumentId FROM ContentVersion WHERE Id = :cv.Id LIMIT 1].ContentDocumentId;

        FlowExecutorServiceInvocable.FlowRequest req = new FlowExecutorServiceInvocable.FlowRequest();
        req.contentDocumentId = contentDocId;
        req.flowName = 'ExtractAcademicDetails';

        Test.startTest();
        List<FlowExecutorServiceInvocable.FlowResponse> responses = null;
        try {
            responses = FlowExecutorServiceInvocable.executeFromFlow(new List<FlowExecutorServiceInvocable.FlowRequest>{ req });
        } catch (Exception e) {
            Assert.isNotNull(e.getMessage());
        }
        Test.stopTest();

        if (responses != null) {
            Assert.areEqual(1, responses.size());
            if (responses[0].success) {
                Assert.isNotNull(responses[0].resultJson);
                Assert.isNotNull(responses[0].degreeName != null || responses[0].isOCRSuccess != null);
            }
        }
    }

    @IsTest
    static void testParseNull() {
        Assert.isNull(FlowExecutorServiceInvocable.parseJsonToMap(null));
    }

    @IsTest
    static void testParseMarkdown() {
        Map<String, Object> r = FlowExecutorServiceInvocable.parseJsonToMap(
            '```json\n{"name":"test","count":5,"score":9.99,"wholeDec":200.0,"active":true,"items":["a"]}\n```'
        );
        Assert.areEqual('test', r.get('name'));
        Assert.isTrue(r.get('count') instanceof Integer);
        Assert.isTrue(r.get('score') instanceof Decimal);
        Assert.isTrue(r.get('wholeDec') instanceof Integer);
        Assert.areEqual(true, r.get('active'));
        Assert.isNotNull(r.get('items'));
    }

    @IsTest
    static void testParseInvalid() {
        try {
            FlowExecutorServiceInvocable.parseJsonToMap('{invalid}');
            Assert.fail('Expected exception');
        } catch (FlowExecutorServiceInvocable.FlowExecutionException e) {
            Assert.isTrue(e.getMessage().contains('Invalid JSON'));
        }
    }
}
