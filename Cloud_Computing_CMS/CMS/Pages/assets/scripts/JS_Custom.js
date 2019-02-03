var hostname = window.location.host;
var protocol = window.location.protocol;

var path = protocol + "//" + hostname;

var jsonZoneContDataObj = '[{}]';
var deptDataJsonObj = '[{}]';
var deptContainerId = "";
var deptContainerStatus = "";


function OnClickLogOut() {
    sessionStorage.clear();

    window.location.href = path + "/index.html";

}

var username = sessionStorage.getItem('SessioUsername');
username = JSON.parse(username);
var userRole = sessionStorage.getItem('SessionRole');
userRole = JSON.parse(userRole);

if (userRole == 'client') {
    document.getElementById("usernameSpanId").innerHTML = username;
    document.getElementById("adminId").style.display = "none";

    

} else {
    document.getElementById("usernameSpanId").innerHTML = username;
    
}



getZoneContData();


function ConvertStringToDate(jsDate) {

    var sync_date = jsDate;

    var jssdjate = sync_date.replace(/[^0-9 +]/g, '');
    var jsDate = new Date(parseInt(jssdjate));

    jssdjate = (parseInt(jsDate.getMonth()) + (+1)) + "-" + jsDate.getDate() + "-" + jsDate.getFullYear();

    return jssdjate;
}

function getZoneContData() {
    $.ajax({
        url: '' + path + '/WebService/API_cloudComputing_CMS/API_cloudComputing_CMS_Webservice.asmx/API_GetZoneCont_Info',
        data: {},
        method: 'post',
        dataType: 'xml',
        success: function (response) {

            var rtData = response;
            var fnData = rtData.getElementsByTagName("string")[0].childNodes[0].nodeValue;

            jsonZoneContDataObj = JSON.parse(fnData);
            //displayZoneContTable(fnData);
            displayZoneSelect(fnData);


        },
        error: function (error) {

            alert(error.responseText);
        }
    });
}

var deptData = "";

getDeptLogData();

function getDeptLogData() {
    $.ajax({
        url: '' + path + '/WebService/API_cloudComputing_CMS/API_cloudComputing_CMS_Webservice.asmx/API_getDepartData',
        data: {},
        method: 'post',
        dataType: 'xml',
        success: function (response) {

            var rtData = response;
            var fnData = rtData.getElementsByTagName("string")[0].childNodes[0].nodeValue;

            deptData = fnData;
            deptDataJsonObj = JSON.parse(fnData);
            deptContainerId = deptDataJsonObj[0].Container_ID;
            deptContainerStatus = deptDataJsonObj[0].Status;

            //alert(deptContainerId + "~~" + deptContainerStatus);

        },
        error: function (error) {

            alert(error.responseText);
        }
    });



}




function getSubCategorylist(jsonObjZoneContData) {

    var a = "";
    var b = "";
    var c = "";
    var ii = jsonObjZoneContData.length;

    for (var tc = 0; tc < ii; tc++) {

        a = jsonObjZoneContData[tc]._zone_name;

        var bb = b.split("+");
        var y = b.split("+").length;

        for (var i = 0; i < b.split("+").length; i++) {

            if (a != bb[i]) {

                y = y - 1;

            }
        }

        if (y == 0) {

            b += a + "+";
            c += a + "+";

        }

    }

    return c;

}

function getSubCategoryCountry(zoneName, jsonObj) {

    var xi = jsonObj.length - 1;
    var ns = xi;
    var rtdata = "";

    for (ns; ns >= 0; ns--) {

        if (jsonObj[ns]._zone_name == zoneName) {

            rtdata += jsonObj[ns]._country_name + "+";

        }

    }

    return rtdata;
}


function getSubCategoryContainerNumber(countryName, jsonObj) {

    var xi = jsonObj.length - 1;
    var ns = xi;
    var rtdata = "";

    for (ns; ns >= 0; ns--) {

        if (jsonObj[ns]._country_name == countryName) {

            rtdata += jsonObj[ns]._total_container_number + "+";

        }

    }

    return rtdata;
}

