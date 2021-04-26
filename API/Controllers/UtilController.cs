using API.Database;
using API.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [EnableCors]
    [Route("api/Util")]
    [ApiController]
    public class UtilController : ControllerBase
    {
        private readonly MyContext _context; 
        public UtilController(MyContext context)
        {
            _context = context;
        }

        [HttpGet("CreateDummy")]
        public async Task<IActionResult> CreateDummy()
        {
            _context.client.Add(new Client
            {
                Name = "Joco",
                Address = "Tg. Mures",
                Telephone = "072222222222",
                Email = "asd@asd.com",
                RegistrationDate = DateTime.Now,
                CNP = "2211334121234",
                IsDeleted = false
            }
           );
            _context.client.Add(new Client
            {
                Name = "Csilla",
                Address = "Cluj Napoca",
                Telephone = "072222222222",
                Email = "asd2@asd.com",
                RegistrationDate = DateTime.Now,
                CNP = "22661334121234",
                IsDeleted = false
            }
            );

            _context.room.Add(new Room
            {
                Name = "A12"
            });

            _context.room.Add(new Room
            {
                Name = "B22"
            });




            _ = _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
