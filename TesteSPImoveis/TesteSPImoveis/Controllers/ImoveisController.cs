using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TesteSPImoveis.Models;
using TesteSPImoveis.Models.Context;

namespace TesteSPImoveis.Controllers
{
    public class ImoveisController : Controller
    {
        private readonly Contexto _context;

        public ImoveisController(Contexto context)
        {
            _context = context;
        }

        // Index
        public ActionResult Index()
        {
            return View();
        }

        // Busca todos os imoveis
        [HttpGet]
        public async Task<JsonResult> GetAll()
        {
            return Json(await _context.Imovel.ToListAsync());
        }

        // Cadastra novo Imovel
        [HttpPost]
        public async Task<JsonResult> NovoImovel(Imovel imovel)
        {
            if (ModelState.IsValid)
            {
                await _context.Imovel.AddAsync(imovel);
                await _context.SaveChangesAsync();
                return Json(imovel);
            }
            return Json(ModelState);
        }

        // Busca Imovel pelo ID
        [HttpGet]
        public async Task<JsonResult> BuscarImovelId(int ImovelId)
        {
            Imovel imovel = await _context.Imovel.FindAsync(ImovelId);
            return Json(imovel);
        }

        // Atualiza o Imovel
        [HttpPut]
        public async Task<JsonResult> AtualizarImovel(Imovel imovel)
        {
            if (ModelState.IsValid)
            {
                _context.Imovel.Update(imovel);
                await _context.SaveChangesAsync();

                return Json(imovel);
            }
            return Json(ModelState);
        }

        // Remove o Imovel
        [HttpDelete]
        public async Task<JsonResult> ExcluirImovel(int ImovelId)
        {
            var imovel = await _context.Imovel.FindAsync(ImovelId);

            if (imovel != null)
            {
                _context.Imovel.Remove(imovel);
                await _context.SaveChangesAsync();
                return Json(true);
            }
            return Json(new
            {
                message = "Imovel não encontrado"
            });
        }

        #region Gerado por Scaffold
        // GET: Imoveis
        public async Task<IActionResult> GetImoveis()
        {
              return View(await _context.Imovel.ToListAsync());
        }

        // GET: Imoveis/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Imovel == null)
            {
                return NotFound();
            }

            var imovel = await _context.Imovel
                .FirstOrDefaultAsync(m => m.ImovelId == id);
            if (imovel == null)
            {
                return NotFound();
            }

            return View(imovel);
        }

        // GET: Imoveis/Create
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ImovelId,ClienteId,Cidade,Bairro,Rua,Numero,Complemento")] Imovel imovel)
        {
            if (ModelState.IsValid)
            {
                _context.Add(imovel);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(imovel);
        }

        // GET: Imoveis/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Imovel == null)
            {
                return NotFound();
            }

            var imovel = await _context.Imovel.FindAsync(id);
            if (imovel == null)
            {
                return NotFound();
            }
            return View(imovel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ImovelId,ClienteId,Cidade,Bairro,Rua,Numero,Complemento")] Imovel imovel)
        {
            if (id != imovel.ImovelId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(imovel);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ImovelExists(imovel.ImovelId))
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
            return View(imovel);
        }

        // GET: Imoveis/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Imovel == null)
            {
                return NotFound();
            }

            var imovel = await _context.Imovel
                .FirstOrDefaultAsync(m => m.ImovelId == id);
            if (imovel == null)
            {
                return NotFound();
            }

            return View(imovel);
        }

        // POST: Imoveis/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Imovel == null)
            {
                return Problem("Entity set 'Contexto.Imovel'  is null.");
            }
            var imovel = await _context.Imovel.FindAsync(id);
            if (imovel != null)
            {
                _context.Imovel.Remove(imovel);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ImovelExists(int id)
        {
          return _context.Imovel.Any(e => e.ImovelId == id);
        }
        #endregion
    }
}
