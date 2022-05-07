/**
 * Covid19 Class
 * Track covid19 recovery
 * */
public class Covid19 {
    public Integer recoveredInArea = 0;
    //static variable
    public static Integer recoveredInCountry;


    public void treatPatient(){
        if(recoveredInCountry == null){
            recoveredInCountry =0;
        }
        recoveredInArea++;
        recoveredInCountry++;
    }

    // static method
    public static void printTreated(){
        System.debug('Recovered in country : '+recoveredInCountry);
    }

    //static block
    static {

    }
}