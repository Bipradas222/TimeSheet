using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using TMS_Application.Models;
using System.Data;
using System.Data.SqlTypes;

namespace TMS_Application.Controllers
{
    public class LoginController : Controller
    { 
        public readonly IConfiguration configuration;
        public LoginController(IConfiguration _configuration)
        {
            this.configuration = _configuration;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        [Route("api/TMS/login")]
        public JsonResult tmslogin(string Email, string Password)
        {
            string Sqlcon = this.configuration.GetConnectionString("TMSConn");
            List<clsUserInfo> list = new List<clsUserInfo>();
            SqlConnection sqlcon = new SqlConnection(Sqlcon);
            DataTable dataTable = new DataTable();
            sqlcon.Open();
            SqlCommand sqlcmd = new SqlCommand("PRC_DisplayUser", sqlcon);
            sqlcmd.CommandType = CommandType.StoredProcedure;
            dataTable.Load(sqlcmd.ExecuteReader());
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
                obj.Password = (string)row["Password"];
                list.Add(obj);
            }
            var result = list.Where(x => x.Email == Email && x.Password == Password).ToList().Count();
            if (result > 0)
            {
                var empres = list.Where(x => x.Email == Email && x.Password == Password).ToList();
                HttpContext.Session.SetString("email", empres[0].Email.ToString());
                HttpContext.Session.SetString("empno", empres[0].UserId.ToString());
                HttpContext.Session.SetString("UserRole", empres[0].UserRole.ToString());
                HttpContext.Session.SetString("empname", empres[0].FirstName.ToString() + " " + empres[0].LastName.ToString());
                return new JsonResult(empres);
            }
            else
            {
                return new JsonResult("Invaild Credential");
            }
            
        }

    }
}
