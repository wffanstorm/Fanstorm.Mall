using Fanstorm.Mall.Core.Models;
using Fanstorm.Mall.Service;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Fanstorm.Mall.Web.Controllers;
using Microsoft.AspNetCore.Mvc;
using Fanstorm.Mall.Web.Extensions;

namespace Fanstorm.Mall.Web.Controllers.Api
{

    [CustomAuthorize(Roles = "user")]
    [ApiExplorerSettings(GroupName = "api")]
    public class _apiBaseController : _baseController
    {
        private user_main _user;

        public user_main CurrentUser
        {
            get
            {
                if (_user == null)
                {
                    var userService = (UserService)HttpContext.RequestServices.GetService(typeof(UserService));
                    _user = userService.GetById(User.Identity.Name); //User.Identity.Name
                }
                return _user;
            }
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (CurrentUser != null && CurrentUser.status == 1)
            {
                context.Result = new JsonResult(new
                {
                    code = "401",
                    message = "账号被禁，无法登陆"
                });
            }
            else
            {
                base.OnActionExecuting(context);
            }
        }

    }
}
