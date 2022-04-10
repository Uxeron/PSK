namespace Data.Wrappers;
public class Paged<T>
{
    public class PagingInfo
    {
        public int Page { get; set; }
        public int NumOfPages { get; set; }
        public int TotalItems { get; set; }
        public int ItemsPerPage { get; set; }
    }

    public PagingInfo Paging { get; set; }
    public IEnumerable<T> Items { get; set; }

    public Paged(IEnumerable<T> items, int pageNumber, int numOfItems, int pageSize)
    {
        int totalPages = Math.Max((int)Math.Ceiling((double)numOfItems / pageSize), 1);
        Items = items;
        Paging = new PagingInfo { Page = pageNumber, TotalItems = numOfItems, NumOfPages = totalPages, ItemsPerPage = pageSize };
    }
}
