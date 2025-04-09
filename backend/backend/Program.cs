using Backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddHttpClient();
builder.Services.AddScoped<IDatabaseService, DatabaseService>();
builder.Services.AddScoped<IFileProcessingService, FileProcessingService>();
builder.Services.AddSingleton<ITokenBlacklistService, TokenBlacklistService>();
builder.Services.AddSingleton<ILoginAttemptService, LoginAttemptService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowAngular", policy =>
	{
		policy.WithOrigins("http://localhost:4200") // Angular's default port
			.AllowAnyHeader()
			.AllowAnyMethod()
			.AllowCredentials(); // for cookies
	});
});

var jwtSettings = builder.Configuration.GetSection("Jwt");
var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]);

builder.Services.AddAuthentication(options =>
{
	options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
  .AddJwtBearer(options =>
{
	//get JWT from cookie instead of Authorization header
	options.Events = new JwtBearerEvents
	{
		OnMessageReceived = context =>
		{
			if (context.Request.Cookies.ContainsKey("jwt"))
			{
				context.Token = context.Request.Cookies["jwt"];
			}
			return Task.CompletedTask;
		},

		OnTokenValidated = context =>
		{
			var sessionId = context.Principal?.FindFirst("sessionId")?.Value;

			var blacklist = context.HttpContext.RequestServices.GetRequiredService<ITokenBlacklistService>();
			if (sessionId != null && blacklist.IsBlacklisted(sessionId))
			{
				context.Fail("Token is blacklisted");
			}

			return Task.CompletedTask;
		}
	};

	options.TokenValidationParameters = new TokenValidationParameters
	{
		ValidateIssuer = true,
		ValidateAudience = true,
		ValidateLifetime = true,
		ValidateIssuerSigningKey = true,
		ValidIssuer = jwtSettings["Issuer"],
		ValidAudience = jwtSettings["Audience"],
		IssuerSigningKey = new SymmetricSecurityKey(key)
	};
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.MapFallbackToFile("index.html");


app.UseCors("AllowAngular");

app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();
