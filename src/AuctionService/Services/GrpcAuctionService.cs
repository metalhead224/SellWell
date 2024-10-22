using AuctionService.Data;
using Grpc.Core;

namespace AuctionService.Services;

public class GrpcAuctionService : GrpcAuction.GrpcAuctionBase
{
    private readonly AuctionDbContext _dbContext;
    public GrpcAuctionService(AuctionDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override async Task<GrpcAuctionResponse> GetAuction(GetAuctionRequest request,
        ServerCallContext context)
    {
        Console.WriteLine("====> Received Grpc request for auction");

        var auction = await _dbContext.Auctions.FindAsync(Guid.Parse(request.Id))
            ?? throw new RpcException(new Status(StatusCode.NotFound, "Not Found"));

        var response = new GrpcAuctionResponse
        { 
            //here we nest GrpcAuctionModel inside it as it is nested in auctions.proto file
            Auction = new GrpcAuctionModel
            {
                Id = auction.Id.ToString(),
                AuctionEnd = auction.AuctionEnd.ToString(), //we are changing it to string because in grpc there is no parsing for date
                ReservePrice = auction.ReservePrice,
                Seller = auction.Seller,
            }
        };

        return response;
    }
}
