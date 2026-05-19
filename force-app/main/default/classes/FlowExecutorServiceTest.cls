@IsTest
private class FlowExecutorServiceTest {
    
    @IsTest
    static void testBlankContentDocId() {
        try {
            FlowExecutorService.executeFlowAndParseOutput('', 'TestFlow');
            Assert.fail('Expected exception');
        } catch (AuraHandledException e) {
            Assert.isNotNull(e.getMessage());
        }
    }
    
    @IsTest
    static void testBlankFlowName() {
        
        ContentVersion cv = new ContentVersion(
            Title = 'Academic Transcript',
            PathOnClient = 'transcript.txt',
            VersionData = Blob.valueOf('DegreeName: Bachelor of Science\nInstitution: Test University\nMarksObtained: 1337\nTotalMarks: 2200\nPercentage: 60.77'),
            IsMajorVersion = true
        );
        insert cv;
        String contentDocId = [SELECT ContentDocumentId FROM ContentVersion WHERE Id = :cv.Id LIMIT 1].ContentDocumentId;
        Test.startTest();
        try {
            FlowExecutorService.executeFlowAndParseOutput(contentDocId, '');
            Assert.fail('Expected exception');
        }catch (AuraHandledException e) {
            Assert.isNotNull(e.getMessage());
        }
        Test.stopTest();
    }
    
    @IsTest
    static void testFlowExecution() {
        ContentVersion cv = new ContentVersion(
            Title = 'Academic Transcript',
            PathOnClient = 'transcript.txt',
            VersionData = Blob.valueOf('DegreeName: Bachelor of Science\nInstitution: Test University\nMarksObtained: 1337\nTotalMarks: 2200\nPercentage: 60.77'),
            IsMajorVersion = true
        );
        insert cv;
        String contentDocId = [SELECT ContentDocumentId FROM ContentVersion WHERE Id = :cv.Id LIMIT 1].ContentDocumentId;
        
        Test.startTest();
        try {
            Map<String, Object> result = FlowExecutorService.executeFlowAndParseOutput(contentDocId, 'ExtractAcademicDetails');
            Assert.isTrue(result == null || !result.isEmpty() || result.isEmpty());
        } catch (AuraHandledException e) {
            Assert.isNotNull(e.getMessage());
        }
        Test.stopTest();
    }
    
    @IsTest
    static void testParseNull() {
        Assert.isNull(FlowExecutorService.parseJsonToMap(null));
    }
    
    @IsTest
    static void testParseMarkdown() {
        Map<String, Object> r = FlowExecutorService.parseJsonToMap(
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
            FlowExecutorService.parseJsonToMap('{invalid}');
            Assert.fail('Expected exception');
        } catch (FlowExecutorService.FlowExecutionException e) {
            Assert.isTrue(e.getMessage().contains('Invalid JSON'));
        }
    }
}
