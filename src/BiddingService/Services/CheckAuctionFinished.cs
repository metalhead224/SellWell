using BiddingService.Models;
using Contracts;
using MassTransit;
using MongoDB.Entities;

namespace BiddingService.Services
{
    public class CheckAuctionFinished : BackgroundService
    {
        private readonly IServiceProvider _services;
        private readonly ILogger<CheckAuctionFinished> _logger;
        public CheckAuctionFinished(ILogger<CheckAuctionFinished> logger, IServiceProvider services)
        {
            _logger = logger;
            _services = services;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Starting check for auction finished");

            stoppingToken.Register(() => _logger.LogInformation("==> Auction check is stopping"));

            while(!stoppingToken.IsCancellationRequested)
            {
                await CheckAuctions(stoppingToken);

                await Task.Delay(5000);
            }
        }

        private async Task CheckAuctions(CancellationToken stoppingToken)
        {
            var finishedAuctions = await DB.Find<Auction>()
                .Match(x => x.AuctionEnd <= DateTime.UtcNow)
                .Match(x => !x.Finished)
                .ExecuteAsync(stoppingToken);

            if(finishedAuctions.Count == 0) return;

            _logger.LogInformation($"Found {finishedAuctions.Count} auctions that has completed");

            /** here new scope for IPublishedEndpoint is done cause BackgroundService has lifetime of singleton 
            and IPublishEndpoint has lifetime of Scoped  **/

            using var scoped = _services.CreateScope();
            var endpoint = scoped.ServiceProvider.GetRequiredService<IPublishEndpoint>();

            foreach(var auction in finishedAuctions)
            {
                auction.Finished = true;
                await DB.SaveAsync(auction);

                var winingBid = await DB.Find<Bid>()
                    .Match(a => a.AuctionId == auction.ID)
                    .Match(b => b.BidStatus == BidStatus.Accepted)
                    .Sort(x => x.Descending(s => s.Amount))
                    .ExecuteFirstAsync();

                await endpoint.Publish(new AuctionFinished
                {
                    ItemSold = winingBid != null,
                    AuctionId = auction.ID,
                    Winner = winingBid?.Bidder,
                    Amount = winingBid?.Amount,
                    Seller = auction.Seller,
                }, stoppingToken);
            }
        }
    }
}