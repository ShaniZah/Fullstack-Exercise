namespace Backend.Services
{
	public interface ILoginAttemptService
	{
		public bool IsLockedOut(string username);
		public void AddFailedAttempt(string username);
		public void ResetAttempts(string username);
	}
}
