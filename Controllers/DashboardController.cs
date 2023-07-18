using Microsoft.AspNetCore.Mvc;

namespace TMS_Application.Controllers
{
    public class DashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
