using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanstorm.Mall.Core
{
    public class PagedList<T> : List<T>
    {
        public PagedList(IEnumerable<T> list, int pageSize, int totalCount)
            : base(list)
        {
            TotalCount = totalCount;

            TotalPage = TotalCount / pageSize;
            if (TotalCount % pageSize > 0)
            {
                TotalPage += 1;
            }
        }

        public int TotalCount { get; set; }

        public int TotalPage { get; set; }
    }
}
