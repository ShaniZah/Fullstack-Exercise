using System.Globalization;
using System.Text.Json;
using CsvHelper;
using CsvHelper.Configuration;

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
            // get folder path and create one if it doesnt exist
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var filePath = Path.Combine(uploadsFolder, file.FileName);

            // save uploaded file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // settings for the input csv file 
            var config = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                HasHeaderRecord = true,
                IgnoreBlankLines = true,
                TrimOptions = TrimOptions.Trim,
                AllowComments = true, 
                Comment = '#',
            };

            var records = new List<dynamic>();

            using (var reader = new StreamReader(filePath))
            using (var csv = new CsvReader(reader, config))
            {
                await foreach (var record in csv.GetRecordsAsync<dynamic>())
                {
                    records.Add(record);
                }
            }

            var jsonPath = Path.ChangeExtension(filePath, ".json");

            var jsonOptions = new JsonSerializerOptions
            {
                WriteIndented = true,
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            await File.WriteAllTextAsync(jsonPath, JsonSerializer.Serialize(records, jsonOptions));

            return jsonPath;
        }
    }
}
