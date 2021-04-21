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

namespace API.Controllers
{
    [EnableCors]
    [Route("api/controller")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly MyContext _context;
       

        public ClientController(MyContext context)
        {
            _context = context;            
        }

              
        [HttpGet("ListClients")]
        public async Task<ActionResult<IEnumerable<Client>>> listClients()
        {
            return await _context.client.ToListAsync();
        }

        [HttpGet("ListRooms")]
        public async Task<ActionResult<IEnumerable<Room>>> listRooms()
        {
            return await _context.room.ToListAsync();
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

        [HttpPost("RegisterClient")]
        public async Task<ActionResult<Client>> PostClient(Client client)
        {
            _context.client.Add(client);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ClientExists(client.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetClient", new { id = client.id }, client);
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

        private bool ClientExists(double id)
        {
            return _context.client.Any(e => e.id == id);
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
                BarCode = "21301",
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
                BarCode = "91291",
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
