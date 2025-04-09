namespace Backend.Services
{
  public interface IFileProcessingService
  {
    Task<string> ProcessCsvToJsonAsync(IFormFile file);
  }
}
