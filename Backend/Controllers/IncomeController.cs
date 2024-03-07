using Backend.Data;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class IncomeController
    {
        private readonly EdunovaContext _context;

        public IncomeController(EdunovaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_context.Income_type.ToList());
        }


    }
}
