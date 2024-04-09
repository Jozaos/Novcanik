
﻿using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class GroupExpense : Entitet
    {
        [ForeignKey("account")]
        public int? account { get; set; }


        [ForeignKey("expense")]
        public int? expense { get; set; }
    }
}
