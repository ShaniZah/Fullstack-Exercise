using Backend.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddHttpClient();
builder.Services.AddScoped<IDatabaseService, DatabaseService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowAngular", policy =>
  {
    policy.WithOrigins("http://localhost:4200") // Angular's default port
          .AllowAnyHeader()
          .AllowAnyMethod();
  });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("AllowAngular");

app.MapControllers();

app.Run();
