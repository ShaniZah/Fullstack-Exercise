using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Backend.Models;

namespace Backend.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class LoginController : ControllerBase
  {
    private readonly IConfiguration _config; //holds default username and password

    public LoginController(IConfiguration config)
    {
      _config = config;
    }

    [HttpPost("Login")]
    public IActionResult Post([FromBody] LoginRequest request)
    {
      var correctUsername = _config["Login:username"];
      var correctPassword = _config["Login:password"];

      if (request.Username == correctUsername && request.Password == correctPassword)
      {
        return Ok("Login successful");
      }

      return Unauthorized("Invalid credentials");
    }
  }
}
