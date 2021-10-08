using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Fanstorm.Mall.Service;
using Fanstorm.Mall.Core.Models;
using Fanstorm.Mall.Core;

namespace Fanstorm.Mall.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class _baseController : Controller
    {

        protected IActionResult SuccessResult(object data = null, string message = "")
        {
            return JsonResult(200, data, message);
        }

        protected IActionResult FailResult(string message = "")
        {
            return JsonResult(-1, null, message);
        }

        protected IActionResult JsonResult(int code, object data, string message = "")
        {
            return Json(new JsonResultModel<object>
            {
                code = code,
                data = data,
                message = message
            });
        }

    }
}
