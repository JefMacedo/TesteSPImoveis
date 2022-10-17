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
    }
}
