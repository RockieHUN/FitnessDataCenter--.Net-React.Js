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
    [Route("api/Room")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly MyContext _context;


        public RoomController(MyContext context)
        {
            _context = context;
        }

        [HttpGet("ListRooms")]
        public async Task<ActionResult<IEnumerable<Room>>> listRooms()
        {
            return await _context.room.ToListAsync();
        }
    }
}
