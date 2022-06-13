using Core.Exceptions;
using System.Net;

namespace GarageAPI.Constants
{
    public static class ErrorResponseConstants
    {
        // These data should retrived from database. Other errors can be stored in database.
        public static readonly ErrorResponse InternalServerError = new()
        {
            Error = "500_internalservererror",
            StatusCode = HttpStatusCode.InternalServerError,
            Message = "There is something wrong happens",
            Detail = "There is something wrong happens. Please try again. If it doesn't work, please contact with us."
        };

        public static readonly ErrorResponse NotFound = new()
        {
            Error = "400_notfound",
            StatusCode = HttpStatusCode.NotFound,
            Message = "Data not found",
            Detail = "Data not found. Please try with another input."
        };
    }
}
