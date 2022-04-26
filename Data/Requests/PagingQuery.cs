namespace SFKR.Request;

public class PagingQuery
{
    private const int MAX_ITEMS_PER_PAGE = 40;
    public int Page { get; set; } = 1;
    private int itemsPerPage = 10;
    public int ItemsPerPage 
    { 
        get { return itemsPerPage; }
        set { if (value > 0 && value <= MAX_ITEMS_PER_PAGE) itemsPerPage = value; } 
    }
}
