using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fanstorm.Mall.Core.Models
{
    public class user_main : _baseModel
    {

        public string username { get; set; }

        public string password { get; set; }

        public string gender { get; set; }

        public string phone { get; set; }

        public decimal money { get; set; }

        public string nickname { get; set; }

        /// <summary>
        /// 0 正常 1冻结
        /// </summary>
        public int status { get; set; }

        public DateTime create_time { get; set; }

        public string avatar { get; set; }

        public string pay_pwd { get; set; }


    }
}
