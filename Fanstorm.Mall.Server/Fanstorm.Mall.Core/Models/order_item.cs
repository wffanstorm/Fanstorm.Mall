using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fanstorm.Mall.Core.Models
{
    public class order_item : _baseModel
    {

        public string order_id { get; set; }

        public string product_id { get; set; }

        public string product_name { get; set; }

        public string product_desc { get; set; }

        public string product_pic { get; set; }

        public decimal product_price { get; set; }

        public int quantity { get; set; }

        public decimal total_amount { get; set; }


    }
}
