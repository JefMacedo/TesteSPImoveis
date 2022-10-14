using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
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

            if(cliente != null)
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

        #region gerado pelo Scaffold
        // GET: Clientes
        public async Task<IActionResult> GetClientes()
        {
            return View(await _context.Cliente.ToListAsync());
        }

        // GET: Clientes/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Cliente == null)
            {
                return NotFound();
            }

            var cliente = await _context.Cliente
                .FirstOrDefaultAsync(m => m.ClienteId == id);
            if (cliente == null)
            {
                return NotFound();
            }

            return View(cliente);
        }

        // GET: Clientes/Create
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ClienteId,Nome,Email,Telefone,Data")] Cliente cliente)
        {
            if (ModelState.IsValid)
            {
                _context.Add(cliente);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(cliente);
        }

        // GET: Clientes/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Cliente == null)
            {
                return NotFound();
            }

            var cliente = await _context.Cliente.FindAsync(id);
            if (cliente == null)
            {
                return NotFound();
            }
            return View(cliente);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ClienteId,Nome,Email,Telefone,Data")] Cliente cliente)
        {
            if (id != cliente.ClienteId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(cliente);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ClienteExists(cliente.ClienteId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(cliente);
        }

        // GET: Clientes/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Cliente == null)
            {
                return NotFound();
            }

            var cliente = await _context.Cliente
                .FirstOrDefaultAsync(m => m.ClienteId == id);
            if (cliente == null)
            {
                return NotFound();
            }

            return View(cliente);
        }

        // POST: Clientes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Cliente == null)
            {
                return Problem("Entity set 'Contexto.Cliente'  is null.");
            }
            var cliente = await _context.Cliente.FindAsync(id);
            if (cliente != null)
            {
                _context.Cliente.Remove(cliente);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ClienteExists(int id)
        {
            return _context.Cliente.Any(e => e.ClienteId == id);
        }
        #endregion
    }
}
