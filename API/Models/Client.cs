using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Client : Document
    {
        public string Name { get; set; } 
        public string Address { get; set; }
        public string Telephone { get; set; }
        public string Email { get; set; }
        public DateTime RegistrationDate { get; set; } = DateTime.Now;
        public string CNP { get; set; } = "";
        public int BarCode { get; set; } = new Random().Next();
        public bool IsDeleted { get; set; } = false;
    }
}