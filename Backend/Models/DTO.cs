using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{


    public record AccountsDTORead(int Id, string username, string owner_name, string surname, string id_num);


    public record AccountsDTOInsertUpdate(
    [Required(ErrorMessage = "Userame is required")]
        string? username,

    [Required(ErrorMessage = "Owner name is required")]
        string? owner_name,

     [Required(ErrorMessage = "Surname is required")]
        string? surname,
     
     [Required(ErrorMessage = "Id number is required")]
        string? id_num);



    public record ExpensesDTORead(int Id, DateTime expense_date, decimal? expense_sum, decimal? expense_shared);

    public record ExpensesDTOInsertUpdate(
   [Required(ErrorMessage = "Date is required")]
        DateTime? expense_date,
        [Required(ErrorMessage = "Expense sum is required")]
        decimal? expense_sum,
        [Required(ErrorMessage = "Expense shared is required")]
        decimal? expense_shared);



    public record IncomeDTORead(int? id, bool? income_type, int? accountid);

    public record IncomeDtoInsertUpdate(
        [Required(ErrorMessage = "Income type is required")]
        bool? income_type,
        [Required(ErrorMessage = "Account ID is required")]
        int? accountid);

    public record GEDtoRead(int? id, int? accountidd, int? expenseid);


    public record GEDTOInsertUpdate(
        int? accountidd,
        int? expenseid
);

}