using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{

    public class Income : Entitet
    {
        public bool income_type { get; set; }

        [ForeignKey("accountid")]
        public Account account { get; set; }
    }

}
