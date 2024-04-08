namespace Backend.Models
{
    public class Income:Account
    {
        public bool income_type{ get; set; }
        public int? account{ get; set; }
    }
}
