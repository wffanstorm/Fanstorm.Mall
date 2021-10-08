using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Fanstorm.Mall.Core.Models;

namespace Fanstorm.Mall.Data
{
    public class MallContext : DbContext
    {
        public MallContext(DbContextOptions<MallContext> options) : base(options)
        {
        }

        public DbSet<user_main> Users { get; set; }
        public DbSet<product_main> Products { get; set; }
        public DbSet<order_main> Orders { get; set; }
        public DbSet<order_item> OrderItems { get; set; }
        public DbSet<cart_item> CartItems { get; set; }
        public DbSet<user_receive_address> UserReceiveAddresses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<user_main>().ToTable("user_main");
            modelBuilder.Entity<product_main>().ToTable("product_main");
            modelBuilder.Entity<order_main>().ToTable("order_main");
            modelBuilder.Entity<order_item>().ToTable("order_item");
            modelBuilder.Entity<cart_item>().ToTable("cart_item");
            modelBuilder.Entity<user_receive_address>().ToTable("user_receive_address");
        }

    }
}
