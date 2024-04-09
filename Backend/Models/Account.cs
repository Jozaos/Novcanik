<<<<<<< Updated upstream
﻿using System.ComponentModel.DataAnnotations;
using System;
using System.Collections;
using System.Collections.Generic;

namespace Backend.Models
=======
﻿namespace Backend.Models
>>>>>>> Stashed changes
{
    public class Account:Entitet
    {
<<<<<<< Updated upstream
        [Key]
        public int Id { get; set; }
        public string? Username { get; set; }
        public ICollection<GroupExpense> GroupExpenses { get; } = [];

=======
        public string? username { get; set; }
        public string? owner_name { get; set; }
        public string? surname { get; set; }
        public int? id_num { get; set; }
        public decimal? balance { get; set; }
>>>>>>> Stashed changes

    }
}
