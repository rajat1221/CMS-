var hostname = window.location.host;
var protocol = window.location.protocol;

var path = protocol + "//" + hostname;


function OnClickLogin() {

    var uname = document.getElementById("unameId").value;
    var pass = document.getElementById("passId").value;


    if (uname == null || uname == "") {
        alert("Empty Username!!");
        return;
    }

    if (pass == null || pass == "") {
        alert("Empty Password!!");
        return;
    }

    $.ajax({
        url: '' + path + '/WebService/API_cloudComputing_CMS/API_cloudComputing_CMS_Webservice.asmx/API_LoginCheck',
        data: { "uname": uname, "pass": pass },
        method: 'post',
        dataType: 'xml',
        success: function (response) {

            var rtData = response;
            var fnData = rtData.getElementsByTagName("string")[0].childNodes[0].nodeValue;

            var splitfnData = fnData.split('+');

            var username = splitfnData[1];
            var role = splitfnData[2];

            if (splitfnData[0] == '1') {

                sessionStorage.setItem('SessioUsername', JSON.stringify(username));
                sessionStorage.setItem('SessionRole', JSON.stringify(role));

                if (role == "client") {
                    window.location = path + "/CMS/Pages/";
                } else {
                    window.location = path + "/CMS/Pages/Depart_log.html";
                }

            }
            else {
                alert("Error while login!!!");
            }


        },
        error: function (error) {

            alert(error.responseText);
        }
    });


}

