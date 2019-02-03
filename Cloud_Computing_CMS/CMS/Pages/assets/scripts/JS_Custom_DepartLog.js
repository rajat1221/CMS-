var hostname = window.location.host;
var protocol = window.location.protocol;

var path = protocol + "//" + hostname;


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
    document.getElementById("clientId").style.display = "none";
    document.getElementById("clientId1").style.display = "none";

}

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

            LoadDepartLogDetails(fnData);


        },
        error: function (error) {

            alert(error.responseText);
        }
    });
}


function ConvertStringToDate(jsDate) {

    var sync_date = jsDate;

    var jssdjate = sync_date.replace(/[^0-9 +]/g, '');
    var jsDate = new Date(parseInt(jssdjate));

    jssdjate = (parseInt(jsDate.getMonth()) + (+1)) + "-" + jsDate.getDate() + "-" + jsDate.getFullYear();

    return jssdjate;
}

function LoadDepartLogDetails(DepartLogData) {

    var jsonDeparLogObj = JSON.parse(DepartLogData);

    var disdata = "";

    disdata += '<table class="table table-hover">';
    disdata += '<thead>';
    disdata += '<tr>';
    disdata += '<th>S.N</th>';
    disdata += '<th>Username</th>';
    disdata += '<th>Container ID</th>';
    disdata += '<th>Zone</th>';
    disdata += '<th>Country</th>';
    disdata += '<th>Total Container</th>';
    disdata += '<th>Departure Date</th>';
    disdata += '<th>Arrival Date</th>';
    disdata += '<th>Status</th>';
    disdata += '<th>TO-DO List</th>';

    disdata += '</tr>';
    disdata += ' </thead>';

    for (var a = 0; a <= jsonDeparLogObj.length - 1 ; a++) {

        var departDate = ConvertStringToDate(jsonDeparLogObj[a].Depart_Date);
        var arrivalDate = ConvertStringToDate(jsonDeparLogObj[a].Arrival_Date);

        disdata += '<tbody>';
        disdata += ' <tr>';
        disdata += '<td>' + (a + 1) + '</td>';
        disdata += '<td>' + jsonDeparLogObj[a].Username + '</td>';
        disdata += '<td>' + jsonDeparLogObj[a].Container_ID + '</td>';
        disdata += '<td>' + jsonDeparLogObj[a].Zone + '</td>';
        disdata += '<td>' + jsonDeparLogObj[a].Country + '</td>';
        disdata += '<td>' + jsonDeparLogObj[a].Total_container + '</td>';
        disdata += '<td>' + departDate + '</td>';
        disdata += '<td>' + arrivalDate + '</td>';
        disdata += '<td>' + jsonDeparLogObj[a].Status + '</td>';


        if (jsonDeparLogObj[a].Status == "ON HOLD") {
            var contId = jsonDeparLogObj[a].Container_ID;
            disdata += '<td id="conformBookingId"><a href="javascript:conformBooking(\'' + contId + '\',\'' + jsonDeparLogObj[a].Zone + '\',\'' + jsonDeparLogObj[a].Country + '\')"><img src="' + path + '/CMS/Pages/assets/img/ook.png"" /></a></a><a href="javascript:CancelContainerButtonClick(\'' + jsonDeparLogObj[a].Zone + '\',\'' + jsonDeparLogObj[a].Country + '\',\'' + contId + '\')"><img src="' + path + '/CMS/Pages/assets/img/cancel.png" /></a> </a></td>';
        }
        else {
            disdata += '<td id="conformBookingId">-</td>';
        }

        disdata += '</tr>';
        disdata += ' </tbody>';
    }
    disdata += '</table>';

    document.getElementById("DepartLogDetail_Id").innerHTML = disdata;

}

getZoneContData();
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
            displayZoneContTable(fnData);
        


        },
        error: function (error) {

            alert(error.responseText);
        }
    });
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


    document.getElementById("allContDetTblId").innerHTML = disdata;
}

function conformBooking(contId,zonename, countryname) {
   
    contId = contId.trim();

    $.ajax({
        url: '' + path + '/WebService/API_cloudComputing_CMS/API_cloudComputing_CMS_Webservice.asmx/API_ConformBooking',
        data: { "contId": contId, "zonename": zonename, "countryname": countryname },
        method: 'post',
        dataType: 'xml',
        success: function (response) {

            var rtData = response;
            var fnData = rtData.getElementsByTagName("string")[0].childNodes[0].nodeValue;

            if (fnData == '1') {
                alert("Successfully Confirmed!!!");
                getDeptLogData();
            }
            else {
                alert("Error while confirming!!");
            }


        },
        error: function (error) {

            alert(error.responseText);
        }
    });
    
}

function CancelContainerButtonClick(zonename, countryname, containerId) {

    containerId = containerId.trim();

    $.ajax({
        url: '' + path + '/WebService/API_cloudComputing_CMS/API_cloudComputing_CMS_Webservice.asmx/API_CancelBooking',
        data: { "contId": containerId, "zonename": zonename, "countryname": countryname },
        method: 'post',
        dataType: 'xml',
        success: function (response) {

            var rtData = response;
            var fnData = rtData.getElementsByTagName("string")[0].childNodes[0].nodeValue;

            if (fnData == '1') {
                alert("Successfully Cancelled!!");
                getDeptLogData();

            } else {
                alert("Error on Operation!!");
            }


        },
        error: function (error) {

            alert(error.responseText);
        }
    });


}