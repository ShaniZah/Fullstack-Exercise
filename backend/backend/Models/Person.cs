using static System.Net.Mime.MediaTypeNames;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Backend.Models
{
  public class Person
  {
    public string ID { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int Age { get; set; }
    public int Height { get; set; }
    public int Weight { get; set; }
    public string HeartRate { get; set; }

  }
}
