using Microsoft.EntityFrameworkCore;

namespace TesteSPImoveis.Models.Context
{
    public class Contexto : DbContext
    {
        public Contexto(DbContextOptions<Contexto> options) :base(options) { }

        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<Imovel> Imovel { get; set; }
    }
}