function displayZoneContTable(zon_cont_data) {

    var jsonObj = JSON.parse(zon_cont_data);

    var disdata = "";

    disdata += '<table class="table table-hover">';
    disdata += '<thead>';
    disdata += '<tr>';
    //disdata += '<th>S.N</th>';
    disdata += '<th>Zone Cont Id</th>';
    disdata += '<th>Zone Name</th>';
    disdata += '<th>Country Name</th>';
    disdata += '<th>Total Container</th>';
    disdata += '<th>Available Container</th>';
    disdata += '</tr>';
    disdata += ' </thead>';

    for (var a = 0; a <= jsonObj.length - 1 ; a++) {

        disdata += '<tbody>';
        disdata += ' <tr>';
        //disdata += '<td>' + (a + 1) + '</td>';
        disdata += '<td>' + jsonObj[a]._zone_cont_Id + '</td>';
        disdata += '<td>' + jsonObj[a]._zone_name + '</td>';
        disdata += '<td>' + jsonObj[a]._country_name + '</td>';
        disdata += '<td>' + jsonObj[a]._total_container_number + '</td>';
        disdata += '<td>' + jsonObj[a]._available_container_number + '</td>';
        disdata += '</tr>';
        disdata += ' </tbody>';
    }
    disdata += '</table>';

    document.getElementById("Zone_cont_Id").innerHTML = disdata;
}

function displayZoneSelect(ZoneContData) {

    var jsonZoneContData = JSON.parse(ZoneContData);

    var zoneName = getSubCategorylist(jsonZoneContData); //all COntinent Names

    zoneName = zoneName.split('+');

    var disdata = "";

    disdata += '<div class="panel-heading">';
    disdata += '<h3 class="panel-title"> Step 1: Select Zone</h3>';
    disdata += '</div>';
    disdata += '<div class="panel-body">';

    disdata += '<div id="_choose_zone_id">';

    for (var a = 0; a < zoneName.length - 1 ; a++) {

        disdata += '<label class="fancy-radio">';
        disdata += '<input name="zone" onclick="displaySelectCountryContainer(\'' + zoneName[a] + '\')" value="' + zoneName[a] + '" type="radio"><span class="_select_zone_span"><i></i>' + zoneName[a] + '</span>';
        disdata += '</label>';
    }

    disdata += '</div>';
    disdata += '</div>';

    document.getElementById("select_zone_panel_Id").innerHTML = disdata;

}


function displaySelectCountryContainer(zoneName) {

    var containerName_ = "";
    var zoneName_ = zoneName;

    var jsonzoneContDATA = jsonZoneContDataObj;

    var countryName = getSubCategoryCountry(zoneName, jsonzoneContDATA);

    countryName = countryName.split('+');

    var disdata = "";
    disdata += '<div class="panel-heading">';
    disdata += '<h3 class="panel-title">Step 2 : Select Country and Container</h3>';
    disdata += '</div>';
    disdata += '<div class="panel-body">';

    disdata += '<div id="_choose_container_id">';

    for (var a = 0; a < countryName.length - 1; a++) {

        var containerNumber = getSubCategoryContainerNumber(countryName[a], jsonzoneContDATA);
        
        containerNumber = containerNumber.split('+');

        disdata += '<h4>' + (a + 1) + '.&nbsp;' + countryName[a] + '</h4>';

        for (var b = 0; b <= containerNumber[0] - 1; b++) {

            var containerID = "ML_" + countryName[a] + "_00" + (b + 1);

            getDeptLogData();

            if (deptData.includes(containerID) && (deptContainerStatus === 'ON HOLD' || deptContainerStatus === 'ON BOARD')) {

                continue;
            }

            disdata += '<input type="radio" name="' + zoneName_ + '" value="' + containerID + "+" + countryName[a] + '" ><span><i></i>' + containerID + '</span> ';
            disdata += '<br />';
            
        }
    }

    
    disdata += '<h4>Arrival Date :</h4>';
    disdata += '<input type="date" id="arrivalDate"';


    disdata += '</label>';
    disdata += '<br />';
    disdata += '<br />';

    disdata += '</div>';
    

    disdata += '<button class="btn btn-primary" id="submitButton" type="button" onClick="goNextStep(\'' + zoneName_ + '\')" >';
    disdata += '<span class="btn-btn-primary"">Next</span>';
    disdata += '</button>';


    disdata += '</div';

    document.getElementById("_select_container_panel_id").innerHTML = disdata;
    
}


