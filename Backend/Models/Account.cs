using System.ComponentModel.DataAnnotations;
using System;
using System.Collections;
using System.Collections.Generic;

namespace Backend.Models
{
    public abstract class Account
    {
        [Key]
        public int Id { get; set; }
        public string? Username { get; set; }
        public ICollection<GroupExpense> GroupExpenses { get; } = [];


    }
}
