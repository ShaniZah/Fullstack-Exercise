namespace Backend.Services
{
  public class TokenBlacklistService
  {
    private readonly string filePath = Path.Combine(Directory.GetCurrentDirectory(), "blacklisted_tokens.txt");
    private readonly HashSet<string> cache = new();
    public TokenBlacklistService()
    {
      if (File.Exists(filePath))
      {
        var lines = File.ReadAllLines(filePath);
        foreach (var line in lines)
          cache.Add(line.Trim()); // load all blacklisted session id's
      }
    }

    public void Blacklist(string sessionId)
    {
      if (!cache.Contains(sessionId))
      {
        cache.Add(sessionId);
        File.AppendAllLines(filePath, new[] { sessionId });
      }
    }

    public bool IsBlacklisted(string sessionId)
    {
      return cache.Contains(sessionId);
    }

  }
}
