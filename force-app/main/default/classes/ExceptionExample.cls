public class ExceptionExample {
    public static void testExtendedException() {
        System.debug('Before Exception');
        try{
            //throw new MyException('My custom exception');
            String s;
            Boolean b = s.contains('abc');
            //integer i = 5/0;
        } catch(NullPointerException e){
            system.debug('NullPointerExceptionMessage '+e.getMessage());
            system.debug('NullPointerExceptionLine Number '+e.getLineNumber());
            system.debug('NullPointerExceptionStack Trace '+e.getStackTraceString ());
        } catch(Exception  e){
            system.debug('GenericExceptionMessage '+e.getMessage());
            system.debug('GenericExceptionLine Number '+e.getLineNumber());
            system.debug('GenericExceptionStack Trace '+e.getStackTraceString ());
        } finally {
            System.debug('finally called ');
        }
        System.debug('After Exception');  
    }
}