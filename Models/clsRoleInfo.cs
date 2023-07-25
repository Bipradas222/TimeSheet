namespace TMS_Application.Models
{
    public class clsRoleInfo
    {
        public long RoleId { get; set; } = 0;
        public string RoleName { get; set; } = "";
        public string Description { get; set; } = "";
        public string createdby { get; set; } = "";
    }
    public class clsUserInfo
    {
        public long UserId { get; set; } = 0;
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string Addresh { get; set; } = "";
        public string Phone_Number { get; set; } = "";
        public string Email { get; set; } = "";
        public string Birth_Date { get; set; } = "";
        public long UserRole { get; set; } = 0;
        public string createdby { get; set; } = "";
        public string Role_name { get; set; } = "";
        public string Password { get; set; } = "";
    }
}
