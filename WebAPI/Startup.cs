namespace WebAPI;

using Autofac;
using Autofac.Extras.DynamicProxy;
using Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using WebAPI.Services;
using WebAPI.Services.Interfaces;
using WebAPI.Logger;
using Autofac.Extensions.DependencyInjection;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }
    public ILifetimeScope AutofacContainer { get; private set; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

        }).AddJwtBearer(options =>
        {
            options.Authority = Configuration.GetValue<string>("Auth0:Authority");
            options.Audience = Configuration.GetValue<string>("Auth0:Audience");
            options.RequireHttpsMetadata = false;
        });

        services.AddCors();
        services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        services.AddDbContext<PskContext>();

        services.AddScoped<IItemService, ItemService>();
        services.AddScoped<IAddressService, AddressService>();
        services.AddScoped<IUserService, UserService>();
    }

    public void ConfigureContainer(ContainerBuilder b)
    {
        if (!Configuration.GetValue<bool>("UseLogging"))
        {
            return;
        }

        b.Register(i => new LoggerInterceptor());
        b.RegisterType<ItemService>()
            .AsImplementedInterfaces()
            .EnableInterfaceInterceptors()
            .InterceptedBy(typeof(LoggerInterceptor));
        b.RegisterType<AddressService>()
            .AsImplementedInterfaces()
            .EnableInterfaceInterceptors()
            .InterceptedBy(typeof(LoggerInterceptor));
        b.RegisterType<UserService>()
            .AsImplementedInterfaces()
            .EnableInterfaceInterceptors()
            .InterceptedBy(typeof(LoggerInterceptor));
    }

    public void Configure(IApplicationBuilder app)
    {
        // Configure the HTTP request pipeline.
        app.UseSwagger();
        app.UseSwaggerUI();
        app.UseDeveloperExceptionPage();

        app.UseAuthentication();
        AutofacContainer = app.ApplicationServices.GetAutofacRoot();

        using (var scope = app.ApplicationServices.CreateScope())
        using (var context = scope.ServiceProvider.GetRequiredService<PskContext>())
        context.Database.EnsureCreated();

        app.UseHttpsRedirection();

        app.UseCors(builder =>
        {
            builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
        });

        app.UseRouting();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
