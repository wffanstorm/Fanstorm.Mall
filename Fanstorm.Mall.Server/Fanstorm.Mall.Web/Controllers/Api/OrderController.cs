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


        public OrderController(IConfiguration configuration,
            UserReceiveAddressService userReceiveAddressService,
            OrderService orderService,
            OrderItemService orderItemService)
        {
            _configuration = configuration;
            _userReceiveAddressService = userReceiveAddressService;
            _orderService = orderService;
            _orderItemService = orderItemService;
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
            var result = _orderService.GetList(CurrentUser.id, status);
            return SuccessResult(result);
        }

    }
}
