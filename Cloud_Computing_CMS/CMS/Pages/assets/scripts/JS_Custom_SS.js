var hostname = window.location.host;
var protocol = window.location.protocol;

var path = protocol + "//" + hostname;

getStockData();

function getStockData() {
    $.ajax({
        url: '' + path + '/WebService/FYP_CMES_WebService/FYP_CMES_Webservice.asmx/API_getStockData',
        data: {},
        method: 'post',
        dataType: 'xml',
        success: function (response) {

            var rtData = response;
            var fnData = rtData.getElementsByTagName("string")[0].childNodes[0].nodeValue;

            displayStockStatusTable(fnData);
            

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



function displayStockStatusTable(S_Data) {

    var jsonObj = JSON.parse(S_Data);

    var disdata = "";

    disdata += '<table class="table table-hover">';
    disdata += '<thead>';
    disdata += '<tr>';
    disdata += '<th>S.N</th>';
    disdata += '<th>PO_ID</th>';
    disdata += '<th>Material Name</th>';
    disdata += '<th>Quantity</th>';
    disdata += '<th>Rate</th>';
    disdata += '<th>Total Price</th>';
    disdata += '<th>Imported Date</th>';
    disdata += '<th>Supplier Company</th>';
    disdata += '<th>Supplier Name</th>';
    disdata += '<th>Status</th>';
    //disdata += '<th>To Do List</th>';
    disdata += '</tr>';
    disdata += ' </thead>';

    for (var a = 0; a <= jsonObj.length - 1 ; a++) {

        var convertedDate_ = ConvertStringToDate(jsonObj[a].Imported_Date);
        disdata += '<tbody>';
        disdata += ' <tr>';
        disdata += '<td>' + (a + 1) + '</td>';
        disdata += '<td>' + jsonObj[a].PO_Id + '</td>';
        disdata += '<td>' + jsonObj[a].Material_Name + '</td>';
        disdata += '<td>' + jsonObj[a].Material_Qty + '</td>';
        disdata += '<td>' + jsonObj[a].Rate + '</td>';
        disdata += '<td>Rs. ' + jsonObj[a].Total_price + '</td>';
        disdata += '<td>' + convertedDate_ + '</td>';
        disdata += '<td>' + jsonObj[a].Supplier_comp + '</td>';
        disdata += '<td>' + jsonObj[a].Supplier_Name + '</td>';
        disdata += '<td>' + jsonObj[a].Status + '</td>';
        //disdata += '<td><a href="javascript:okButton(\'' + jsonObj[a].PO_Id + '\')"><img src="' + path + '/images/cms_img/ook.png" /></a> </a> <a href="javascript:cancelButton(\'' + jsonObj[a].PO_Id + '\')"><img src="' + path + '/images/cms_img/cancel.png" /></a> </td>';
        disdata += '</tr>';
        disdata += ' </tbody>';
    }



    disdata += '</table>';



    document.getElementById("StockStatus_id").innerHTML = disdata;

}