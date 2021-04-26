using API.Database;
using API.Models;
using API.Views;
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

        [HttpGet("ListTickets")]
        public async Task<ActionResult<IEnumerable<Ticket>>> ListTickets()
        {
            return await _context.ticket.ToListAsync();
        }

        private bool TicketExists(int id)
        {
            return _context.ticket.Any(e => e.id == id);
        }

        [HttpGet("ListClientTickets/{clientId}")]
        public async Task<ActionResult<IEnumerable<TicketView>>> ListClientTickets(int clientId)
        {
            return toViews(await _context.ticket.Where(ticket => ticket.ClientId == clientId).ToListAsync());
        }


        private TicketView toView(Ticket ticket)
        {
            return new TicketView
            {
                ClientId = ticket.ClientId,
                RoomId = ticket.RoomId,
                RoomName = ticket.RoomName,
                Price = ticket.Price,
                ValidDays = ticket.ValidDays, 
                MaxUsages = ticket.MaxUsages,
                UsesPerDay = ticket.UsesPerDay,
                UsedCounter = ticket.UsedCounter,
                ValidUntil = ticket.ValidUntil.ToString("yyyy/MM/dd  HH:mm:ss"),
                PurchaseDate =ticket.PurchaseDate.ToString("yyyy/MM/dd  HH:mm:ss")
            };
        }

        private List<TicketView> toViews(List<Ticket> tickets)
        {
            var views = new List<TicketView>();
            tickets.ForEach(ticket =>
            {
                views.Add(toView(ticket));
            });

            return views;
        }
    }
}
