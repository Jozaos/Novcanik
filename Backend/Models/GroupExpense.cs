
﻿using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class GroupExpense : Entitet
    {
        [ForeignKey("accountidd")]
        public Account account { get; set; }


        [ForeignKey("expenseid")]
        public Expense expense { get; set; }
    }
}
