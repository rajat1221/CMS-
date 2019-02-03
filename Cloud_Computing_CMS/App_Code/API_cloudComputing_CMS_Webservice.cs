using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for API_cloudComputing_CMS_Webservice
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
public class API_cloudComputing_CMS_Webservice : System.Web.Services.WebService
{

    public API_cloudComputing_CMS_Webservice()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string API_GetZoneCont_Info()
    {
        string rtnMsg = "";
        BL_zone_cont_ blzc = new BL_zone_cont_();
        rtnMsg = blzc.BL_getZoneCont_Info_JSON();
        return rtnMsg;
    }


    [WebMethod]
    public string API_setDepartData(string username,string contId, string totalCont, string deptDate, string arrivalDate, string zone, string country)
    {
        string rtnMsg = "";
        BL_DeptData bldd = new BL_DeptData();
        rtnMsg = bldd.BL_SetDepartureData(username,contId,totalCont,deptDate,arrivalDate,zone,country);
        return rtnMsg;
    }

   [WebMethod]
   public string API_getDepartData()
    {
        string rtnMsg = "";
        BL_DeptData bldd = new BL_DeptData();
        rtnMsg = bldd.BL_GetDepartData_JSON();
        return rtnMsg;
    }

    [WebMethod]
    public string API_getArrivalData(string username)
    {
        string rtnMsg = "";
        BL_ArrivalData blad = new BL_ArrivalData();
        rtnMsg = blad.BL_GetArrivalData_JSON(username);
        return rtnMsg;
    }

    [WebMethod]
    public string API_acceptContainer(string username,string zone, string country)
    {
        string rtnMsg = "";
        BL_ArrivalData blad = new BL_ArrivalData();
        rtnMsg = blad.BL_acceptContainer(username,zone, country);
        return rtnMsg;
    }


    [WebMethod]
    public string API_SetRegisterData(string username, string fullname, string password, string country, string email, string contact)
    {
        string rtnMsg = "";
        BL_Register_Login blrl = new BL_Register_Login();
        rtnMsg = blrl.BL_SetRegisterData(username, fullname, password, country, email, contact);
        return rtnMsg;
    }

    [WebMethod]
    public string API_LoginCheck(string uname, string pass)
    {
        string rtnMsg = "";
        BL_Register_Login blrl = new BL_Register_Login();
        rtnMsg = blrl.BL_loginCheck(uname, pass);
        return rtnMsg;
    }


    [WebMethod]
    public string API_ConformBooking(string contId,string zonename,string countryname)
    {
        string rtnMsg = "";
        BL_DeptData bldd = new BL_DeptData();
        rtnMsg = bldd.BL_conformBooking(contId,zonename,countryname);
        return rtnMsg;


    }


    [WebMethod]
    public string API_CancelBooking(string contId,string zonename,string countryname)
    {
        string rtnMsg = "";
        BL_ArrivalData blad = new BL_ArrivalData();
        rtnMsg = blad.BL_CancelBooking(contId,zonename,countryname);
        return rtnMsg;
    }
     
    

}
