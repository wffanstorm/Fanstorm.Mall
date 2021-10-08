using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Fanstorm.Mall.Core.Models;
using Fanstorm.Mall.Data;

namespace Fanstorm.Mall.Service
{
    public class CartService : _baseService<cart_item>
    {
        public CartService(MallContext context) : base(context)
        {
        }

        public List<cart_item> GetList(string userId)
        {
            var query = _context.CartItems.Where(x => x.is_deleted == 0);
            query = query.Where(x => x.user_id == userId);
            var list = query.ToList();
            return list;
        }


        public void Check(string id)
        {
            var cartItem = _context.CartItems.Find(id);
            if (cartItem.is_checked == 0)
            {
                cartItem.is_checked = 1;
            }
            else
            {
                cartItem.is_checked = 0;
            }
            base.Update(cartItem);
        }



        public void ChangeCartQuantity(string userId, string productId, int quantity)
        {
            var product = _context.Products.Find(productId);
            var cartItems = _context.CartItems
                .Where(x => x.product_id == productId)
                .ToList();

            if (cartItems.Count == 0)
            {
                //new to cart
                var newCartItem = new cart_item()
                {
                    id = Guid.NewGuid().ToString(),
                    create_date = DateTime.Now,
                    is_checked = 1,
                    price = product.price,
                    product_desc = product.description,
                    product_id = product.id,
                    product_name = product.name,
                    product_pic = product.pic,
                    user_id = userId,
                    quantity = quantity
                };
                base.Add(newCartItem);
            }
            else
            {
                //already in cart, change the quantity
                if (quantity == 0)
                {
                    base.DeletePhysically(cartItems[0]);
                }
                else
                {
                    cartItems[0].quantity = quantity;
                }
            }
        }


    }
}