using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
  public class ReportController : ControllerBase
    {
        [HttpPost]
        public IActionResult SubmitReport()
        {
            Console.WriteLine("Received a health report request");

            return Ok(new { message = "Your request is being processed" });
        }
    }

}
