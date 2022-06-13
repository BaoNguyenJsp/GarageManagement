using Core.Exceptions;
using System.Net;

namespace GarageAPI.Constants
{
    public static class ParkingResponseConstants
    {
        // These data should retrived from database. Other errors can be stored in database.
        public static readonly ErrorResponse ParkingLevelIsInUse = new()
        {
            Error = "400_parkinglevelisinuse",
            StatusCode = HttpStatusCode.BadRequest,
            Message = "The parking level is in use.",
            Detail = "The parking level is in use. Please take all vehicals out of this level before continue."
        };

        public static readonly ErrorResponse CardInUse = new()
        {
            Error = "400_cardinuse",
            StatusCode = HttpStatusCode.BadRequest,
            Message = "The card is in use.",
            Detail = "The card is in use for other vehical which is parking. Please use another card to continue."
        };

        public static readonly ErrorResponse LicensePlateInUse = new()
        {
            Error = "400_licenseplateinuse",
            StatusCode = HttpStatusCode.BadRequest,
            Message = "The license plate is exist in the garage.",
            Detail = "The license plate is exist in the garage."
        };

        public static readonly ErrorResponse GarageIsFull = new()
        {
            Error = "400_garageisfull",
            StatusCode = HttpStatusCode.BadRequest,
            Message = "The garage is full.",
            Detail = "The garage is full. Sorry and please come back later."
        };
    }
}
