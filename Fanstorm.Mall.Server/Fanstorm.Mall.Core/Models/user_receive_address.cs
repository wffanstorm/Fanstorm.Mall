using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fanstorm.Mall.Core.Models
{
    public class user_receive_address : _baseModel
    {
        public DateTime create_date { get; set; }

        public string user_id { get; set; }

        public string name { get; set; }

        public string  phone { get; set; }

        public string province { get; set; }

        public string city { get; set; }

        public string region { get; set; }

        public string detail_address { get; set; }

        public int is_default { get; set; }


    }
}
