using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Views
{
    public class ClientView
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string Telephone { get; set; }
        public string Email { get; set; }
        public string RegistrationDate { get; set; } = "";
        public string CNP { get; set; }
        public int BarCode { get; set; } = new Random().Next();
        public bool IsDeleted { get; set; } = false;
    }
}
