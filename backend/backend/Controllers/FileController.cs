using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace Backend.Controllers
{

  [ApiController]
  [Route("[controller]")]
  [Authorize]
  public class FileController : Controller
  {
    private readonly IFileProcessingService _fileProcessingService;

    public FileController(IFileProcessingService fileProcessingService)
    {
      _fileProcessingService = fileProcessingService;
    }

    [HttpPost("Upload")]
    public async Task<IActionResult> Upload([FromForm] IFormFile file)
    {
      if (file == null || file.Length == 0)
        return BadRequest("Empty file");

      if (!file.FileName.EndsWith(".csv", StringComparison.OrdinalIgnoreCase))
        return BadRequest("Only CSV files allowed");

      try
      {
        var path = await _fileProcessingService.ProcessCsvToJsonAsync(file);
        return Ok(new { message = "File processed and saved", path });
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"Internal error: {ex.Message}");
      }
    }

  }
}

