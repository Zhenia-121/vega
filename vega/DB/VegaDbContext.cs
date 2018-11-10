using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using vega.Models;

namespace vega.DB
{
    public class VegaDbContext: IdentityDbContext<Account>
    {
        public  VegaDbContext (DbContextOptions<VegaDbContext> options) 
    : base (options){}
    
       // public DbSet<Model> Models { get; set; }           
        public DbSet<Make> Makes { get; set; }           

        public DbSet<Feature> Features { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<Vehicle> Vehicles {get; set; }

        public DbSet<Photo> Photos { get; set; }
        //public DbSet<VehicleFeature> VehicleFeatures {get; set;}
        //public override OnModelCreating()
        protected override void OnModelCreating(ModelBuilder mb){
            base.OnModelCreating(mb);
                mb.Entity<VehicleFeature>()
                .HasKey(t => new {t.FeatureId, t.VehicleId});
                
        }
    }
}