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
    public class UserReceiveAddressController : _apiBaseController
    {

        private readonly IConfiguration _configuration;
        private readonly UserReceiveAddressService _userReceiveAddressService;


        public UserReceiveAddressController(IConfiguration configuration, UserReceiveAddressService userReceiveAddressService)
        {
            _configuration = configuration;
            _userReceiveAddressService = userReceiveAddressService;
        }

        [HttpGet]
        public IActionResult GetById(string id)
        {
            var result = _userReceiveAddressService.GetById(id);
            return SuccessResult(result);
        }


        [HttpGet]
        public IActionResult GetList()
        {
            var result = _userReceiveAddressService.GetList()
                .OrderByDescending(x => x.is_default)
                .ThenBy(x => x.create_date)
                .ToList();
            return SuccessResult(result);
        }

        [HttpPost]
        public IActionResult SetDefault([FromForm] string id)
        {
            var list = _userReceiveAddressService.GetList();
            foreach (var item in list)
            {
                if (item.id == id)
                {
                    item.is_default = 1;
                }
                else
                {
                    item.is_default = 0;
                }
                _userReceiveAddressService.Update(item);
            }
            return SuccessResult();
        }

        [HttpPost]
        public IActionResult Delete([FromForm] string id)
        {
            var item = _userReceiveAddressService.GetById(id);
            if (item == null)
            {
                return FailResult("收货地址不存在！");
            }
            _userReceiveAddressService.DeletePhysically(item);
            return SuccessResult();
        }


        [HttpPost]
        public IActionResult AddOrUpdate([FromForm] string id, [FromForm] string name, [FromForm] string phone,
            [FromForm] string province, [FromForm] string city, [FromForm] string region, [FromForm] string detailAddress)
        {
            if (string.IsNullOrEmpty(id))
            {
                var newOne = new user_receive_address()
                {
                    id = Guid.NewGuid().ToString(),
                    create_date = DateTime.Now,
                    is_deleted = 0,
                    is_default = 0,
                    user_id = CurrentUser.id,
                    phone = phone,
                    name = name,
                    province = province,
                    city = city,
                    region = region,
                    detail_address = detailAddress
                };
                _userReceiveAddressService.Add(newOne);
            }
            else
            {
                var oldOne = _userReceiveAddressService.GetById(id);
                oldOne.name = name;
                oldOne.phone = phone;
                oldOne.province = province;
                oldOne.city = city;
                oldOne.region = region;
                oldOne.detail_address = detailAddress;
                _userReceiveAddressService.Update(oldOne);
            }
            return SuccessResult();
        }



    }
}
