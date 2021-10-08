using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Fanstorm.Mall.Core.Models;
using Fanstorm.Mall.Data;

namespace Fanstorm.Mall.Service
{
    public class OrderService : _baseService<order_main>
    {
        public OrderService(MallContext context) : base(context)
        {
        }


        public List<order_main> GetList(string userId,int? status)
        {
            var query = _context.Orders.Where(x => x.is_deleted == 0);

            if (string.IsNullOrEmpty(userId))
            {
                query = query.Where(x => x.user_id == userId);
            }
         
            if (status.HasValue)
            {
                query = query.Where(x => x.status == status);
            }

            var list = query.OrderByDescending(x => x.create_date).ToList();
            return list;
        }




    }
}