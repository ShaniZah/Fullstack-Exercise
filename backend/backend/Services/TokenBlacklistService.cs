namespace Backend.Services
{
  public class TokenBlacklistService
  {
    private readonly string _filePath = Path.Combine(Directory.GetCurrentDirectory(), "blacklisted_tokens.txt");
    private readonly HashSet<string> _cache = new();
    public TokenBlacklistService()
    {
      if (File.Exists(_filePath))
      {
        var lines = File.ReadAllLines(_filePath);
        foreach (var line in lines)
          _cache.Add(line.Trim()); // load all blacklisted session id's
      }
    }

    public void Blacklist(string sessionId)
    {
      if (!_cache.Contains(sessionId))
      {
        _cache.Add(sessionId);
        File.AppendAllLines(_filePath, new[] { sessionId });
      }
    }

    public bool IsBlacklisted(string sessionId)
    {
      return _cache.Contains(sessionId);
    }

  }
}
