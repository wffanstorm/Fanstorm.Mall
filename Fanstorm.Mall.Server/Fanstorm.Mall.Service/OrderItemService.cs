﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Fanstorm.Mall.Core.Models;
using Fanstorm.Mall.Data;

namespace Fanstorm.Mall.Service
{
    public class OrderItemService : _baseService<order_item>
    {
        public OrderItemService(MallContext context) : base(context)
        {
        }

        public List<order_item> GetList(string orderId)
        {
            return _context.OrderItems.Where(x => x.order_id == orderId).ToList();
        }

    }
}