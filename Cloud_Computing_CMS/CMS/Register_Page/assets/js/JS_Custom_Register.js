var hostname = window.location.host;
var protocol = window.location.protocol;

var path = protocol + "//" + hostname;

var country_list = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];


var countryName = "";


loadCountriesName();


function loadCountriesName() {

    var disdata = "";
    disdata += '<span style=" margin: 0px 15px 0px 0px;;padding : 0;">Select Country:</span>';

    disdata += '<select onchange="showCountryNameById()" id="SelectCountryDropDownId">';
    disdata += '<option>Select Country</option>';

    for (var a = 0; a < country_list.length - 1; a++) {
        
        disdata += '<option value="'+ country_list[a] +'">'+ country_list[a] +'</option>';
    }
    disdata += '</select>';

    document.getElementById("countriesNameId").innerHTML = disdata;
}


function showCountryNameById() {

    countryName = document.getElementById("SelectCountryDropDownId").value;

}



function getRegisterData() {

    var fullname = document.getElementById("fullnameId").value;
    var username = document.getElementById("usernameId").value;
    var password = document.getElementById("passwordId").value;
    var email = document.getElementById("emailId").value;
    var contact = document.getElementById("contactId").value;

    var country = countryName;
    

    if (fullname == "" || fullname == null) {
        alert("Enter Full Name!!!");
        return;
    }

    if (username == "" || username == null) {
        alert("Enter User Name!!!");
        return;
    }

    if (password == "" || password == null) {
        alert("Enter Password!!!");
        return;
    }    


    if (email == "" || email == null) {
        alert("Enter valid Email!!!");
        return;
    }


    if (contact == "" || contact == null || contact.length > 10) {
        alert("Enter contact Number!!!");
        return;
    }


    $.ajax({
        url: '' + path + '/WebService/API_cloudComputing_CMS/API_cloudComputing_CMS_Webservice.asmx/API_SetRegisterData',
        data: { "username": username, "fullname": fullname, "password": password, "country": country, "email": email, "contact": contact },
        method: 'post',
        dataType: 'xml',
        success: function (response) {

            var rtData = response;
            var fnData = rtData.getElementsByTagName("string")[0].childNodes[0].nodeValue;

            if (fnData == '1') {
                alert("Successfully Registered!!!");
                window.location.href = path + "/index.html";
            } else {
                alert("Error While Registration!!!");
            }


        },
        error: function (error) {

            alert(error.responseText);
        }
    });
    

}