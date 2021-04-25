using API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace API.Database
{
    public class MyContext : DbContext
    {
        
        public MyContext(DbContextOptions<MyContext> options) : base(options)
        {
        }
        public DbSet<Client> client { get; set; }
        public DbSet<Room> room { get; set; }
        public DbSet<Ticket> ticket { get; set; }
    }
}
