using Microsoft.AspNetCore.Mvc;
using TMS_Application.Models;
using System.Data;
using System.Data.SqlClient;

namespace TMS_Application.Controllers
{
    public class UserRoleController : Controller
    {
        private readonly IConfiguration configuration;
        public UserRoleController(IConfiguration _configuration)
        {
            configuration = _configuration;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        [Route("api/TMS/AddUserRole")]
        public JsonResult tmsrole(clsRoleInfo role)
        {
            var con = this.configuration.GetConnectionString("TMSConn");
            var result = "";
            using (SqlConnection sqlCon = new SqlConnection(con))
            {
                sqlCon.Open();
                SqlCommand sqlcmd = new SqlCommand("PRC_AddEditUserRole",sqlCon );
                sqlcmd.CommandType = CommandType.StoredProcedure;
                sqlcmd.Parameters.AddWithValue("@RoleName", role.RoleName);
                sqlcmd.Parameters.AddWithValue("@Description", role.Description);
                sqlcmd.Parameters.AddWithValue("@CreatedBy", role.createdby);
                sqlcmd.Parameters.AddWithValue("@RoleID", role.RoleId);
                result = (string)sqlcmd.ExecuteScalar();
                sqlCon.Close();
            }
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/TMS/DisplayUserRole")]
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
        [Route("api/TMS/EditUserRole")]
        public JsonResult tmsroleEdit(int roleid)
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
            var result = list.Where(x => x.RoleId == roleid);
            return new JsonResult(result);
        }
        [HttpPost]
        [Route("api/TMS/DelUserRole")]
        public JsonResult tmsroleDel(clsRoleInfo role)
        {
            var con = this.configuration.GetConnectionString("TMSConn");
            var result = "";
            using (SqlConnection sqlCon = new SqlConnection(con))
            {
                sqlCon.Open();
                SqlCommand sqlcmd = new SqlCommand("PRC_deleteRole", sqlCon);
                sqlcmd.CommandType = CommandType.StoredProcedure;
                sqlcmd.Parameters.AddWithValue("@RoleID", role.RoleId);
                result = (string)sqlcmd.ExecuteScalar();
                sqlCon.Close();
            }
            return new JsonResult(result);
        }
    }
}
