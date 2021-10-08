using Fanstorm.Mall.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fanstorm.Mall.Web.Controllers.Api
{
    [AllowAnonymous]
    public class ProductController : _apiBaseController
    {

        private readonly IConfiguration _configuration;
        private readonly ProductService _productService;

        public ProductController(ProductService productService, IConfiguration configuration)
        {
            _configuration = configuration;
            _productService = productService;
        }

        [HttpGet]
        public IActionResult GetList(string name, int pageIndex, int pageSize)
        {
            var products = _productService.GetPagedList(name, pageIndex, pageSize);
            var list = products.Select(x => new
            {
                x.id,
                x.name,
                x.pic,
                x.price,
                x.description
            });
            return SuccessResult(list);
        }

        [HttpGet]
        public IActionResult GetDetail(string id)
        {
            var product = _productService.GetById(id);
            return SuccessResult(product);
        }


    }
}
