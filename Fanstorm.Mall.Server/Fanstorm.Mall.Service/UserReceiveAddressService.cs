using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Fanstorm.Mall.Core.Models;
using Fanstorm.Mall.Data;

namespace Fanstorm.Mall.Service
{
    public class UserReceiveAddressService : _baseService<user_receive_address>
    {
        public UserReceiveAddressService(MallContext context) : base(context)
        {
        }

        public new void Add(user_receive_address address)
        {
            var list = base.GetList();
            foreach(var item in list)
            {
                item.is_default = 0;
                base.Update(item);
            }
            address.is_default = 1;
            base.Add(address);
        }

    }
}
