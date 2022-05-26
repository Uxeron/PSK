namespace WebAPI.Logger;

using System.Security.Claims;
using Castle.DynamicProxy;
using Microsoft.Extensions.Logging;

class LoggerInterceptor : IInterceptor
{
    private string path;
    private const int NumberOfRetries = 5;
    string textToWrite = "";

    public LoggerInterceptor()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        this.path = Path.Join(path, "logger.txt");
    }

    public void Intercept(IInvocation invocation)
    {
        List<object> arguments = invocation.Arguments.ToList();
        if(arguments[0] == null)
        {
            return;
        }
        var properties = arguments[0].GetType().GetProperties();
        var userIdProperty = arguments.Where(x => x != null)
                                      .SelectMany(arg => arg.GetType().GetProperties())
                                      .FirstOrDefault(val => val.Name == "UserId")?.GetValue(arguments[0]);
        if (userIdProperty == null)
        {
            userIdProperty = arguments[0];
        }

        var timestamp = DateTime.Now;
        invocation.Proceed();

        textToWrite = $"UserId { userIdProperty ?? string.Empty} $Timestamp {timestamp} $Method and Class {invocation.Method.DeclaringType} {invocation.Method.Name}";
        for (int i = 1; i <= NumberOfRetries; ++i)
        {
            try
            {
                using StreamWriter sw = File.AppendText(path);
                sw.WriteLine(textToWrite);
                sw.Close();
                break;
            }
            catch (IOException e) when (i <= NumberOfRetries)
            {
            }
        }
    }
}
