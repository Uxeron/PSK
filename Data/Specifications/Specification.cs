namespace Data.Specifications;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Data.Specifications.Interfaces;

class Specification<T> : ISpecification<T>
{
    public List<Expression<Func<T, bool>>> Criteria { get; } = new List<Expression<Func<T, bool>>>();
    public List<Expression<Func<T, object>>> Includes { get; } = new List<Expression<Func<T, object>>>();
    public List<string> IncludeStrings { get; } = new List<string>();
    public Expression<Func<T, object>> OrderBy { get; private set; }
    public Expression<Func<T, object>> OrderByDescending { get; private set; }
    public Expression<Func<T, object>> GroupBy { get; private set; }

    public int Take { get; private set; } = 10;
    public int Skip { get; private set; }
    public bool IsPagingEnabled { get; private set; } = false;

    public virtual void AddCriteria(Expression<Func<T, bool>> criteria)
    {
        Criteria.Add(criteria);
    }
    public virtual void AddInclude(Expression<Func<T, object>> includeExpression)
    {
        Includes.Add(includeExpression);
    }

    public virtual void AddInclude(string includeString)
    {
        IncludeStrings.Add(includeString);
    }

    public virtual void ApplyPaging(int pageNumber, int itemsPerPage)
    {
        Skip = (pageNumber - 1) * itemsPerPage;
        Take = itemsPerPage;
        IsPagingEnabled = true;
    }

    public virtual void ApplyOrderBy(Expression<Func<T, object>> orderByExpression, string direction = "DESC")
    {
        OrderBy = null;
        OrderByDescending = null;
        if (direction.ToUpper() == "ASC")
        {
            OrderBy = orderByExpression;
        }
        else
        {
            OrderByDescending = orderByExpression;
        }
    }

    public virtual void ApplyGroupBy(Expression<Func<T, object>> groupByExpression)
    {
        GroupBy = groupByExpression;
    }
}
