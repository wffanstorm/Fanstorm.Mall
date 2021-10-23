using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fanstorm.Mall.Core.Models
{
    public class order_main : _baseModel
    {

        public string user_id { get; set; }
        public DateTime create_date { get; set; }

        public decimal total_amount { get; set; }


        public string receiver_name { get; set; }

        public string receiver_phone { get; set; }
        
        public string receiver_province { get; set; }

        public string receiver_city { get; set; }

        public string receiver_region { get; set; }

        public string receiver_detail_address { get; set; }

        public string note { get; set; }

        /// <summary>
        /// 0 下单，等待发货，1发货，等待签收 2 签收 3 退货退款 10 cancel
        /// </summary>
        public int status { get; set; }



    }
}
