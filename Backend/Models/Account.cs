using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public abstract class Account
    {
        [Key]
        public int Id { get; set; }
    }
}
