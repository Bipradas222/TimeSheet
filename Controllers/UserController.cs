using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using TMS_Application.Models;
using System.Data;


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
            return View();
        }
        [HttpPost]
        [Route("api/TMS/AddUser")]
        public JsonResult tmsuser(clsUserInfo user)
        {
            var con = this.configuration.GetConnectionString("TMSConn");
            var result = "";
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
                result = (string)sqlcmd.ExecuteScalar();
                sqlCon.Close();
            }
            return new JsonResult(result);
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
    }
}
