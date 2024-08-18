using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using IdentityModel;
using IdentityService.Models;
using Microsoft.AspNetCore.Identity;

namespace IdentityService.Services
{
    public class CustomProfileService : IProfileService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public CustomProfileService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;

        }
        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var user = await _userManager.GetUserAsync(context.Subject);

            if (user != null)
            {
                var existingClaims = await _userManager.GetClaimsAsync(user);

                var claims = new List<Claim>();

                if (!string.IsNullOrEmpty(user.UserName))
                {
                    new Claim("username", user.UserName);
                }

                context.IssuedClaims.AddRange(claims);
                var nameClaim = existingClaims.FirstOrDefault(x => x.Type == JwtClaimTypes.Name);

                if (nameClaim != null)
                {
                    context.IssuedClaims.AddRange(claims);
                }
            }
        }

        public Task IsActiveAsync(IsActiveContext context)
        {
            return Task.CompletedTask;
        }
    }
}