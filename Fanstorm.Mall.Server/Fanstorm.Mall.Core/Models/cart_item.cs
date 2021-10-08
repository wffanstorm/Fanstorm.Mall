using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fanstorm.Mall.Core.Models
{
    public class cart_item : _baseModel
    {


        public string product_id { get; set; }

        public string user_id { get; set; }

        public decimal price { get; set; }

        public string product_pic { get; set; }

        public string product_name { get; set; }

        public string product_desc { get; set; }

        public DateTime create_date { get; set; }

        public int is_checked { get; set; }

        public int quantity { get; set; }

    }
}
