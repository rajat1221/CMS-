using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

/// <summary>
/// Summary description for BL_ArrivalData
/// </summary>
public class BL_ArrivalData
{
    GlobalConnection gc = new GlobalConnection();
    public BL_ArrivalData()
    {
        //
        // TODO: Add constructor logic here
        //
    }


    //----------------------Convert Into JavaScript String(JavaScriptSerializer)------

    private static string ConvertDataTabletoString(DataTable dt)
    {

        JavaScriptSerializer serializer = new JavaScriptSerializer();

        List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();

        Dictionary<string, object> row;

        foreach (DataRow dr in dt.Rows)
        {
            row = new Dictionary<string, object>();
            foreach (DataColumn col in dt.Columns)
            {
                row.Add(col.ColumnName, dr[col]);
            }
            rows.Add(row);
        }
        return serializer.Serialize(rows);
    }

    //---------------------------------------------------------------------------------


    public DataTable BL_GetArrivalData(string username)
    {
        DataTable dt = new DataTable();
        SqlCommand cmd = new SqlCommand();
        cmd.Connection = gc.cn;
        if (cmd.Connection.State == ConnectionState.Closed)
        {
            cmd.Connection.Open();
        }
        cmd.CommandText = "SP_getArrivalData_";
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@username",username);

        SqlDataReader sdr = cmd.ExecuteReader();
        if (sdr.HasRows)
        {
            dt.Load(sdr);
        }
        sdr.Close();
        cmd.Connection.Close();
        return dt;
    }

    public string BL_GetArrivalData_JSON(string username)
    {
        try
        {
            DataTable columnData_dt = this.BL_GetArrivalData(username);
            return ConvertDataTabletoString(columnData_dt);
        }
        catch (Exception ex)
        {
            return ex.Message + "!!Error!!";
        }
    }


    public string BL_acceptContainer(string username,string zone,string country)
    {
        string rtnMsg = "";
        SqlCommand cmd = new SqlCommand();
        cmd.Connection = gc.cn;
        if (cmd.Connection.State == ConnectionState.Closed)
        {
            cmd.Connection.Open();
        }

        cmd.CommandText = "SP_AcceptContainer_";
        cmd.CommandType = System.Data.CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@username", username);
        cmd.Parameters.AddWithValue("@zone", zone);
        cmd.Parameters.AddWithValue("@country", country);

        SqlDataReader sdr = cmd.ExecuteReader();
        if (sdr.HasRows)
        {
            while (sdr.Read())
            {
                rtnMsg = sdr[0].ToString();
            }
        }
        sdr.Close();
        cmd.Connection.Close();
        return rtnMsg;
    }



    public string BL_CancelBooking(string contId,string zonename,string countryname)
    {
        string rtnMsg = "";
        SqlCommand cmd = new SqlCommand();
        cmd.Connection = gc.cn;
        if (cmd.Connection.State == ConnectionState.Closed)
        {
            cmd.Connection.Open();
        }

        cmd.CommandText = "SP_CancelBooking";
        cmd.CommandType = System.Data.CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@contId", contId);
        cmd.Parameters.AddWithValue("@zone", zonename);
        cmd.Parameters.AddWithValue("@country", countryname);

        SqlDataReader sdr = cmd.ExecuteReader();
        if (sdr.HasRows)
        {
            while (sdr.Read())
            {
                rtnMsg = sdr[0].ToString();
            }
        }
        sdr.Close();
        cmd.Connection.Close();
        return rtnMsg;
    }
}