@isTest
private class GetSObjectDetailsTest {

    // Utility to get record type Id by DeveloperName
    private static Id getRecordTypeIdByDeveloperName(String sObjectName, String devName) {
        Schema.DescribeSObjectResult objDesc = Schema.getGlobalDescribe().get(sObjectName).getDescribe();
        for (Schema.RecordTypeInfo rtInfo : objDesc.getRecordTypeInfos()) {
            if (rtInfo.getDeveloperName() == devName && rtInfo.isAvailable()) {
                return rtInfo.getRecordTypeId();
            }
        }
        return null;
    }

    @testSetup
    static void setupTestData() {
        Id newOrgRTId = getRecordTypeIdByDeveloperName('Account', 'New_Org_Account');
        System.assertNotEquals(null, newOrgRTId, 'Record Type "New_Org_Account" must exist');

        insert new Account(
            Name = 'Test Account',
            Industry = 'Technology', // Ensure this value exists in picklist
            RecordTypeId = newOrgRTId
        );
    }

    @isTest
    static void test_getAccountInfos() {
        Test.startTest();
        Map<String, List<Map<String, String>>> result = GetSObjectDetails.getAccountInfos();
        Test.stopTest();

        System.assertNotEquals(null, result);
        System.assert(result.containsKey('recordTypes'));
        System.assert(result.containsKey('picklists'));
    }

    @isTest
    static void test_getRecordTypeDetails() {
        List<Map<String, String>> result = GetSObjectDetails.getRecordTypeDetails('Account');
        System.assert(result.size() > 0);
    }

    @isTest
    static void test_getPicklistFields() {
        List<Map<String, String>> picklistFields = GetSObjectDetails.getPicklistFields('Account');
        System.assertNotEquals(null, picklistFields);
    }

    @isTest
    static void test_getAccounts_valid() {
        Id newOrgRTId = getRecordTypeIdByDeveloperName('Account', 'New_Org_Account');
        List<Account> accounts = GetSObjectDetails.getAccounts('Industry', 'Technology', newOrgRTId);
        System.assertEquals(1, accounts.size());
    }

    @isTest
    static void test_getAccounts_exception() {
        Test.startTest();
        Id newOrgRTId = getRecordTypeIdByDeveloperName('Account', 'New_Org_Account');
        GetSObjectDetails.getAccounts('Industry', 'Engineering', newOrgRTId);
        Test.stopTest();
    }

    @isTest
    static void test_getPicklistValueByRecordType_valid() {
        Id newOrgRTId = getRecordTypeIdByDeveloperName('Account', 'New_Org_Account');
        List<Map<String, String>> values = GetSObjectDetails.getPicklistValueByRecordType('Account', 'Industry', newOrgRTId);
        System.assert(values.size() > 0);
    }
}
