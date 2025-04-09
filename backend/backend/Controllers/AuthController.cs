using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Backend.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Newtonsoft.Json.Linq;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;

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

        // authenticate user and return a jwt in a cookie 
        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginRequest request, [FromServices] LoginAttemptService loginService)
        {
            var username = request.Username;
            if (loginService.IsLockedOut(username)){
                return StatusCode(423, "Too many failed attempts. Try again in 1 minute.");
            }
            
            var defaultUsername = _config["Login:username"];
            var defaultPassword = _config["Login:password"];

            if (request.Username != defaultUsername || request.Password != defaultPassword)
            {
                loginService.AddFailedAttempt(username);

                //check if this user is locked out
                if (loginService.IsLockedOut(username))
                {
                    return StatusCode(423, "Too many failed attempts. Try again in 1 minute.");
                }

                return Unauthorized("Invalid credentials");
            }
            loginService.ResetAttempts(username);

            // jwt eith user info and sessionID
            var token = GenerateJwtToken(request.Username);

            // pass jwt with cookie to prevent scripting attacks 
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true, // prevent scripting attacks (xss)
                Secure = true,   // cookie is sent only over https
                SameSite = SameSiteMode.None, // for cross site usage (frontend is localhost:4200, backend is localhost:7200)
                Expires = DateTime.UtcNow.AddHours(1)
            };

            Response.Cookies.Append("jwt", token, cookieOptions);

            return Ok(new { message = "Logged in successfully" });

        }

        // delete the cookie and blacklist the tokens sessionID
        [HttpPost("Logout")]
        public IActionResult Logout([FromServices] TokenBlacklistService blacklist)
        {

            //get the sessionId from the current token's claims
            var sessionId = User.FindFirst("sessionId")?.Value;
            if (sessionId != null)
            {
                blacklist.Blacklist(sessionId);
            }

            Response.Cookies.Delete("jwt");
            return Ok(new { message = "Logged out" });
        }

        //generate a jwt with the users name and a unique sessionID
        private string GenerateJwtToken(string username)
        {
            var jwtSettings = _config.GetSection("Jwt");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var sessionId = Guid.NewGuid().ToString(); //unique identifier

            // claims embeded in the token 
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, username),
                new Claim("sessionId", sessionId)
            };
            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["ExpiresInMinutes"])),
                signingCredentials: creds
            );

            // return encoded jwt string 
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // used by angular guard to get a non blacklisted token, to verify its still valid 
        [Authorize]
        [HttpGet("ValidateToken")]
        public IActionResult ValidateToken()
        {
            return Ok(new { valid = true });
        }
    }
}
