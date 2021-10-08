using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fanstorm.Mall.Core.Models
{
    public class product_main : _baseModel
    {


        public string name { get; set; }

        public string description { get; set; }

        public string pic { get; set; }

        public decimal price { get; set; }

        public string detail { get; set; }


    }
}
