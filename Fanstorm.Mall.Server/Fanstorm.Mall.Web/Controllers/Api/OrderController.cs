using Fanstorm.Mall.Core.Models;
using Fanstorm.Mall.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fanstorm.Mall.Web.Controllers.Api
{
    public class OrderController : _apiBaseController
    {
        private readonly IConfiguration _configuration;
        private readonly UserReceiveAddressService _userReceiveAddressService;
        private readonly OrderService _orderService;
        private readonly OrderItemService _orderItemService;
        private readonly CartService _cartService;



        public OrderController(IConfiguration configuration,
            UserReceiveAddressService userReceiveAddressService,
            OrderService orderService,
            OrderItemService orderItemService,
            CartService cartService)
        {
            _configuration = configuration;
            _userReceiveAddressService = userReceiveAddressService;
            _orderService = orderService;
            _orderItemService = orderItemService;
            _cartService = cartService;
        }


        [HttpGet]
        public IActionResult GetById(string id)
        {
            var result = _orderService.GetById(id);
            return SuccessResult(result);
        }

        [HttpGet]
        public IActionResult GetList(int? status)
        {
            var orders = _orderService.GetList(CurrentUser.id, status);
            var result = new List<object>();
            foreach (var order in orders)
            {
                var items = _orderItemService.GetList(order.id).Select(x => new
                {
                    x.id,
                    x.product_id,
                    x.product_name,
                    x.product_pic,
                    x.product_price,
                    x.quantity,
                    x.total_amount
                });
                result.Add(new
                {
                    order.id,
                    order.note,
                    order.receiver_name,
                    order.receiver_phone,
                    order.total_amount,
                    items
                });
            }

            return SuccessResult(result);
        }

        [HttpPost]
        public IActionResult Create([FromForm] string addressId, [FromForm] string note, [FromForm] string payPwd)
        {
            if (payPwd != CurrentUser.pay_pwd) return FailResult("支付密码错误");

            var address = _userReceiveAddressService.GetById(addressId);
            if (address == null) return FailResult("地址错误");

            var cartItems = _cartService.GetList(CurrentUser.id)
                .Where(x => x.is_checked == 1)
                .ToList();

            order_main order = _orderService.Create(CurrentUser, note, address, cartItems);

            if (order == null) return FailResult("下单失败");

            return SuccessResult(order);
        }

    }
}
