using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Fanstorm.Mall.Core.Models;
using Fanstorm.Mall.Data;

namespace Fanstorm.Mall.Service
{
    public class _baseService<T> where T : _baseModel, new()
    {
        protected readonly MallContext _context;

        public _baseService(MallContext context)
        {
            _context = context;
        }

        public T GetById(string id)
        {
            var result = _context.Set<T>()
               .Where(x => x.id == id)
               .FirstOrDefault();
            return result;
        }

        public List<T> GetList()
        {
            var list = _context.Set<T>().Where(x=>x.is_deleted==0).ToList();
            return list;
        }

        public T Add(T item)
        {
            _context.Set<T>().Add(item);
            _context.SaveChanges();
            return item;
        }

        public void Update(T item)
        {
            _context.Set<T>().Update(item);
            _context.SaveChanges();
        }

        public void DeletePhysically(T item)
        {
            _context.Set<T>().Remove(item);
            _context.SaveChanges();
        }

        public void DeleteLogicly(T item)
        {
            item.is_deleted = 1;
            Update(item);
        }

    }
}
