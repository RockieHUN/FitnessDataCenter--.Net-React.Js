﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class ClientAndTicket
    {
        public Client client {get; set;}
        public TicketTypeId ticketTypeId {get; set; }
    }
}
