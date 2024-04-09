<<<<<<< Updated upstream
﻿using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class GroupExpense : Account
    {
        [ForeignKey("account")]
        public int? account { get; set; }


        [ForeignKey("expense")]
        public int? expense { get; set; }


        public List<Account>? accounts { get; set; }
=======
﻿namespace Backend.Models
{
    public class GroupExpense:Entitet
    {
        public int? account { get; set; }
        public int? expense { get; set; }
>>>>>>> Stashed changes
    }
}
