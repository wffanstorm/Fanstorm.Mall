using Fanstorm.Mall.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fanstorm.Mall.Web.Controllers.Api
{
    public class CartController : _apiBaseController
    {

        private readonly IConfiguration _configuration;
        private readonly CartService _cartService;
        private readonly UserReceiveAddressService _userReceiveAddressService;


        public CartController(CartService cartService, IConfiguration configuration, UserReceiveAddressService userReceiveAddressService)
        {
            _configuration = configuration;
            _cartService = cartService;
            _userReceiveAddressService = userReceiveAddressService;
        }


        [HttpGet]
        public IActionResult GetList()
        {
            var result = _cartService.GetList(CurrentUser.id)
                .OrderByDescending(x => x.is_checked)
                .ThenBy(x => x.create_date)
                .ToList();
            return SuccessResult(result);
        }


        [HttpPost]
        public IActionResult ChangeCartQuantity([FromForm] string productId, [FromForm] int quantity)
        {
            _cartService.ChangeCartQuantity(CurrentUser.id, productId, quantity);
            return SuccessResult();
        }

        [HttpPost]
        public IActionResult Check([FromForm]string id)
        {
            _cartService.Check(id);
            return SuccessResult();
        }


        [HttpPost]
        public IActionResult Checkout()
        {
            var address = _userReceiveAddressService.GetList().Where(x => x.is_default == 1).FirstOrDefault();
            if (address == null)
            {
                return FailResult("请先设置收货地址");
            }

            var cartItems = _cartService.GetList().Where(x => x.is_checked == 1).ToList();
            decimal totalAmount = 0;
            foreach (var item in cartItems)
            {
                totalAmount += item.price * item.quantity;
            }

            return SuccessResult(new
            {
                cartItems,
                totalAmount,
                address
            });
        }



    }
}
