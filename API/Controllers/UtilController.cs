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
            //CLIENTS
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

            //ROOMS
            _context.room.Add(new Room
            {
                Name = "A12"
            });

            _context.room.Add(new Room
            {
                Name = "B22"
            });

            //TICKETS
            _context.ticket.Add( new Ticket
            {
                ClientId = 2,
                RoomId = 1,
                RoomName = "A12",
                Price = 50,
                ValidDays = 3,
                MaxUsages = 10,
                UsesPerDay = 5,
                UsedCounter = 0,
                ValidUntil = DateTime.Now,
                PurchaseDate = DateTime.Now
            });

            _context.ticket.Add(new Ticket
            {
                ClientId = 2,
                RoomId = 2,
                RoomName = "B22",
                Price = 50,
                ValidDays = 6,
                MaxUsages = 15,
                UsesPerDay = 5,
                UsedCounter = 0,
                ValidUntil = DateTime.Now,
                PurchaseDate = DateTime.Now
            });

            _context.ticketType.Add(new TicketType
            {
                id = 1,
                TicketName = "Average",
                RoomId = 1,
                RoomName = "A12",
                Price = 50,
                ValidDays = 10,
                MaxUsages = 20,
                UsesPerDay = 2
            });

            _ = _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
