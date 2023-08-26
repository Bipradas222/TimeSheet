using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using TMS_Application.Models;
using System.Data;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace TMS_Application.Controllers
{
    public class StatusController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        private readonly IConfiguration configuration;
        public StatusController(IConfiguration _configuration)
        {
            this.configuration = _configuration;
        }

        [HttpPost]
        [Route("api/TMS/Status")]
        public JsonResult tmsstatus(clsStatusInfo Status)
        {
            var con = this.configuration.GetConnectionString("TMSConn");
            var result = "";
            using (SqlConnection conn = new SqlConnection(con))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("PRC_StatusAddEdit", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Status_ID", Status.Status_ID);
                cmd.Parameters.AddWithValue("@Status_Name", Status.Status_Name);
                cmd.Parameters.AddWithValue("@Status_Type", Status.Status_Type);
                cmd.Parameters.AddWithValue("@Created_By", Status.Created_By);
                result = (string)cmd.ExecuteScalar();
                conn.Close();
            }
            return new JsonResult(result);
        }

        [HttpGet]
        [Route("api/TMS/StatusDisplay")]
        public JsonResult tmsstatusdisplay()
        {
            var con = this.configuration.GetConnectionString("TMSConn");
            List<clsStatusInfo> StatusDisplay = new List<clsStatusInfo>();
            using (SqlConnection conn = new SqlConnection(con))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("PRC_StatusDisplay", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                DataTable DT = new DataTable();
                DT.Load(cmd.ExecuteReader());
                foreach (DataRow dr in DT.Rows)
                {
                    clsStatusInfo obj = new clsStatusInfo();
                    obj.Status_ID = (int)dr["Status_ID"];
                    obj.Status_Name = (string)dr["Status_Name"];
                    obj.Status_Type = (string)dr["Status_Type"];
                    obj.Created_By = (string)dr["Created_By"];
                    //obj.Created_Date = (string)dr["Created_Date"];
                    StatusDisplay.Add(obj);
                    //conn.Close();
                }
                return new JsonResult(StatusDisplay);
            }
        }
        [HttpGet]
        [Route("api/TMS/StatusEdit")]
        public JsonResult tmsstatusedit(int statusid)
        {
            var con = this.configuration.GetConnectionString("TMSConn");
            List<clsStatusInfo> statusedit = new List<clsStatusInfo>();
            using (SqlConnection conn = new SqlConnection(con))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("PRC_StatusDisplay", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                DataTable DT = new DataTable();
                DT.Load(cmd.ExecuteReader());
                foreach (DataRow dr in DT.Rows)
                {
                    clsStatusInfo obj = new clsStatusInfo();
                    obj.Status_ID = (int)dr["Status_ID"];
                    obj.Status_Name = (string)dr["Status_Name"];
                    obj.Status_Type = (string)dr["Status_Type"];
                    obj.Created_By = (string)dr["Created_By"];
                    statusedit.Add(obj);
                }
            }
            var result = statusedit.Where(x => x.Status_ID == statusid);
            return new JsonResult(result);
        }
        [HttpPost]
        [Route("api/TMS/StatusDelete")]
        public JsonResult tmsstatusdelete(int statusid)
        {
            var con = this.configuration.GetConnectionString("TMSConn");
            var result = "";
            using (SqlConnection conn = new SqlConnection(con)) 
            { 
                conn.Open();
                SqlCommand cmd = new SqlCommand("PRC_StatusDelete", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Status_ID", statusid);
                result = (string)cmd.ExecuteScalar();
                conn.Close();
            }
            return new JsonResult(result);
        }
    }
}