function goNextStep(zoneName) {

    var radios = document.getElementsByName(zoneName);

    for (var i = 0, length = radios.length; i < length; i++) {

        if (radios[i].checked) {
            // do whatever you want with the checked radio
            var SelectedContainer = (radios[i].value);
            var selectedZone = (radios[i].name);

            // only one radio can be logically checked, don't check the rest
            break;
        }

    }


    //problem with country name

    var container_name = SelectedContainer;
    var SplitValue = container_name.split('+');
    container_name = SplitValue[0];
    var countryName = SplitValue[1];

    var zoneName = selectedZone;


    //alert(countryName + zoneName + container_name);
 


    var total_container = "1";

    var Destination = zoneName;


    var date = new Date();
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }

    var month = date.getMonth() + 1;

    if (month < 10) {
        month = "0" + month;
    }

    var year = date.getFullYear();

    var currentDate = year + '-' + month + '-' + day;


    var deptDate = currentDate;


    var arrivalDate = document.getElementById("arrivalDate").value;

    document.getElementById("mainRowId").style.display = "none";

    var disdata = "";
    disdata += '<div class="col-md-6" style="width : 100%;">';

    disdata += '<div class="panel">';
    disdata += '<div class="panel-heading">';
    disdata += '<h3 class="panel-title">Step 3 : Confirmation</h3>';
    disdata += '</div>';
    disdata += '<div class="panel-body">';
    disdata += '<h4>Container Id : ' + container_name + ' </h4>';
    disdata += '<h4>Total Container : 1</h4>';
    disdata += '<h4>Zone : ' + Destination + '</h4>';
    disdata += '<h4>Country : ' + countryName + '</h4>';
    disdata += '<h4>Booked Date : ' + deptDate + '</h4>';
    disdata += '<h4>Arrival Date : ' + arrivalDate + '</h4>';


    disdata += '<button class="btn btn-primary submitButton" type="button" onClick="Submit_Selected_container(\'' + container_name + '\',\'' + Destination + '\',\'' + countryName + '\',\'' + deptDate + '\',\'' + arrivalDate + '\')" >Submit</button>';

    disdata += '<button class="btn btn-primary submitButton" type="button" onClick="Conf_go_back()">Cancel</span>';
    disdata += '</button>';
    

    disdata += '</div>';
    disdata += '</div>';


    disdata += '</div>';

    document.getElementById("stepTwoSection").innerHTML = disdata;

}

function Submit_Selected_container(contId, zone, country, deptDate, arrivalDate) {

    contId = contId.trim();
    var totalCont = "1";
    deptDate = deptDate.trim();
    arrivalDate = arrivalDate.trim();
    zone = zone.trim();
    country = country.trim();
    username = username.trim();

    $.ajax({
        url: '' + path + '/WebService/API_cloudComputing_CMS/API_cloudComputing_CMS_Webservice.asmx/API_setDepartData',
        data: {"username" : username, "contId": contId, "totalCont": totalCont, "deptDate": deptDate, "arrivalDate": arrivalDate, "zone": zone, "country": country },
        method: 'post',
        dataType: 'xml',
        success: function (response) {
            var rtData = response;
            var fnData = rtData.getElementsByTagName("string")[0].childNodes[0].nodeValue;

            if (fnData == "1") {
                alert("Successfull Operation!!");
                //document.getElementById("stepTwoSection").style.display = "none";
                //document.getElementById("mainRowId").style.display = "block";

                window.location.href = path + "/CMS/Pages/Arrival_Log.html";

            } else {
                alert("Error Or Invalid Data!!!");
            }
        },
        error: function (error) {
            alert(error.responseText);
        }
    });

}

function Conf_go_back() {

    window.location.href = path + "/CMS/Pages/";

}