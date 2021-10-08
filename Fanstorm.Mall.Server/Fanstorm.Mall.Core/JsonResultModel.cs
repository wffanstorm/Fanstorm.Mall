using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanstorm.Mall.Core
{
    public class JsonResultModel<T>
    {
        public int code { get; set; }
        public T data { get; set; }

        public string message { get; set; }
    }
}
