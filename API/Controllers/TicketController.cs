using API.Database;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
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



    }
}
