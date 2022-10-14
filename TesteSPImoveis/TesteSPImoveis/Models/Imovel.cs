using System.ComponentModel.DataAnnotations.Schema;

namespace TesteSPImoveis.Models
{
    [Table("Imovel")]
    public class Imovel
    {
        [Column("ImovelId")]
        public int ImovelId { get; set; }

        [Column("ClienteId")]
        public int ClienteId { get; set; }

        [Column("Cidade")]
        public string Cidade { get; set; }

        [Column("Bairro")]
        public string Bairro { get; set; }

        [Column("Rua")]
        public string Rua { get; set; }

        [Column("Numero")]
        public int Numero { get; set; }

        [Column("Complemento")]
        public string Complemento { get; set; }
    }
}
