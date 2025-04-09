namespace Backend.Services
{
	public class LoginAttemptService : ILoginAttemptService
	{
		private readonly Dictionary<string, (int attempts, DateTime? lockoutUntil)> loginAttempts = new();

		public bool IsLockedOut(string username)
		{
			if (loginAttempts.TryGetValue(username, out var entry))
			{
				if (entry.lockoutUntil.HasValue && entry.lockoutUntil > DateTime.UtcNow)
				{
					return true;
				}
			}
			return false;
		}

		public void AddFailedAttempt(string username)
		{
			if (!loginAttempts.ContainsKey(username))
			{
				loginAttempts[username] = (1, null);
			}
			else
			{
				var (attempts, _) = loginAttempts[username];
				attempts += 1;
				if (attempts >= 3)
				{
					loginAttempts[username] = (0, DateTime.UtcNow.AddMinutes(1)); // reset attempts, set the lockout time
				}
				else
				{
					loginAttempts[username] = (attempts, null);
				}
			}
		}

		public void ResetAttempts(string username)
		{
			loginAttempts.Remove(username);
		}
	}
}
