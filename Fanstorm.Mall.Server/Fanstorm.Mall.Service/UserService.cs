using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Fanstorm.Mall.Data;
using Fanstorm.Mall.Core.Models;

namespace Fanstorm.Mall.Service
{
    public class UserService : _baseService<user_main>
    {

        public UserService(MallContext context) : base(context)
        {
        }

        public  user_main GetByUserName(string username)
        {
            var u = _context.Users.Where(x => x.username == username).FirstOrDefault();
            return u;
        }

        public user_main Login(string uname, string pwd)
        {
            var u = GetByUserName(uname);
            if (u == null)
            {
                return null;
            }
            if (pwd != u.password)
            {
                return null;
            }
            return u;
        }

        public new List<user_main> GetList()
        {
            var users = base.GetList();
            users.ForEach(x =>
            {
                x.password = "";
                x.pay_pwd = "";
            });
            return users;
        }


    }
}
