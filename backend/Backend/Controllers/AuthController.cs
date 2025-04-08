using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Backend.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class AuthController : ControllerBase
  {
    private readonly IConfiguration _config; //holds default username and password

    public AuthController(IConfiguration config)
    {
      _config = config;
    }

    [HttpPost("Login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
      var defaultUsername = _config["Login:username"];
      var defaultPassword = _config["Login:password"];

      if (request.Username != defaultUsername || request.Password != defaultPassword)
      {
        return Unauthorized("Invalid credentials");
      }

      var token = GenerateJwtToken(request.Username);
      return Ok(new { token });
    }

    private string GenerateJwtToken(string username)
    {
      var jwtSettings = _config.GetSection("Jwt");
      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));
      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

      var token = new JwtSecurityToken(
          issuer: jwtSettings["Issuer"],
          audience: jwtSettings["Audience"],
          expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["ExpiresInMinutes"])),
          signingCredentials: creds
      );

      return new JwtSecurityTokenHandler().WriteToken(token);
    }
  }
}
