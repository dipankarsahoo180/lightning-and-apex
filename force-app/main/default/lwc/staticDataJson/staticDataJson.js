import {fullJsonData1} from './jsonData1.js';
import {fullJsonData2} from './jsonData2.js';
import {fullJsonData3} from './jsonData3.js';
import {fullJsonData4} from './jsonData4.js';
import {fullJsonData5} from './jsonData5.js';
import {fullJsonData6} from './jsonData6.js';

var full_Json;
export function staticDataJson(){
    full_Json = {...fullJsonData1(),...fullJsonData2(),...fullJsonData3(),...fullJsonData4(),...fullJsonData5(),...fullJsonData6(),...this.omniJsonData};
    return full_Json;
}