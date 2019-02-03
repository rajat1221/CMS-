using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

/// <summary>
/// Summary description for BL_zone_cont_
/// </summary>
public class BL_zone_cont_
{
    GlobalConnection gc = new GlobalConnection();
    public BL_zone_cont_()
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


    
    public DataTable BL_getZoneCont_Info()
    {
        DataTable dt = new DataTable();
        SqlCommand cmd = new SqlCommand();
        cmd.Connection = gc.cn;
        if (cmd.Connection.State == ConnectionState.Closed)
        {
            cmd.Connection.Open();
        }
        cmd.CommandText = "SP_GetZoneCont_Data";
        cmd.CommandType = CommandType.StoredProcedure;

        SqlDataReader sdr = cmd.ExecuteReader();
        if (sdr.HasRows)
        {
            dt.Load(sdr);
        }
        sdr.Close();
        cmd.Connection.Close();
        return dt;
    }


    public string BL_getZoneCont_Info_JSON()
    {
        try
        {
            DataTable columnData_dt = this.BL_getZoneCont_Info();
            return ConvertDataTabletoString(columnData_dt);
        }
        catch (Exception ex)
        {
            return ex.Message + "!!Error!!";
        }
    }



}
