using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using TMS_Application.Models;
using System.Data;
using System;
using System.Net.Mail;
using System.Net;
using System.Configuration;

namespace TMS_Application.Controllers
{
    public class UserController : Controller
    {
        private readonly IConfiguration configuration;
        public UserController(IConfiguration _configuration)
        {
            this.configuration = _configuration;
        }
        public IActionResult Index()
        {
            // Setting Mail Configurations in Session Variable
            HttpContext.Session.SetString("mfromEmail", configuration.GetSection("MailSettings").GetSection("mfromEmail").Value);
            HttpContext.Session.SetString("Username", configuration.GetSection("MailSettings").GetSection("Username").Value);
            HttpContext.Session.SetString("Password", configuration.GetSection("MailSettings").GetSection("Password").Value);
            HttpContext.Session.SetString("SMTPServer", configuration.GetSection("MailSettings").GetSection("SMTPServer").Value);
            HttpContext.Session.SetString("SMTP_Port", configuration.GetSection("MailSettings").GetSection("SMTP_Port").Value);
            HttpContext.Session.SetString("EnableSSL_TrueFalse", configuration.GetSection("MailSettings").GetSection("EnableSSL_TrueFalse").Value);

            if (!String.IsNullOrEmpty(HttpContext.Session.GetString("email")) 
                || !String.IsNullOrEmpty(HttpContext.Session.GetString("empno")) 
                || !String.IsNullOrEmpty(HttpContext.Session.GetString("UserRole")) 
                || !String.IsNullOrEmpty(HttpContext.Session.GetString("empname"))) 
            {
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }
        }
        [HttpPost]
        [Route("api/TMS/AddUser")]
        public JsonResult tmsuser(clsUserInfo user)
        {
            var con = this.configuration.GetConnectionString("TMSConn");
            var result = "";
            Random _random = new Random();
            int num = _random.Next();
            using (SqlConnection sqlCon = new SqlConnection(con))
            {
                sqlCon.Open();
                SqlCommand sqlcmd = new SqlCommand("PRC_AddUser", sqlCon);
                sqlcmd.CommandType = CommandType.StoredProcedure;
                sqlcmd.Parameters.AddWithValue("@First_Name", user.FirstName);
                sqlcmd.Parameters.AddWithValue("@LastName", user.LastName);
                sqlcmd.Parameters.AddWithValue("@DateOfbirth", user.Birth_Date);
                sqlcmd.Parameters.AddWithValue("@Address", user.Addresh);
                sqlcmd.Parameters.AddWithValue("@Email", user.Email);
                sqlcmd.Parameters.AddWithValue("@PhoneNumber", user.Phone_Number);
                sqlcmd.Parameters.AddWithValue("@RoleId", user.UserRole);
                sqlcmd.Parameters.AddWithValue("@UserID", user.UserId);
                sqlcmd.Parameters.AddWithValue("@CreatedBy", user.createdby);
                sqlcmd.Parameters.AddWithValue("@Password", num);
                result = (string)sqlcmd.ExecuteScalar();
                sqlCon.Close();
            }
            if (user.UserId == 0)
            {
                if (result == "")
                {
                    String textbody = "";
                    textbody += "<span style='font-weight:700;'>Dear "+user.FirstName+"</span><br>"; //+ Environment.NewLine;
                    textbody += "Your Credential for Timesheet has been created. Your Credentials are stated below:<br>";
                    textbody += "UserName: <b>" + user.Email + "</b><br>";
                    textbody += "Password: <b>" + num + "</b><br>";
                    textbody += "Please click the button below to Log-In to the Timesheet System to Log In</p>";// + Environment.NewLine;
                    textbody += "<br><br><br>";
                    textbody += "<a href='#' style='background-color: #1A4568; border: none; color: white; padding: 8px 15px; text-align: center; text-decoration: none; font-size: 16px; cursor: pointer; border-radius: 5px;'>Click Here</a>";

                    string SMTPServer = HttpContext.Session.GetString("SMTPServer");
                    bool EnableSSL_TrueFalse = Convert.ToBoolean(HttpContext.Session.GetString("EnableSSL_TrueFalse"));
                    string Username = HttpContext.Session.GetString("Username");
                    string Password = HttpContext.Session.GetString("Password");
                    int SMTP_Port = Convert.ToInt32(HttpContext.Session.GetString("SMTP_Port"));
                    string mfromEmail = HttpContext.Session.GetString("mfromEmail");

                    string EmailStatus = "";
                    try
                    {
                        using (MailMessage mm = new MailMessage())
                        {
                            mm.From = new MailAddress(mfromEmail);
                            mm.To.Add(mfromEmail);
                            mm.Subject = "User Credential for Timesheet";
                            mm.Body = textbody;
                            mm.IsBodyHtml = true;
                            mm.To.Add(new MailAddress(user.Email));
                            //mm.To.Add("bipradas.guin@mendine.com");
                            //string[] Multi = request.mToEmail.ToArray();
                            //foreach (string Multimailid in listOfEmails)
                            //{
                            //    mm.To.Add(new MailAddress(Multimailid));
                            //}
                            //mm.To.Add(new MailAddress("dominica.halder@iecsl.co.in"));
                            //mm.To.Add(new MailAddress(info.EntryUser));
                            SmtpClient smtp = new SmtpClient(SMTPServer, SMTP_Port);
                            //smtp.Host = SMTPServer;
                            smtp.EnableSsl = EnableSSL_TrueFalse;
                            NetworkCredential NetworkCred = new NetworkCredential(Username, Password);

                            smtp.UseDefaultCredentials = false;
                            smtp.Credentials = NetworkCred;
                            //smtp.Port = SMTP_Port;
                            smtp.Send(mm);
                            EmailStatus = "";
                            return new JsonResult(EmailStatus);
                        }
                    }
                    catch (Exception ex)
                    {
                        EmailStatus = ex.Message.ToString();
                        return new JsonResult(EmailStatus);
                    }
                    finally { }
                }
                else
                {
                    return new JsonResult(result);
                }
            }
            else
            {
                return new JsonResult(result);
            }
        }
        [HttpGet]
        [Route("api/TMS/ddlUserRole")]
        public JsonResult tmsroledisplay()
        {
            string sqlCon = this.configuration.GetConnectionString("TMSConn");
            List<clsRoleInfo> list = new List<clsRoleInfo>();
            SqlConnection sqlConn = new SqlConnection(sqlCon);
            DataTable dataTable = new DataTable();
            sqlConn.Open();
            SqlCommand sqlCmd = new SqlCommand("PRC_displayUserRole", sqlConn);
            sqlCmd.CommandType = CommandType.StoredProcedure;
            dataTable.Load(sqlCmd.ExecuteReader());
            foreach (DataRow row in dataTable.Rows)
            {
                clsRoleInfo obj = new clsRoleInfo();
                obj.RoleId = (int)row["RoleID"];
                obj.RoleName = (string)row["Role_name"];
                obj.Description = (string)row["Description"];
                list.Add(obj);
            }
            //{
            //    SqlDataAdapter sqlDa = new SqlDataAdapter("usp_ViewCourse", sqlCon);
            //    sqlDa.Fill(dataTable);
            //}
            return new JsonResult(list);
        }
        [HttpGet]
        [Route("api/TMS/DisplayUser")]
        public JsonResult tmsuserdisplay()
        {
            string sqlcon = this.configuration.GetConnectionString("TMSConn");
            List<clsUserInfo> list = new List<clsUserInfo>();
            SqlConnection sqlConn = new SqlConnection( sqlcon);
            DataTable dataTable = new DataTable();
            sqlConn.Open();
            SqlCommand sqlCmd = new SqlCommand("PRC_DisplayUser", sqlConn);
            sqlCmd.CommandType = CommandType.StoredProcedure;
            dataTable.Load(sqlCmd.ExecuteReader());
            foreach(DataRow row in dataTable.Rows)
            {
                clsUserInfo obj = new clsUserInfo();
                obj.UserId = (int)row["UserID"];
                obj.FirstName = (string)row["First_Name"];
                obj.LastName = (string)row["Last_Name"];
                obj.Addresh = (string)row["Address"];
                obj.Email = (string)row["Email"];
                obj.Birth_Date = (string)row["Date_of_birth"];
                obj.Phone_Number = (string)row["Phone_Number"];
                obj.Role_name = (string)row["Role_name"];
                obj.UserRole = (int)row["RoleID"];
                list.Add(obj);
            }
            return new JsonResult(list);
        }
        //User alteration
        [HttpGet]
        [Route("api/TMS/EditUser")]
        public JsonResult tmsUserEdit(int userid)
        {
            string sqlcon = this.configuration.GetConnectionString("TMSConn");
            List<clsUserInfo> list = new List<clsUserInfo>();
            SqlConnection sqlConn = new SqlConnection(sqlcon);
            DataTable dataTable = new DataTable();
            sqlConn.Open();
            SqlCommand sqlCmd = new SqlCommand("PRC_DisplayUser", sqlConn);
            sqlCmd.CommandType = CommandType.StoredProcedure;
            dataTable.Load(sqlCmd.ExecuteReader());
            foreach (DataRow row in dataTable.Rows)
            {
                clsUserInfo obj = new clsUserInfo();
                obj.UserId = (int)row["UserID"];
                obj.FirstName = (string)row["First_Name"];
                obj.LastName = (string)row["Last_Name"];
                obj.Addresh = (string)row["Address"];
                obj.Email = (string)row["Email"];
                obj.Birth_Date = (string)row["Date_of_birth"];
                obj.Phone_Number = (string)row["Phone_Number"];
                obj.Role_name = (string)row["Role_name"];
                obj.UserRole = (int)row["RoleID"];
                list.Add(obj);
            }
            //var result = list.Where(x => x.UserId == userid).ToList().Count();
            var result = list.Where(x => x.UserId == userid);
            return new JsonResult(result);
        }
        [HttpPost]
        [Route("api/TMS/DelUser")]
        public JsonResult tmsUserDel(clsUserInfo id)
        {
            var con = this.configuration.GetConnectionString("TMSConn");
            var result = "";
            using (SqlConnection sqlCon = new SqlConnection(con))
            {
                sqlCon.Open();
                SqlCommand sqlcmd = new SqlCommand("PRC_userDel", sqlCon);
                sqlcmd.CommandType = CommandType.StoredProcedure;
                sqlcmd.Parameters.AddWithValue("@userid", id.UserId);
                result = (string)sqlcmd.ExecuteScalar();
                sqlCon.Close();
            }
            return new JsonResult(result);
        }
        [HttpPost]
        [Route("api/TMS/UserPwChange")]
        public JsonResult tmsPasschange(clsUserInfo user)
        {
            var con = this.configuration.GetConnectionString("TMSConn");
            var result = "";
            //Random _random = new Random();
            //int num = _random.Next();
            using (SqlConnection sqlCon = new SqlConnection(con))
            {
                sqlCon.Open();
                SqlCommand sqlcmd = new SqlCommand("PRC_ChangePass", sqlCon);
                sqlcmd.CommandType = CommandType.StoredProcedure;
                sqlcmd.Parameters.AddWithValue("@Email", user.Email);
                sqlcmd.Parameters.AddWithValue("@Password", user.Password);
                result = (string)sqlcmd.ExecuteScalar();
                sqlCon.Close();
            }
            HttpContext.Session.Remove("email");
            HttpContext.Session.Remove("empno");
            HttpContext.Session.Remove("UserRole");
            HttpContext.Session.Remove("empname");
            return new JsonResult(result);
        }

    }
}
