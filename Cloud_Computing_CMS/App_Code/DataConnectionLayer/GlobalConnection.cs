using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for GlobalConnection
/// </summary>
public class GlobalConnection
{

    public SqlConnection cn = new SqlConnection();

    public GlobalConnection()
    {
        try
        {
            string strcon = System.Configuration.ConfigurationManager.ConnectionStrings["Cloud_Computing_CMSConnectionString"].ConnectionString;
            cn = new SqlConnection(strcon);
            cn.Open();
        }
        catch (Exception ex)
        {
            cn.Close();
            throw new Exception(ex.Message);

        }
    }
}