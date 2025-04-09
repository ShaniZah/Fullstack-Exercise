using System.Text.Json;

namespace Backend.Services
{
  public class FileProcessingService : IFileProcessingService
  {
    private readonly IWebHostEnvironment _env;

    public FileProcessingService(IWebHostEnvironment env)
    {
      _env = env;
    }

    public async Task<string> ProcessCsvToJsonAsync(IFormFile file)
    {
      var uploadsFolderDirectory = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
      if (!Directory.Exists(uploadsFolderDirectory))
        Directory.CreateDirectory(uploadsFolderDirectory);

      var filePath = Path.Combine(uploadsFolderDirectory, file.FileName);

      // Save the original CSV
      using (var stream = new FileStream(filePath, FileMode.Create))
      {
        await file.CopyToAsync(stream);
      }

      // parse csv file content 
      var jsonData = new List<Dictionary<string, string>>();
      var content = await System.IO.File.ReadAllTextAsync(filePath);
      var lines = content.Split(new[] { "\r\n", "\n", "\r" }, StringSplitOptions.RemoveEmptyEntries);
      string[]? headers = null;

      foreach (var rawLine in lines)
      {
        var line = rawLine.Trim();
        if (string.IsNullOrWhiteSpace(line)) continue;

        if (line.StartsWith("#"))
        {
          var candidate = line.Substring(1).Trim();
          if (headers == null && (candidate.Contains("\t") || candidate.Contains(',')))
          {
            headers = candidate.Split(new[] { '\t', ',' });
          }
          continue;
        }

        if (headers == null)
        {
          headers = line.Split(new[] { '\t', ',' });
          continue;
        }

        var values = line.Split(new[] { '\t', ',' });
        var dict = new Dictionary<string, string>();
        for (int i = 0; i < headers.Length && i < values.Length; i++)
        {
          dict[headers[i].Trim()] = values[i].Trim();
        }

        jsonData.Add(dict);
      }

      // Save JSON
      var jsonFilePath = Path.Combine(uploadsFolderDirectory, Path.GetFileNameWithoutExtension(file.FileName) + ".json");
      await System.IO.File.WriteAllTextAsync(jsonFilePath, JsonSerializer.Serialize(jsonData, new JsonSerializerOptions { WriteIndented = true }));

      return jsonFilePath;
    }
  }

}
