public class CountryCodeHelper {
  public static string getCountryCode(String country) {
        try{
            Country_Code__mdt countryCode = Country_Code__mdt.getInstance(country);
            return countryCode.Country_Code__c;           
        }catch(NullPointerException e){
            return '';
        }
    }
}