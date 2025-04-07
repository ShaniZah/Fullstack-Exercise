using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Controllers
{
  [Route("[controller]")]
  [ApiController]
  [Authorize]
  public class DataController : ControllerBase
  {
    private readonly IDatabaseService _db;
    public DataController(IDatabaseService db)
    {
      _db = db;
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<List<Person>>> GetAllPersons()
    {
      var tasks = await _db.GetItemsAsync();
      return Ok(tasks);
    }
  }
}
