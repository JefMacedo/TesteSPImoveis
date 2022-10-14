using System.ComponentModel.DataAnnotations.Schema;

namespace TesteSPImoveis.Models
{
    [Table("Cliente")]
    public class Cliente
    {
        [Column("ClienteId")]
        public int ClienteId { get; set; }

        [Column("Nome")]
        public string Nome { get; set; }

        [Column("Email")]
        public string Email { get; set; }

        [Column("Telefone")]
        public string Telefone { get; set; }

        [Column("Data")]
        public DateTime Data { get; set; }
    }
}
