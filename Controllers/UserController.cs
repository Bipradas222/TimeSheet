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
    }
}
