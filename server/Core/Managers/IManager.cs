using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Core.Manager
{
    public interface IManager<T> where T : class 
    {
        IQueryable<T> Query(Expression<Func<T, bool>> filter = null);

        void Add(T entity);

        void Add(IEnumerable<T> entity);

        void Update(T entity);

        void Update(IEnumerable<T> entity);

        void Remove(T entity);

        void Remove(IEnumerable<T> entity);
    }
}
