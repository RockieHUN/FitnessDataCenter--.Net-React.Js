using API.Database;
using API.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [EnableCors]
    [Route("api/Ticket")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly MyContext _context;

        public TicketController(MyContext context)
        {
            _context = context;
        }

        
        [HttpPost("RegisterTicket")]
        public async Task<ActionResult<Ticket>> RegisterTicket(Ticket ticket)
        {
            _context.ticket.Add(ticket);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TicketExists(ticket.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTicket", new { id = ticket.id }, ticket);
        }

        private bool TicketExists(int id)
        {
            return _context.ticket.Any(e => e.id == id);
        }

    }
}
