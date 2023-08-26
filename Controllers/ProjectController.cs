using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using TMS_Application.Models;
using System.Data;

namespace TMS_Application.Controllers
{
    public class ProjectController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        private readonly IConfiguration configuration;
        public ProjectController(IConfiguration _configuration)
        {
            this.configuration = _configuration;
        }

        [HttpGet]
        [Route("api/TMS/ddlStatus")]
        public JsonResult tmsddlstatus()
        {
            var con = this.configuration.GetConnectionString("TMSConn");
            //var result = "";
            List<clsStatusInfo> ddlstatus =  new List<clsStatusInfo>();
            using (SqlConnection conn = new SqlConnection(con))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("PRC_StatusDisplay", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                DataTable DT = new DataTable();
                DT.Load(cmd.ExecuteReader());
                foreach(DataRow dr in DT.Rows) 
                {
                    clsStatusInfo obj = new clsStatusInfo();
                    obj.Status_ID = (int)dr["Status_ID"];
                    obj.Status_Name = (string)dr["Status_Name"];
                    obj.Status_Type = (string)dr["Status_Type"];
                    ddlstatus.Add(obj);
                }
            }
            return new JsonResult(ddlstatus);
        }
        [HttpPost]
        [Route("api/TMS/Project")]
        public JsonResult tmsproject (clsProjectInfo project)
        {
            var con = this.configuration.GetConnectionString("TMSConn");
            var result = "";
            using (SqlConnection conn = new SqlConnection(con))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("PRC_ProjectAddEdit", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Project_ID", project.Project_ID);
                cmd.Parameters.AddWithValue("@Project_Name", project.Project_Name);
                cmd.Parameters.AddWithValue("@Owner", project.Owner);
                cmd.Parameters.AddWithValue("@Status", project.Status);
                cmd.Parameters.AddWithValue("@Start_Date", project.Start_Date);
                cmd.Parameters.AddWithValue("@End_Date", project.End_Date);
                cmd.Parameters.AddWithValue("@Created_By", project.Created_By);
                //cmd.Parameters.AddWithValue("@Modified_By", project.Modified_By);
                result = (string)cmd.ExecuteScalar();
                conn.Close();
            }
            return new JsonResult(result);
        }
        [HttpGet]
        [Route("api/TMS/ProjectDisplay")]
        public JsonResult tmsprojectdisplay()
        {
            var con = this.configuration.GetConnectionString("TMSConn");
            List<clsProjectInfo> projectdisplay = new List<clsProjectInfo>();
            using (SqlConnection conn = new SqlConnection(con))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("PRC_ProjectDisplay", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                DataTable dt = new DataTable();
                dt.Load(cmd.ExecuteReader());
                foreach (DataRow dr in dt.Rows)
                {
                    clsProjectInfo obj = new clsProjectInfo();
                    obj.Project_ID = (int)dr["Project_ID"];
                    obj.Project_Name = (string)dr["Project_Name"];
                    obj.Owner = (string)dr["Owner"];
                    obj.Status = (string)dr["Status"];
                    obj.Start_Date = (string)dr["Start_Date"];
                    obj.End_Date = (string)dr["End_Date"];
                    projectdisplay.Add(obj);
                }
            }
            return new JsonResult(projectdisplay);
        }
        [HttpGet]
        [Route("api/TMS/ProjectEdit")]
        public JsonResult tmsprojectedit(int projectid) 
        {
            var con = this.configuration.GetConnectionString("TMSConn");
            List<clsProjectInfo> projectedit = new List<clsProjectInfo>();
            using (SqlConnection conn = new SqlConnection(con))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("PRC_ProjectDisplay",conn);
                cmd.CommandType = CommandType.StoredProcedure;
                DataTable dt = new DataTable();
                dt.Load(cmd.ExecuteReader());
                foreach (DataRow dr in dt.Rows) 
                {
                    clsProjectInfo obj = new clsProjectInfo();
                    obj.Project_ID = (int)dr["Project_ID"];
                    obj.Project_Name = (string)dr["Project_Name"];
                    obj.Owner = (string)dr["Owner"];
                    obj.Status = (string)dr["Status"];
                    obj.Start_Date = (string)dr["Start_Date"];
                    obj.End_Date = (string)dr["End_Date"];
                    projectedit.Add(obj);
                }
            }
            var result = projectedit.Where(x => x.Project_ID == projectid);
            return new JsonResult(result);
        }
        [HttpPost]
        [Route("api/TMS/ProjectDelete")]
        public JsonResult tmsprojectdelete(int projectid)
        {
            var con = this.configuration.GetConnectionString("TMSConn");
            var result = "";
            using (SqlConnection conn = new SqlConnection(con))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("PRC_ProjectDelete", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Project_ID", projectid);
                result = (string)cmd.ExecuteScalar();
                conn.Close();
            }
            return new JsonResult(result);
        }
    }
}
