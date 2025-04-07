using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Backend.Controllers
{
  public class FileUploadController : Controller
  {


    private readonly IWebHostEnvironment _env;

    public FileUploadController(IWebHostEnvironment env)
    {
      _env = env;
    }


    [HttpPost("UploadFile")]
    public async Task<IActionResult> FileUpload([FromForm] IFormFile file)
    {
      if(file == null || file.Length == 0){
         return BadRequest("No file provided.");

      }
      if (!file.FileName.EndsWith(".csv", StringComparison.OrdinalIgnoreCase))
        return BadRequest("Only CSV files are allowed.");

      try
      {
        var uploadsFolderDirectory = Path.Combine(_env.ContentRootPath, "uploads");
        Directory.CreateDirectory(uploadsFolderDirectory);
        var csvPath = Path.Combine(uploadsFolderDirectory, file.FileName);
        var fileStream = new FileStream(csvPath, FileMode.Create);
        await file.CopyToAsync(fileStream);

        // Read CSV lines
        var lines = await System.IO.File.ReadAllLinesAsync(csvPath);
    /*    if (lines.Length < 2)
          return BadRequest("CSV file must contain header and at least one data row.");*/

        var headers = lines[0].Split(',');
        var result = new List<Dictionary<string, string>>();

        foreach (var line in lines.Skip(1))
        {
          var values = line.Split(',');
          var row = new Dictionary<string, string>();

          for (int i = 0; i < headers.Length && i < values.Length; i++)
          {
            row[headers[i]] = values[i];
          }

          result.Add(row);
        }
        var jsonPath = Path.Combine(uploadsFolderDirectory, Path.GetFileNameWithoutExtension(file.FileName) + ".json");
        var jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
        await System.IO.File.WriteAllTextAsync(jsonPath, jsonString);

        return Ok(result);

      }
      catch (Exception ex)
      {
        return StatusCode(500, $"Internal error: {ex.Message}");
      }
    }
  }
}
