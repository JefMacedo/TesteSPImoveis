using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TesteSPImoveis.Models;
using TesteSPImoveis.Models.Context;

namespace TesteSPImoveis.Controllers
{
    public class ClientesController : Controller
    {
        private readonly Contexto _context;

        public ClientesController(Contexto context)
        {
            _context = context;
        }

        // Index
        public ActionResult Index()
        {
            return View();
        }

        // Busca todos os clientes
        [HttpGet]
        public async Task<JsonResult> GetAll()
        {
            return Json(await _context.Cliente.ToListAsync());
        }

        // Cadastra novo cliente
        [HttpPost]
        public async Task<JsonResult> NovoCliente(Cliente cliente)
        {
            if (ModelState.IsValid)
            {
                await _context.Cliente.AddAsync(cliente);
                await _context.SaveChangesAsync();
                return Json(cliente);
            }
            return Json(ModelState);
        }

        // Busca Cliente pelo ID
        [HttpGet]
        public async Task<JsonResult> BuscarClienteId(int clienteId)
        {
            Cliente cliente = await _context.Cliente.FindAsync(clienteId);
            return Json(cliente);
        }

        // Atualiza o cliente
        [HttpPut]
        public async Task<JsonResult> AtualizarCliente(Cliente cliente)
        {
            if (ModelState.IsValid)
            {
                _context.Cliente.Update(cliente);
                await _context.SaveChangesAsync();

                return Json(cliente);
            }
            return Json(ModelState);
        }

        // Remove o cliente
        [HttpDelete]
        public async Task<JsonResult> ExcluirCliente(int clienteId)
        {
            var cliente = await _context.Cliente.FindAsync(clienteId);

            if (cliente != null)
            {
                _context.Cliente.Remove(cliente);
                await _context.SaveChangesAsync();
                return Json(true);
            }
            return Json(new
            {
                message = "Cliente não encontrado"
            });
        }
    }
}
