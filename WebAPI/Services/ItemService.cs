﻿namespace WebAPI.Services;

using Data;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using WebAPI.Services.Interfaces;

public class ItemService : IItemService
{
    private readonly PskContext _context;
    private readonly IUserService _userService;
    private readonly IAddressService _addressService;

    public ItemService(PskContext context, IUserService userService, IAddressService addressService)
    {
        _context = context;
        _userService = userService;
        _addressService = addressService;
    }

    public async Task<Guid> CreateItem(PartialItem partialItem)
    {
        Item item = BuildItemEntity(partialItem);

        await _context.Items.AddAsync(item);
        await _context.SaveChangesAsync();

        return item.ItemId;
    }

    private Item BuildItemEntity(PartialItem partialItem)    
    {
        Item itemEntity = new Item();

        itemEntity.Name = partialItem.Name;
        itemEntity.Address = _addressService.GetAddress(partialItem.AddressId).Result;
        itemEntity.Description = partialItem.Description;
        itemEntity.Condition = partialItem.Condition;
        itemEntity.Category = partialItem.Category;
        itemEntity.IsToGiveAway = partialItem.IsToGiveAway;
        itemEntity.User = _userService.GetUser(partialItem.AddressId).Result;
        itemEntity.UploadDate = DateTime.Now;

        // itemEntity.Images = partialItem.Images; // TODO: PSK-50

        return itemEntity;
    }

    public async Task CreateItem(Item item)
    {
        await _context.Items.AddAsync(item);
        await _context.SaveChangesAsync();
    }

    public async Task<Item?> GetItem(Guid id)
    {
        return await _context.Items.Where(i => i.ItemId == id).FirstOrDefaultAsync();
    }
}
