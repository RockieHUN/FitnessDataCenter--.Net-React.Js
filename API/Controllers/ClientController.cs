using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Database;
using API.Models;
using Microsoft.AspNetCore.Cors;
using API.Views;
using System.Diagnostics;

namespace API.Controllers
{
    [EnableCors]
    [Route("api/Client")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly MyContext _context;
       

        public ClientController(MyContext context)
        {
            _context = context;            
        }

              
        [HttpGet("ListClients")]
        public async Task<ActionResult<IEnumerable<ClientView>>> listClients()
        {
            return toClientViews( await _context.client.ToListAsync());
        }


        [HttpGet("GetClient/{id}")]
        public async Task<ActionResult<Client>> GetClient(int id)
        {
            var client = await _context.client.FindAsync(id);

            if (client == null)
            {
                return NotFound();
            }

            return client;
        }

        [HttpGet("SearchClient/{barcode}")]
        public async Task<ActionResult<ClientView>> SearchClient(int barcode)
        {
            var list = await _context.client.ToListAsync();
            var client = list.Find(element => element.BarCode == barcode);
            if (client == null)
            {
                return NotFound();
            }
            return toClientView(client);
        }

        [HttpPost("RegisterClient")]
        public async Task<ActionResult<Client>> RegisterClient(Client client)
        {
            _context.client.Add(client);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ClientExists(client.id)) return Conflict();
                else throw;
            }

            return NoContent();
        }

        [HttpPost("RegisterClientWithTicket")]
        public async Task<ActionResult<ClientAndTicket>> RegisterClientWithTicket(ClientAndTicket clientAndTicket)
        {
            var client = clientAndTicket.client;
            var ticket = clientAndTicket.ticket;

            _context.client.Add(client);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ClientExists(client.id)) return Conflict();
                else throw;
            }

            _context.ticket.Add(ticket);
            ticket.ClientId = client.id;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateException)
            {
                if (TicketExists(ticket.id)) return Conflict();
                else throw;
            }

            return NoContent();
        }
        
        [HttpDelete("DeleteClient/{id}")]
        public async Task<IActionResult> DeleteClient(int id)
        {
            var client = await _context.client.FindAsync(id);
            if (client == null)
            {
                return NotFound();
            }

            _context.client.Remove(client);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClientExists(int id)
        {
            return _context.client.Any(e => e.id == id);
        }

        private bool TicketExists(int id)
        {
            return _context.ticket.Any(e => e.id == id);
        }


        /*[HttpPut("RegisterClient")]
        public async Task<IActionResult> PutClient(Client client)
        {

            if (id != client.id)
            {
                return BadRequest();
            }

            _context.Entry(client).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }*/


        private List<ClientView> toClientViews(List<Client> clients)
        {
            var views = new List<ClientView>();
            clients.ForEach(client =>
           {
               views.Add( toClientView(client));
           });
            return views;
        }

        private ClientView toClientView( Client client)
        {
            return new ClientView
            {
                id = client.id,
                Name = client.Name,
                Address = client.Address,
                Telephone = client.Telephone,
                Email = client.Email,
                RegistrationDate = client.RegistrationDate.ToString("yyyy/MM/dd  HH:mm:ss"),
                CNP = client.CNP,
                BarCode = client.BarCode,
                IsDeleted = client.IsDeleted
            };
        }
        
    }
}
