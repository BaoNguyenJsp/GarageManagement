using System;

namespace Core.Exceptions
{
    public class CustomException : Exception
    {
        public CustomException(ErrorResponse error)
        {
            Error = error;
        }

        public ErrorResponse Error { get; set; } 
    }
}
