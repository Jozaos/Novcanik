using System.ComponentModel.DataAnnotations;
using System;
using System.Collections;
using System.Collections.Generic;

namespace Backend.Models
{
    public class Account : Entitet
    {
        public string? username { get; set; }
        public string? owner_name { get; set; }
        public string? surname { get; set; }
        public int? id_num { get; set; }
        public decimal? balance { get; set; }
    }

}
   
   

        

