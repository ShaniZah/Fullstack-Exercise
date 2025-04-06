using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HealthBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase
{
    private readonly IMemoryCache _cache;

    public LoginController(IMemoryCache cache)
    {
        _cache = cache;
    }

    [HttpPost]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        const string USER = "myUser";
        const string PASS = "myPass";

        var key = $"lock:{request.Username}";
        if (_cache.TryGetValue(key, out DateTime until) && until > DateTime.UtcNow)
            return BadRequest($"Locked until {until:T}");

        if (request.Username == USER && request.Password == PASS)
        {
            _cache.Remove($"fail:{request.Username}");
            return Ok(new { token = GenerateJwt(request.Username) });
        }

        var failKey = $"fail:{request.Username}";
        var attempts = _cache.GetOrCreate(failKey, e => 0);
        attempts++;
        _cache.Set(failKey, attempts, TimeSpan.FromMinutes(5));

        if (attempts >= 3)
        {
            _cache.Set(key, DateTime.UtcNow.AddMinutes(1));
            return BadRequest("Locked for 1 minute");
        }

        return BadRequest($"Wrong credentials ({attempts}/3)");
    }

    private string GenerateJwt(string username)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes("super_secret_key_123!");
        var token = new JwtSecurityToken(
            claims: new[] { new Claim("sub", username) },
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
        );
        return tokenHandler.WriteToken(token);
    }
}

public record LoginRequest(string Username, string Password);
