global class CustomOmniStudioFunction implements Callable
{
    /*
        inputs - arguments - List<Object> of passed in arguments
        output - result - The result of the Function being called. Supports single Object values, List<Object> or Map<String, Object>
    */
    public Object call(String action, Map<String, Object> args) {

        Map<String, Object> input = (Map<String, Object>)args.get('input');
        Map<String, Object> output = (Map<String, Object>)args.get('output');
        Map<String, Object> options = (Map<String, Object>)args.get('options');

        return invokeMethod(action, input, output, options);
    }
    global Boolean invokeMethod(String methodName, Map<String, Object> inputs, Map<String, Object> output, Map<String, Object> options)
    {
        if (methodName == 'toObjArray')
        {
            List<Object> arguments = (List<Object>)inputs.get('arguments');
            output.put('result', convert(arguments));
        }
        return true;
    }
    /**
     FUNCTION('CustomOmniStudioFunction','toObjArray',LIST(%AssetIds%),'AssetId','Dipankar',LIST(%AssetIds%))
     * FUNCTION(
        'CustomOmniStudioFunction', //class name
        'toObjArray',               //method name
        LIST(%AssetIds%),           //List<Object> arguments = (List<Object>)inputs.get('arguments')[0]
        'AssetId',                  //arguments[1]
        'Param3',                   //arguments[2]
        %AnyDynamicValue%,          //arguments[3]
        ..n arguments               //arguments[n-1]
    )
    **/
    private LIST<Map<String, Object>> convert(List<Object> arguments)
    {
        try{
            LIST<Map<String, Object>> result = new LIST<Map<String, Object>>();
            Map<String,Object> inputlist = (Map<String,Object>)arguments[0];
            System.System.debug('arguments==>'+arguments);
            String key = (String)arguments[1];
            //any list passed from DR formula come in the format of Map<String,Object>
            //Map<'VLOCITY-FORMULA-LIST',List<Object>
            List<Object> listofElements = (List<Object>)inputlist.get('VLOCITY-FORMULA-LIST');
            for(Object str : listofElements){
                result.add(new Map<String,Object>{key => str});
            }
            return result;
        }catch(Exception e){
            return new LIST<Map<String, Object>>(); 
        }
    }
}