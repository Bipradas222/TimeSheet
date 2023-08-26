using System.Text;

namespace TMS_Application.Models
{
    public class clsProjectInfo
    {
        public long Project_ID { get; set; } = 0;
        public string Project_Name { get; set; } = "";
        public string Owner { get; set; } = "";
        public string Status { get; set; } = "";
        public string Start_Date { get; set; } = "";
        public string End_Date { get; set; } = "";
        public string Timestamp { get; set; } = "";
        public string Last_Modified { get; set; } = "";
        public string Created_By { get; set; } = "";
        public string Modified_By { get; set; } = "";
    }

    public class clsStatusInfo
    {
        public long Status_ID { get; set; } = 0;
        public string Status_Name { get; set; } = "";
        public string Status_Type { get; set; } = "";
        public string Created_By { get; set; } = "";
        public string Created_Date { get; set; } = "";
    }
}
