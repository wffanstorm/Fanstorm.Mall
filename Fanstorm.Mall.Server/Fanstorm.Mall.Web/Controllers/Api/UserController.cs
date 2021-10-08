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
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;

namespace Fanstorm.Mall.Web.Controllers.Api
{

    public class UserController : _apiBaseController
    {
        private readonly IConfiguration _configuration;
        private readonly UserService _userService;

        public UserController(UserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Register([FromForm] string username, [FromForm] string password, [FromForm] string phone, [FromForm] string payPwd)
        {
            var u = _userService.GetByUserName(username);
            if (u != null)
            {
                return FailResult("用户已存在！");
            }

            user_main newUser = new user_main()
            {
                id = Guid.NewGuid().ToString(),
                username = username,
                password = password,
                gender = "n",
                phone = phone,
                money = 1000,
                nickname = "新手买家",
                status = 0,
                create_time = DateTime.Now,
                avatar = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic3.zhimg.com%2F50%2Fv2-100479d26a7b9d8d275f0018b4d824c7_hd.jpg&refer=http%3A%2F%2Fpic3.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635324328&t=ea0e34f6834330f2ef2c14b0bf0443d8",
                pay_pwd = payPwd,
                is_deleted = 0
            };
            _userService.Add(newUser);
            return SuccessResult();
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromForm] string uname, [FromForm] string pwd)
        {
            var user = _userService.Login(uname, pwd);
            if (user == null) return FailResult("账号或密码错误");

            var key = Encoding.ASCII.GetBytes(_configuration["JwtKey"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.id),
                    new Claim(ClaimTypes.Role, "user")
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenStr = tokenHandler.WriteToken(token);
            return JsonResult(200, new { token = tokenStr, tokenHead = "Bearer" }, "操作成功");
        }

        [HttpGet]
        public IActionResult GetInfo()
        {
            var u = CurrentUser;
            return SuccessResult(new
            {
                u.username,
                u.nickname,
                u.phone,
                u.money,
                u.avatar,
                u.gender
            });
        }

        [HttpPost]
        public IActionResult Recharge([FromForm] decimal money)
        {
            CurrentUser.money += money;
            _userService.Update(CurrentUser);
            return SuccessResult();
        }



        //// GET: api/UserMain/GetById/{id}
        //[HttpGet("{id}")]
        //public ActionResult<user_main> GetById(string id)
        //{
        //    var user_main = _userService.GetById(id);

        //    if (user_main == null)
        //    {
        //        return NotFound();
        //    }

        //    return user_main;
        //}

        //// PUT: api/UserMain/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> Putuser_main(string id, user_main user_main)
        //{
        //    if (id != user_main.id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(user_main).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!user_mainExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/UserMain
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<user_main>> Postuser_main(user_main user_main)
        //{
        //    _context.Users.Add(user_main);
        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (user_mainExists(user_main.id))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return CreatedAtAction("Getuser_main", new { id = user_main.id }, user_main);
        //}

        //// DELETE: api/UserMain/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> Deleteuser_main(string id)
        //{
        //    var user_main = await _context.Users.FindAsync(id);
        //    if (user_main == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Users.Remove(user_main);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool user_mainExists(string id)
        //{
        //    return _context.Users.Any(e => e.id == id);
        //}
    }
}
