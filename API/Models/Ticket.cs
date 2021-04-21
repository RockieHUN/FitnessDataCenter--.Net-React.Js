using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Ticket: Document
    {
        public int ClientId { get; set; }
        public int RoomId { get; set; }
        public double Price { get; set; }
        public int ValidDays { get; set; }
        public int MaxUsages { get; set; }
        public int UsesPerDay { get; set; }
        public int UsedCounter { get; set; }
        public DateTime ValidUntil { get; set; }
        public DateTime PurchaseDate { get; set; }
    }
}
