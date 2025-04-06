using Backend.Models;

namespace Backend.Services
{
  public interface IDatabaseService
  {
    public Task<List<Person>> GetItemsAsync();
  }
}
