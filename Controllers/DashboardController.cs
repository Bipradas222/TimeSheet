using Microsoft.AspNetCore.Mvc;

namespace TMS_Application.Controllers
{
    public class DashboardController : Controller
    {
        public IActionResult Index()
        {
            if (!string.IsNullOrEmpty(HttpContext.Session.GetString("email"))
                || !string.IsNullOrEmpty(HttpContext.Session.GetString("empno"))
                || !string.IsNullOrEmpty(HttpContext.Session.GetString("UserRole"))
                || !string.IsNullOrEmpty(HttpContext.Session.GetString("empname")))
            {
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }
        }
    }
}
