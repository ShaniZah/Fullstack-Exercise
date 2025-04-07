using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace Backend.Controllers
{
  public class FileUploadController : Controller
  {


    private readonly IWebHostEnvironment _env;

    public FileUploadController(IWebHostEnvironment env)
    {
      _env = env; // do i need?
    }


    [HttpPost("Upload")]
    public async Task<IActionResult> FileUpload([FromForm] IFormFile file)
    {
      if (file == null || file.Length == 0)
      {
        return BadRequest("empty file");

      }
      if (!file.FileName.EndsWith(".csv")) // case sensitve?, StringComparison.OrdinalIgnoreCase
        return BadRequest("only CSV files allowed");

      try
      {
        var uploadsFolderDirectory = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
        if (!Directory.Exists(uploadsFolderDirectory))
        {
          Directory.CreateDirectory(uploadsFolderDirectory);
        }

        var filePath = Path.Combine(uploadsFolderDirectory, file.FileName);


        // Save the original CSV
        // this is a c#8.0 feature, disposes of the stream when exiting the scope 
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
          await file.CopyToAsync(stream);
        }

        // parse to json
        var jsonData = new List<Dictionary<string, string>>();
        var content = await System.IO.File.ReadAllTextAsync(filePath);

        // Break into lines
        var lines = content.Split(new[] { "\r\n", "\n", "\r" }, StringSplitOptions.RemoveEmptyEntries);

        string[]? headers = null;

        foreach (var rawLine in lines)
        {
          var line = rawLine.Trim();

          if (string.IsNullOrWhiteSpace(line)) continue;

          // Skip lines starting with '#' that are NOT headers
          if (line.StartsWith("#"))
          {
            // If line starts with '#' and contains tabs or multiple columns, we assume it's the header
            var candidate = line.Substring(1).Trim();
            if (headers == null && candidate.Contains("\t") || candidate.Contains(','))
            {
              headers = candidate.Split(new[] { '\t', ',' });
            }
            continue;
          }

          // If we haven’t set headers yet, this line must be the real header row
          if (headers == null)
          {
            headers = line.Split(new[] { '\t', ',' });
            continue;
          }

          // Process data row
          var values = line.Split(new[] { '\t', ',' });

          var dict = new Dictionary<string, string>();
          for (int i = 0; i < headers.Length && i < values.Length; i++)
          {
            dict[headers[i].Trim()] = values[i].Trim();
          }

          jsonData.Add(dict);
        }

        // Save JSON
        var jsonFilePath = Path.Combine(
            Path.GetDirectoryName(filePath),
            Path.GetFileNameWithoutExtension(filePath) + ".json"
        );

        await System.IO.File.WriteAllTextAsync(
            jsonFilePath,
            JsonSerializer.Serialize(jsonData, new JsonSerializerOptions { WriteIndented = true })
        );

        return Ok(new { message = "File processed and saved", path = jsonFilePath });

      }
      catch (Exception ex)
      {
        return StatusCode(500, $"Internal error: {ex.Message}");
      }
    }
  }
}
