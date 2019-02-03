using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for BL_Register_Login
/// </summary>
public class BL_Register_Login
{

    GlobalConnection gc = new GlobalConnection();
    public BL_Register_Login()
    {
        //
        // TODO: Add constructor logic here
        //
    }
    
    public string BL_SetRegisterData(string username,string fullname,string password,string country,string email,string contact)
    {
        string rtnMsg = "";
        SqlCommand cmd = new SqlCommand();
        cmd.Connection = gc.cn;
        if (cmd.Connection.State == ConnectionState.Closed)
        {
            cmd.Connection.Open();
        }

        cmd.CommandText = "SP_SetRegisterData";
        cmd.CommandType = System.Data.CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@uname", username);
        cmd.Parameters.AddWithValue("@fullname", fullname);
        cmd.Parameters.AddWithValue("@password", password);
        cmd.Parameters.AddWithValue("@country", country);
        cmd.Parameters.AddWithValue("@email",email);
        cmd.Parameters.AddWithValue("@phone", contact);

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

    public string BL_loginCheck(string uname , string password)
    {
        string rtnMsg = "";
        SqlCommand cmd = new SqlCommand();
        cmd.Connection = gc.cn;
        if (cmd.Connection.State == ConnectionState.Closed)
        {
            cmd.Connection.Open();
        }

        cmd.CommandText = "SP_loginCheck";
        cmd.CommandType = System.Data.CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@uname", uname);
        cmd.Parameters.AddWithValue("@pass", password);

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