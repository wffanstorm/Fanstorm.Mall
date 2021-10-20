using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Fanstorm.Mall.Core.Models;
using Fanstorm.Mall.Data;

namespace Fanstorm.Mall.Service
{
    public class OrderService : _baseService<order_main>
    {
        public OrderService(MallContext context) : base(context)
        {
        }


        public List<order_main> GetList(string userId, int? status)
        {
            var query = _context.Orders.Where(x => x.is_deleted == 0);

            if (string.IsNullOrEmpty(userId))
            {
                query = query.Where(x => x.user_id == userId);
            }

            if (status.HasValue)
            {
                query = query.Where(x => x.status == status);
            }

            var list = query.OrderByDescending(x => x.create_date).ToList();
            return list;
        }

        public order_main Create(user_main u, string note, user_receive_address address, List<cart_item> cartItems)
        {
            var order = new order_main()
            {
                id = Guid.NewGuid().ToString(),
                create_date = DateTime.Now,
                is_deleted = 0,
                note = note,
                receiver_name=address.name,
                receiver_city = address.city,
                receiver_detail_address = address.detail_address,
                receiver_province = address.province,
                receiver_region = address.region,
                status = 0,
                total_amount = 0,
                user_id = u.id
            };

            var orderItemList = new List<order_item>();
            foreach (var item in cartItems)
            {
                var itemTotalAmount = item.price * item.quantity;
                order.total_amount += itemTotalAmount;
                orderItemList.Add(new order_item()
                {
                    id = Guid.NewGuid().ToString(),
                    is_deleted = 0,
                    order_id = order.id,
                    product_id = item.product_id,
                    product_name = item.product_name,
                    product_pic = item.product_pic,
                    product_price = item.price,
                    quantity = item.quantity,
                    total_amount = itemTotalAmount,
                });
            }

            if (u.money < order.total_amount)
            {
                return null;
            }

            try
            {
                u.money -= order.total_amount;
                _context.Users.Update(u);
                _context.Orders.Add(order);
                _context.OrderItems.AddRange(orderItemList);
                _context.CartItems.RemoveRange(cartItems);
                _context.SaveChanges();
                return order;
            }
            catch (Exception ex)
            {
                u.money += order.total_amount;
                return null;
            }
        }




    }
}