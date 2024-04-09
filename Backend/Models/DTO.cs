
using System.ComponentModel.DataAnnotations;
namespace Backend.Models
{
    public record ExpenseDTORead(int Id, DateTime Expense_date, decimal? Expense_sum,
        decimal? Expense_shared);

    public record ExpenseDTOInsertUpdate(
        [Required(ErrorMessage = "Expense sum is required")]
        DateTime Expense_date, decimal? Expense_sum, decimal? Expense_shared);


    //public record IncomeDTORead(int Sifra, string? Ime, string? Prezime,
    //  string? Email, string? Oib, string? Brojugovora);

    //public record IncomeDTOInsertUpdate(
    //    [Required(ErrorMessage = "Ime obavezno")]
    //    string? Ime,
    //    [Required(ErrorMessage = "Prezime obavezno")]
    //    string? Prezime,
    //    [Required(ErrorMessage = "Email obavezno")]
    //    [EmailAddress(ErrorMessage ="Email nije dobrog formata")]
    //    string? Email,
    //    string? Oib,
    //    string? Brojugovora);


    //public record GroupExpenseDTORead(int Sifra, string? Naziv,
    //    string? SmjerNaziv, string? PredavacImePrezime, int Brojpolaznika, DateTime? Datumpocetka, int? Maksimalnopolaznika);
    //// ako se parametar zove kao svojstvo nekog tipa u toj klasi tada uzima punu putanju klase (npr. EdunovaAPP.Models.Predavac)

    //public record GroupExpenseDTOInsertUpdate(
    //    [Required(ErrorMessage = "Naziv obavezno")]
    //    [StringLength(5, ErrorMessage = "Naziv grupe ne može imati više od 5 znakova ")]
    //    string? Naziv,
    //    [Required(ErrorMessage = "Smjer obavezno")]
    //    int? SmjerSifra,
    //    int? PredavacSifra,
    //    DateTime? Datumpocetka,
    //    [Required(ErrorMessage = "Maksimalno polaznika obavezno")]
    //    [Range(0, 30, ErrorMessage = "{0} mora biti između {1} i {2}")]
    //    int? Maksimalnopolaznika= 0);
}