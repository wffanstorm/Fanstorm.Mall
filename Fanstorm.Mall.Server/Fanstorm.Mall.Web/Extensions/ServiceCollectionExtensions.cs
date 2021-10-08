using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Fanstorm.Mall.Service;

namespace Fanstorm.Mall.Web.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection RegisterCustomServices(this IServiceCollection services)
        { 
            services.AddScoped<UserService>();
            services.AddScoped<UserReceiveAddressService>();
            services.AddScoped<ProductService>();
            services.AddScoped<OrderService>();
            services.AddScoped<OrderItemService>();
            services.AddScoped<CartService>();

            return services;

        }
    }
}
