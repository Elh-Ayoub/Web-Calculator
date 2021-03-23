function Clean(){
    document.getElementById("output").innerHTML = "0";
    document.getElementById("input").innerHTML = "0";
}
function writeToInput(char){
    let currentchar = document.getElementById("input").innerHTML;
    if((currentchar == "0") && (char !== ".")){
        if(isOperator(char) || char === "√"){
            document.getElementById("input").innerHTML = char + " ";
        }
        else{
            document.getElementById("input").innerHTML = char;
        }
    }
    else if (char === "√"){
        document.getElementById("input").innerHTML = currentchar + " " + char + " ";
    }
    else{
        if(isOperator(char)){
            if ((isOperator(currentchar.substring(currentchar.length -2, currentchar.length -1))) && (isOperator(currentchar.substring(currentchar.length -4, currentchar.length -3)))){
                document.getElementById("input").innerHTML = currentchar.substring(0, currentchar.length -4) + char + " ";
            }
            else if((isOperator(currentchar.substring(currentchar.length -2, currentchar.length -1))) && (char !== "-")) {
                 document.getElementById("input").innerHTML = currentchar.substring(0, currentchar.length -2) + char + " ";
            }
            else if ((isOperator(currentchar.substring(currentchar.length -2, currentchar.length -1))) && (char === "-")){
                document.getElementById("input").innerHTML = currentchar + char + " ";
            }
            else{
                document.getElementById("input").innerHTML = currentchar + " " + char + " ";
            }    
        }else{
            document.getElementById("input").innerHTML = currentchar + char;
        }
    }
}
function calculate(){
    document.getElementById('output').innerHTML = get_res(document.getElementById('input').innerHTML);
}
function get_res(data){
    if (data.match(/^\([^\(]*?\)$/g) !== null) {
        data = data.slice(1,-1);
    }
    while (data.match(/\([^\(]*?\)/g) !== null) {
        data = data.replace(/\([^\(]*?\)/,get_res(data.match(/\([^\(]*?\)/g)[0]));
    }
    let arr = data.split(" ");
    let res_arr = new Array();
    let temp;
    let tmp1;
    let tmp2;
    let tmp3;
    for (let ind = 0; ind < arr.length; ind++) {
        if (arr[ind].length !== 0) {
            res_arr.push(arr[ind]);
        }
    }
    arr = res_arr;
    res_arr = new Array();
    let minus = false;
    console.log(arr);
    for (let ind = 0; ind < arr.length; ind++){
        if (Number.isNaN(Number(arr[ind])) !== true) {
            if ((minus) && (arr[ind][0] !== "-") && (arr[ind][0] !== "+")) {
                res_arr.push("-" + arr[ind]);
                minus = false;
            }
            else if (minus && (arr[ind][0] !== "-")) {
                res_arr.push("-" + arr[ind].slice(1));
                minus = false;
            }
            else if (minus && (arr[ind][0] !== "+")) {
                res_arr.push(arr[ind].slice(1));
                minus = false;
            }
            else {
                res_arr.push(arr[ind]);
                minus = false;
            }
        }
        else {
            if (arr[ind].match(/^[+-]?[0-9]+%$/) !== null) {
                if ((minus) && (arr[ind][0] !== "-") && (arr[ind][0] !== "+")) {
                    res_arr.push("-" + arr[ind]);
                    minus = false;
                }
                else if (minus && (arr[ind][0] !== "-")) {
                    res_arr.push("-" + arr[ind].slice(1));
                    minus = false;
                }
                else if (minus && (arr[ind][0] !== "+")) {
                    res_arr.push(arr[ind].slice(1));
                    minus = false;
                }
                else {
                    res_arr.push(arr[ind]);
                    minus = false;
                }
            }
            else if (arr[ind].match(/^[+-]?[0-9]+!$/) !== null) {
                if ((minus) && (arr[ind][0] !== "-") && (arr[ind][0] !== "+")) {
                    temp = 1;
                    for (let i = 1; i < Number(arr[ind].slice(0, -1)) + 1; i++) {
                        temp *= i;
                    }
                    res_arr.push("-" + temp);
                    minus = false;
                }
                else if (minus && (arr[ind][0] !== "-")) {
                    temp = 1;
                    for (let i = 1; i < Number(arr[ind].slice(1, -1)) + 1; i++) {
                        temp *= i;
                    }
                    res_arr.push("-" + temp);
                    minus = false;
                }
                else if (minus && (arr[ind][0] !== "+")) {
                    temp = 1;
                    for (let i = 1; i < Number(arr[ind].slice(1, -1)) + 1; i++) {
                        temp *= i;
                    }
                    res_arr.push(String(temp));
                    minus = false;
                }
                else if (arr[ind][0] !== "-") {
                    temp = 1;
                    for (let i = 1; i < Number(arr[ind].slice(0, -1)) + 1; i++) {
                        temp *= i;
                    }
                    res_arr.push(String(temp));
                    minus = false;
                }
                else {
                    temp = 1;
                    for (let i = 1; i < Number(arr[ind].slice(1, -1)) + 1; i++) {
                        temp *= i;
                    }
                    res_arr.push("-" + temp);
                    minus = false;
                }
            }
            else if (arr[ind] == "-"){
                if (minus){
                    minus = false;
                }
                else {
                    minus = true;
                }
            }
            else if (arr[ind].match(/^-?√$/) !== null) {
                if ((minus) && (arr[ind][0] !== "-")) {
                    res_arr.push("-" + arr[ind]);
                    minus = false;
                }
                else if (minus) {
                    res_arr.push(arr[ind].slice(1));
                    minus = false;
                }
                else {
                    res_arr.push(arr[ind]);
                    minus = false;
                }
            }
            else if (arr[ind] !== "+"){
                res_arr.push(arr[ind]);
            }
        }
    }
    console.log(res_arr);
    arr = res_arr;
    let check = true;
    while (check) {
        check = false;
        tmp1 = arr.indexOf("^");
        tmp2 = arr.indexOf("√");
        tmp3 = arr.indexOf("-√");
        if ((tmp1 !== -1) && (tmp2 !== -1) && (tmp3 !== -1)) {
            temp = Math.min(arr.indexOf("√"), arr.indexOf("^"));
        }
        else {
            res_arr = new Array();
            res_arr.push(tmp1);
            res_arr.push(tmp2);
            res_arr.push(tmp3);
            temp = res_arr[0];
            for (let el of res_arr) {
                if ((el !== -1) && (el < temp) && (temp !== -1)) {
                    temp = el;
                }
                if (temp === -1) {
                    temp = el;
                }
            }
        }
        if (temp !== -1) {
            if (arr[temp] === "^") {
                tmp1 = arr[temp - 1];;
                tmp2 = arr[temp + 1];
                if (arr[temp - 1].match(/^[+-]?[0-9]+%$/) !== null) {
                    tmp1 = Number(arr[temp - 1].slice(0, -1)) / 100;
                }
                if (arr[temp + 1].match(/^[+-]?[0-9]+%$/) !== null) {
                    tmp2 = Number(arr[temp + 1].slice(0, -1)) / 100;
                }
                arr.splice(temp - 1, 3, String(Number(tmp1) ** Number(tmp2)));
            }
            else {
                if (arr[temp][0] !== "-") {
                    tmp1 = arr[temp + 1];
                    if (arr[temp + 1].match(/^[+-]?[0-9]+%$/) !== null) {
                        tmp1 = Number(arr[temp + 1].slice(0, -1)) / 100;
                    }
                    arr.splice(temp, 2, String(Number(tmp1) ** 0.5));
                }
                else {
                    tmp1 = arr[temp + 1];
                    if (arr[temp + 1].match(/^[+-]?[0-9]+%$/) !== null) {
                        tmp1 = Number(arr[temp + 1].slice(0, -1)) / 100;
                    }
                    arr.splice(temp, 2, "-" + String(Number(tmp1) ** 0.5));
                }
            }
            check = true;
        }
    }
    console.log(arr);
    check = true;
    while (check) {
        check = false;
        tmp1 = arr.indexOf("/");
        tmp2 = arr.indexOf("*");
        if ((tmp1 !== -1) && (tmp2 !== -1)) {
            temp = Math.min(arr.indexOf("/"), arr.indexOf("*"));
        }
        else {
            temp = Math.max(arr.indexOf("/"), arr.indexOf("*"));
        }
        if (temp !== -1){
            if (arr[temp] === "/") {
                tmp1 = arr[temp - 1];
                tmp2 = arr[temp + 1];
                if(tmp2 === "0"){
                    arr=["Math error"];
                }else{
                    if (arr[temp - 1].match(/^[+-]?[0-9]+%$/) !== null) {
                        tmp1 = Number(arr[temp - 1].slice(0, -1)) / 100;
                    }
                    if (arr[temp + 1].match(/^[+-]?[0-9]+%$/) !== null) {
                        tmp2 = Number(arr[temp + 1].slice(0, -1)) / 100;
                    }
                    arr.splice(temp - 1, 3, String(Number(tmp1) / Number(tmp2)));
                }
            }
            else {
                tmp1 = arr[temp - 1];
                tmp2 = arr[temp + 1];
                if (arr[temp - 1].match(/^[+-]?[0-9]+%$/) !== null) {
                    tmp1 = Number(arr[temp - 1].slice(0, -1)) / 100;
                }
                if (arr[temp + 1].match(/^[+-]?[0-9]+%$/) !== null) {
                    tmp2 = Number(arr[temp + 1].slice(0, -1)) / 100;
                }
                arr.splice(temp - 1, 3, String(Number(tmp1) * Number(tmp2)));
            }
            check = true;
        }
    }
    console.log(arr);
    let res = 0;
    for (let ind = 0; ind < arr.length; ind++) {
        if(arr[ind] === "error" || arr[ind] === "NaN"){
            res = "MATH ERROR";
            break;
        }else{
            if (Number.isNaN(Number(arr[ind])) !== true) {
                res += Number(arr[ind]);
            }
            else {
                if (res !== 0) {
                    res += res * (Number(arr[ind].slice(0, -1)) / 100);
                }
                else {
                    res += (Number(arr[ind].slice(0, -1)) / 100);
                }
            }
        }
    }
    return String(res);
}
function isOperator(char){
    if(char === "+" || char === "-" || char === "*" || char === "/" || char === "^"){
        return true;
    }else return false;
}
function changeSign(){
    let current = document.getElementById('input').innerHTML;
    if(!isNaN(current)){
        document.getElementById('input').innerHTML = -1 * Number(current);
    }else{
        let arr = Array.from(current);
       
        for (let i = arr.length-1; i >=0; i--) {
            if(isOperator(arr[i])){
                if(isOperator(arr[i-3]) || isOperator(arr[i-2])){
                    if(arr[i] === "-"){
                        arr[i] = "+";
                    }else arr[i] = "-";
                    
                    document.getElementById('input').innerHTML = arr.join("");
                }else{
                    if(current.charAt(i) === "-"){
                       let res = current.substring(0, i+1) + " + " + current.substring(i+1, current.length);
                       document.getElementById('input').innerHTML = res; 
                    }
                    if(current.charAt(i) === "+" || current.charAt(i) === "*" || current.charAt(i) === "/"){
                        let res = current.substring(0, i+1) + " - " + current.substring(i+1, current.length);
                        document.getElementById('input').innerHTML = res; 
                    }
                }
                break;
            } 
        }
    }
}

const lengthConverter = (id, value) => {
    let feet = document.querySelector("#inputFeet");
    let metr = document.querySelector("#inputMeters");
    let cm = document.querySelector("#inputcm");
    let yards = document.querySelector("#inputYards");
    let km = document.querySelector("#inputKilometers");
    let miles = document.querySelector("#inputMiles");
    if(id == "inputFeet") {
        metr.value = value/3.28084;
        cm.value = value*30.48;
        yards.value = value*0.33333;
        km.value = value/3280.8;
        miles.value = value*5280.0016896;
    }
    else if(id == "inputMeters"){
        feet.value = value*3.2808;
        cm.value = value*100;
        yards.value = value*1.09361;
        km.value = value/1000;
        miles.value = value*1609.34;
    }
    else if(id == "inputcm"){
        feet.value = value/30.48;
        metr.value = value/100;
        yards.value = value/91.44;
        km.value = value/100000;
        miles.value = value/160934;
    }
    else if(id == "inputYards"){
        feet.value = value*3;
        metr.value = value*1.09361;
        cm.value = value*91.44;
        km.value = value*1093.61;
        miles.value = value*1759.99469184;
    }
    else if(id == "inputKilometers"){
        feet.value = value*3280.84;
        metr.value = value*1000;
        cm.value = value*100000;
        yards.value = value*1093.61
        miles.value = value/1.60934;
    }
    else if(id == "inputMiles"){
        feet.value = value*5280;
        metr.value = value*1609.34;
        cm.value = value*160934;
        yards.value = value*1760;
        km.value = value*1.60934;
    }
}

    const weightConverter = (id, value) => {
        let once = document.querySelector("#inputOnce");
        let kilogram = document.querySelector("#inputKilogram");
        let pound = document.querySelector("#inputPound");
        let gram = document.querySelector("#inputGram");
        let tonne = document.querySelector("#inputTonne");
        let stone = document.querySelector("#inputStone");
        if (id == "inputOnce"){
            kilogram.value = value/35.274;
            pound.value = value/16;
            gram.value = value*28.3495; 
            tonne.value = value/35274;
            stone.value = value/224;
        }
        else if(id == "inputKilogram"){
            once.value = value*35.274;
            pound.value = value*2.20462;
            gram.value = value*1000; 
            tonne.value = value/1000;
            stone.value = value/6.35029;
        }
        else if(id == "inputPound"){
            once.value = value*16;
            kilogram.value = value/2.20462;
            gram.value = value*453.592; 
            tonne.value = value/2204.62;
            stone.value = value/14;
        }
        else if(id == "inputGram"){
            once.value = value/28.3495;
            kilogram.value = value/1000;
            pound.value = value/453.592;
            tonne.value = value/1e+6;
            stone.value = value/6350.29;
        }
        else if(id == "inputTonne"){
            once.value = value*35274;
            kilogram.value = value*1000;
            pound.value = value*2204.62;
            gram.value = value*1e+6; 
            stone.value = value*157.473;
        }
        else if(id == "inputStone"){
            once.value = value*224;
            kilogram.value = value*6.35029;
            pound.value = value*14;
            gram.value = value*6350.29; 
            tonne.value = value/157.473;
        }
    }
    const squareConverter = (id, value) => {
        let millimeter = document.querySelector("#inputMillimeter");
        let centimeter = document.querySelector("#inputCentimeter");
        let meter = document.querySelector("#inputMeter");
        let kilometer = document.querySelector("#inputKilometer");
        let yard = document.querySelector("#inputYard");
        let feet = document.querySelector("#inputFeet2");
        if (id == "inputMillimeter"){
            centimeter.value = value/100;
            meter.value = value/1000000;
            kilometer.value = value/1000000000000; 
            yard.value = value*0.0000011959900463011;
            feet.value = value*0.00001076391041671;
        } else if (id == "inputCentimeter") {
            millimeter.value = value*100;
            meter.value = value*0.0001;
            kilometer.value = value/10000000000; 
            yard.value = value*0.00011;
            feet.value = value*0.001076391041671;
        } else if (id == "inputMeter") {
            millimeter.value = value*1000000;
            centimeter.value = value*10000;
            kilometer.value = value*0.000001; 
            yard.value = value*1.1959900463011;
            feet.value = value*10.764;
        } else if (id == "inputKilometer") {
            millimeter.value = value*1000000000000;
            centimeter.value = value*10000000000;
            meter.value = value*1000000;
            yard.value = value*1195990.0463011;
            feet.value = value*10763910.41671;
        } else if (id == "inputYard") {
            millimeter.value = value/0.0000011960;
            centimeter.value = value*8361;
            meter.value = value*0.836;
            kilometer.value = value/1196000; 
            feet.value = value*90000;
        } else if (id == "inputFeet2") {
            millimeter.value = value/0.000010764;
            centimeter.value = value*929;
            meter.value = value*0.09290304;
            kilometer.value = value/10764000; 
            yard.value = value*0.11111;
        }
    }

function forCalculator(){
    document.getElementById('title').innerHTML = "Calculator";
    document.getElementById('table').style = "display: block;"
    document.getElementById('in-output').style = "display: block;"
    document.getElementById('length').style = "display: none;"
    document.getElementById('square').style = "display: none;"
    document.getElementById('myDIV').style = "display: none;"
    document.getElementById('numerical').style = "display: none;"
    document.getElementById('Calculator').style = "color: white;"
    document.getElementById('Length').style = "color: black;"
    document.getElementById('Weights').style = "color: black;"
    document.getElementById('Area').style = "color: black;"
    document.getElementById('Numerical').style = "color: black;"

}
function forLenght(){
    document.getElementById('title').innerHTML = "Length Converter";
    document.getElementById('table').style = "display: none;"
    document.getElementById('in-output').style = "display: none;"
    document.getElementById('myDIV').style = "display: none;"
    document.getElementById('square').style = "display: none;"
    document.getElementById('numerical').style = "display: none;"
    document.getElementById('length').style = "display: block;"
    document.getElementById('Length').style = "color: white;"
    document.getElementById('Calculator').style = "color: black;"
    document.getElementById('Weights').style = "color: black;"
    document.getElementById('Area').style = "color: black;"
    document.getElementById('Numerical').style = "color: black;"
}
function forweight(){
    document.getElementById('title').innerHTML = "Weight Converter";
    document.getElementById('table').style = "display: none;"
    document.getElementById('in-output').style = "display: none;"
    document.getElementById('length').style = "display: none;"
    document.getElementById('square').style = "display: none;"
    document.getElementById('numerical').style = "display: none;"
    document.getElementById('myDIV').style = "display: block;"
    document.getElementById('Weights').style = "color: white;"
    document.getElementById('Calculator').style = "color: black;"
    document.getElementById('Length').style = "color: black;"
    document.getElementById('Area').style = "color: black;"
    document.getElementById('Numerical').style = "color: black;"
}

function forArea(){
    document.getElementById('title').innerHTML = "Area Converter";
    document.getElementById('table').style = "display: none;"
    document.getElementById('in-output').style = "display: none;"
    document.getElementById('length').style = "display: none;"
    document.getElementById('myDIV').style = "display: none;"
    document.getElementById('numerical').style = "display: none;"
    document.getElementById('square').style = "display: block;"
    document.getElementById('Area').style = "color: white;"
    document.getElementById('Weights').style = "color: black;"
    document.getElementById('Calculator').style = "color: black;"
    document.getElementById('Length').style = "color: black;"
    document.getElementById('Numerical').style = "color: black;"
}
function forNumerical(){
    document.getElementById('title').innerHTML = "Numeral systems";
    document.getElementById('table').style = "display: none;"
    document.getElementById('in-output').style = "display: none;"
    document.getElementById('length').style = "display: none;"
    document.getElementById('myDIV').style = "display: none;"
    document.getElementById('square').style = "display: none;"
    document.getElementById('numerical').style = "display: block;"
    document.getElementById('Numerical').style = "color: white;"
    document.getElementById('Area').style = "color: black;"
    document.getElementById('Weights').style = "color: black;"
    document.getElementById('Calculator').style = "color: black;"
    document.getElementById('Length').style = "color: black;"

}
let memory = 0;
function cleaVALUE(){
    memory = 0;
}
function displaySavedValue(num) {
    document.getElementById('input').innerHTML = memory;
}
function displaySavedValueSumResult(num) {
    memory += document.getElementById('output').innerHTML * num;
}

function convertBase(value, from_base, to_base) {
    var range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('');
    var from_range = range.slice(0, from_base);
    var to_range = range.slice(0, to_base);
    
    var dec_value = value.split('').reverse().reduce(function (carry, digit, index) {
      if (from_range.indexOf(digit) === -1) throw new Error('Invalid digit `'+digit+'` for base '+from_base+'.');
      return carry += from_range.indexOf(digit) * (Math.pow(from_base, index));
    }, 0);
    
    var new_value = '';
    while (dec_value > 0) {
      new_value = to_range[dec_value % to_base] + new_value;
      dec_value = (dec_value - (dec_value % to_base)) / to_base;
    }
    return new_value || '0';
}

const Base_converter = (id, value) => {
    let binary = document.querySelector("#inputBinary");
    let decimal = document.querySelector("#inputDecimal");
    let hexadicimal = document.querySelector("#inputHexadicimal");
    if (id == "inputBinary"){
        decimal.value = convertBase(binary.value, 2, 10);
        hexadicimal.value = convertBase(binary.value, 2, 16);
    } else if (id == "inputDecimal") {
        binary.value = convertBase(decimal.value, 10, 2);
        hexadicimal.value = convertBase(decimal.value, 10, 16);
    } else if (id == "inputHexadicimal") {
        binary.value = convertBase(hexadicimal.value, 16, 2);
        decimal.value = convertBase(hexadicimal.value, 16, 10);
    }
}