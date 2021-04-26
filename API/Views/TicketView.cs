using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Views
{
    public class TicketView : Document
    {
        public int ClientId { get; set; } = 0;
        public int RoomId { get; set; }
        public string RoomName { get; set; }
        public double Price { get; set; }
        public int ValidDays { get; set; }
        public int MaxUsages { get; set; }
        public int UsesPerDay { get; set; }
        public int UsedCounter { get; set; } = 0;
        public string ValidUntil { get; set; } = "";
        public string PurchaseDate { get; set; } = "";
    }
}
