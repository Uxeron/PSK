namespace Data;

using Data.Models;
using Microsoft.EntityFrameworkCore;

public class PskContext : DbContext
{
    public DbSet<Item> Items => Set<Item>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Image> Images => Set<Image>();
    public DbSet<Address> Address => Set<Address>();

    public string DbPath { get; }

    public PskContext()
    {
        // Will create the DB in your %localappdata% folder
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = Path.Join(path, "psk.db");
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");
}
