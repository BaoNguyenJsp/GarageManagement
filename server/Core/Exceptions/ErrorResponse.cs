using System.Net;

namespace Core.Exceptions
{
    public class ErrorResponse
    {
        public string Error { get; set; }
        public HttpStatusCode StatusCode { get; set; }
        public string Message { get; set; }
        public string Detail { get; set; }
    }
}
