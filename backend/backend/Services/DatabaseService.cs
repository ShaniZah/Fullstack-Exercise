using Backend.Models;
using Newtonsoft.Json;

namespace Backend.Services
{
  public class DatabaseService : IDatabaseService
  {
    private readonly HttpClient _http;
    private readonly IConfiguration _config;

    public DatabaseService(HttpClient http, IConfiguration config)
    {
      _http = http;
      _config = config;
      _http.DefaultRequestHeaders.Add("x-apikey", _config["Database:apiKey"]);
    }

    public async Task<List<Person>> GetItemsAsync()
    {
      var response = await _http.GetAsync($"{_config["Database:apiUrl"]}");
      response.EnsureSuccessStatusCode();

      var content = await response.Content.ReadAsStringAsync();
      return JsonConvert.DeserializeObject<List<Person>>(content);
    }
  }

}
