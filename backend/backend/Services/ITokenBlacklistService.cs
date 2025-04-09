namespace Backend.Services
{
	public interface ITokenBlacklistService
	{
		public void Blacklist(string sessionId);
		public bool IsBlacklisted(string sessionId);
	}
}
