public class TestApexClass {
    String str1 = 'Dipankar';
    public void testFunction(){
		str1='Modified Dipankar';
        System.debug('String from method is: '+ str1);
    }
    public TestApexClass(){
        System.debug('INside default constructor');
        str1 = 'Default Dipankar';
        System.debug(str1);
    }
    public TestApexClass(String strinput){
        str1=strinput;
        System.debug('INside parameterized constructor');
        System.debug(str1);
    }

}