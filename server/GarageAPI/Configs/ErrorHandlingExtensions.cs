using GarageAPI.Constants;
using Core.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace GarageAPI.Configs
{
    public class HttpExceptionGlobalFilter : IExceptionFilter
    {
        private readonly ILogger<HttpExceptionGlobalFilter> _logger;

        public HttpExceptionGlobalFilter(ILogger<HttpExceptionGlobalFilter> logger)
        {
            _logger = logger;
        }

        public void OnException(ExceptionContext context)
        {
            _logger.LogError(new EventId(context.Exception.HResult), context.Exception, context.Exception.Message);

            if (context.Exception.GetType() == typeof(CustomException))
            {
                context.Result = new ObjectResult((context.Exception as CustomException).Error);
            }
            else
            {
                context.Result = new ObjectResult(ErrorResponseConstants.InternalServerError);
            }
            context.HttpContext.Response.StatusCode = (int)(context.Exception as CustomException).Error.StatusCode;
        }
    }
}
