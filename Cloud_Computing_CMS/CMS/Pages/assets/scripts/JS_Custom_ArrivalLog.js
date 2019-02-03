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



getArrivalLogData();

function getArrivalLogData() {

    username = username.trim();

    $.ajax({
        url: '' + path + '/WebService/API_cloudComputing_CMS/API_cloudComputing_CMS_Webservice.asmx/API_getArrivalData',
        data: {"username" : username},
        method: 'post',
        dataType: 'xml',
        success: function (response) {

            var rtData = response;
            var fnData = rtData.getElementsByTagName("string")[0].childNodes[0].nodeValue;

            if (fnData.length > 0) {

                LoadArrivalLogDetails(fnData);
            } else {
                LoadArrivalLogDetails();
            }
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

function LoadArrivalLogDetails(ArrivalLogData) {



    var jsonArrivalLogObj = JSON.parse(ArrivalLogData);

    var disdata = "";

    disdata += '<table class="table table-hover">';
    disdata += '<thead>';
    disdata += '<tr>';
    disdata += '<th>S.N</th>';
    disdata += '<th>Container ID</th>';
    disdata += '<th>Zone</th>';
    disdata += '<th>Country</th>';
    disdata += '<th>Total Container</th>';
    disdata += '<th>Departure Date</th>';
    disdata += '<th>Arrival Date</th>';
    disdata += '<th>Status</th>';
    disdata += '<th>To-Do List</th>';
    disdata += '</tr>';
    disdata += ' </thead>';

    for (var a = 0; a <= jsonArrivalLogObj.length - 1 ; a++) {

        var departDate = ConvertStringToDate(jsonArrivalLogObj[a].Depart_Date);
        var arrivalDate = ConvertStringToDate(jsonArrivalLogObj[a].Arrival_Date);
        
        disdata += '<tbody>';
        disdata += ' <tr>';
        disdata += '<td>' + (a + 1) + '</td>';
        disdata += '<td>' + jsonArrivalLogObj[a].Container_ID + '</td>';
        disdata += '<td>' + jsonArrivalLogObj[a].Zone + '</td>';
        disdata += '<td>' + jsonArrivalLogObj[a].Country + '</td>';
        disdata += '<td>' + jsonArrivalLogObj[a].Total_container + '</td>';
        disdata += '<td>' + departDate + '</td>';
        disdata += '<td>' + arrivalDate + '</td>';
        disdata += '<td>' + jsonArrivalLogObj[a].Status + '</td>';

        if (jsonArrivalLogObj[a].Status == "ON HOLD") {
            
            disdata += '<td id="acceptContainerId0"> <a href="javascript:CancelContainerButtonClick(\''+ jsonArrivalLogObj[a].Container_ID +'\',\''+ jsonArrivalLogObj[a].Container_ID +'\',\'' + jsonArrivalLogObj[a].Zone + '\',\'' + jsonArrivalLogObj[a].Country + '\')"><img src="' + path + '/CMS/Pages/assets/img/cancel.png" /></a> </a></td>';

        }
        else if(jsonArrivalLogObj[a].Status == "ON BOARD"){
            disdata += '<td id="acceptContainerId0"><a href="javascript:AcceptContainerButtonClick(\'' + jsonArrivalLogObj[a].Container_ID + '\',\'' + jsonArrivalLogObj[a].Zone + '\',\'' + jsonArrivalLogObj[a].Country + '\')"><img src="' + path + '/CMS/Pages/assets/img/ook.png" /></a> </a></td>';

        }

        else  {

            disdata += '<td id="acceptContainerId0">-</td>';
            
        }

        disdata += '</tr>';
        disdata += ' </tbody>';
    }
    disdata += '</table>';

    document.getElementById("ArrivalLogDetail_Id").innerHTML = disdata;

}

function CancelContainerButtonClick(containerId, zonename, countryname) {


    $.ajax({
        url: '' + path + '/WebService/API_cloudComputing_CMS/API_cloudComputing_CMS_Webservice.asmx/API_CancelBooking',
        data: {"contId" : containerId, "zonename": zonename, "countryname": countryname },
        method: 'post',
        dataType: 'xml',
        success: function (response) {

            var rtData = response;
            var fnData = rtData.getElementsByTagName("string")[0].childNodes[0].nodeValue;

            if (fnData == '1') {
                alert("Successfully Cancelled!!");
                getArrivalLogData();
            } else {
                alert("Error on Operation!!");
            }


        },
        error: function (error) {

            alert(error.responseText);
        }
    });


}


function AcceptContainerButtonClick(containerId, zone, country) {
    
    zone = zone.trim();
    country = country.trim();
    username = username.trim();

    $.ajax({
        url: '' + path + '/WebService/API_cloudComputing_CMS/API_cloudComputing_CMS_Webservice.asmx/API_acceptContainer',
        data: {"username" : username,"zone" : zone,"country" : country},
        method: 'post',
        dataType: 'xml',
        success: function (response) {

            var rtData = response;
            var fnData = rtData.getElementsByTagName("string")[0].childNodes[0].nodeValue;

            if (fnData == '1') {
                alert("Successfull Operation!!");
                getArrivalLogData();
            } else {
                alert("Error on Operation!!");
            }

            
        },
        error: function (error) {

            alert(error.responseText);
        }
    });

}