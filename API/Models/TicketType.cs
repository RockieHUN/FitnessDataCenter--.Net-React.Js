using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class TicketType : Document
    {
        public string TicketName { get; set; }
        public int RoomId { get; set; }
        public string RoomName { get; set; }
        public double Price { get; set; }
        public int ValidDays { get; set; }
        public int MaxUsages { get; set; }
        public int UsesPerDay { get; set; }
        
    }
}
