using Microsoft.AspNetCore.Mvc;

namespace TMS_Application.Controllers
{
    public class ProjectController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
