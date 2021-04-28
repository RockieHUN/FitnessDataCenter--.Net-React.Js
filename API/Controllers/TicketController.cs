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


        [HttpGet("RegisterTicket/{clientId}/{ticketTypeId}")]
        public async Task<ActionResult<Ticket>> RegisterTicket(int clientId, int ticketTypeId)
        {

            if (!ClientExists(clientId) || !TicketTypeExists(ticketTypeId)) return BadRequest();

            var ticketType = _context.ticketType.FirstOrDefault(ticketType => ticketType.id == ticketTypeId);

            var ticket = new Ticket
            {
                ClientId = clientId,
                RoomId = ticketType.RoomId,
                RoomName = ticketType.RoomName,
                Price = ticketType.Price,
                ValidDays = ticketType.ValidDays,
                MaxUsages = ticketType.MaxUsages,
                UsesPerDay = ticketType.UsesPerDay,
                UsedCounter = 0,
                ValidUntil = (DateTime.Now).AddDays(ticketType.ValidDays)
            };

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

            return NoContent();
        }


        [HttpGet("ListTickets")]
        public async Task<ActionResult<IEnumerable<Ticket>>> ListTickets()
        {
            return await _context.ticket.ToListAsync();
        }

        [HttpGet("ListClientTickets/{clientId}")]
        public async Task<ActionResult<IEnumerable<TicketView>>> ListClientTickets(int clientId)
        {
            return toViews(await _context.ticket.Where(ticket => ticket.ClientId == clientId).ToListAsync());
        }

        [HttpGet("ListTicketTypes")]
        public async Task<ActionResult<IEnumerable<TicketType>>> ListTicketTypes(){
            return await _context.ticketType.ToListAsync();
        }

        [HttpPost("CreateTicketType")]
        public async Task<ActionResult<TicketType>> CreateTicketType( TicketType ticketType)
        {
            _context.ticketType.Add(ticketType);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TicketTypeExists(ticketType.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        [HttpGet("UseTicket/{ticketId}")]
        public async Task<ActionResult<TicketView>> UseTicket(int ticketId)
        {
            if (!TicketExists(ticketId)) return NotFound();

            var ticket = _context.ticket.FirstOrDefault(ticket => ticket.id == ticketId);

            if (ticket.ValidUntil < DateTime.Now) return BadRequest();
            if (!(ticket.MaxUsages >= ticket.UsedCounter + 1)) return BadRequest();

            ticket.UsedCounter += 1;
            _context.Entry(ticket).State = EntityState.Modified;

            await _context.SaveChangesAsync();
            return NoContent();
           
        }

        // PRIVATE FUNCTIONS

        private bool ClientExists(int id)
        {
            return _context.client.Any(e => e.id == id);
        }

        private bool TicketExists(int id)
        {
            return _context.ticket.Any(e => e.id == id);
        }

        private bool TicketTypeExists(int id)
        {
            return _context.ticketType.Any(e => e.id == id);
        }

        private TicketView toView(Ticket ticket)
        {
            return new TicketView
            {
                id = ticket.id,
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
