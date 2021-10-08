using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Fanstorm.Mall.Core.Models;
using Fanstorm.Mall.Data;

namespace Fanstorm.Mall.Service
{
    public class ProductService : _baseService<product_main>
    {
        public ProductService(MallContext context) : base(context)
        {
        }


        public List<product_main> GetPagedList(string name, int pageIndex, int pageSize)
        {
            var query = _context.Products.Where(x => x.is_deleted == 0);

            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(x => x.name.Contains(name));
            }

            var products = query
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            return products;
        }



    }
}
