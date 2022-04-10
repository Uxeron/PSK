namespace Data.Models;

using Data.Enums;

public class UploadedBefore
{
    public UploadedBefore(UploadedBeforeDateType dateType, int amount)
    {
        DateType = dateType;
        Amount = amount;
    }
    public UploadedBeforeDateType DateType;
    public int Amount;
}
