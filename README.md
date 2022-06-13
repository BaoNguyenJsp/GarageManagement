# GarageManagement
Manage Garage and Parking. Using .NET 5 and Angular 12

## Structure
- Server: .NET 5 WebAPI
- Client: Angular 12
- Database: SQLServer

## Requirements
- npm
```
Follow instruction in https://nodejs.org/en/download/
```

- Angular CLI
```
Follow instruction in https://angular.io/guide/setup-local
```

- Dotnet CLI (Optional if you run with Visual Studio) and .NET 5 SDK
```
Follow instruction in https://dotnet.microsoft.com/en-us/download/dotnet/5.
```

- EF Core Tool (Optional if you run with Visual Studio)
```
Follow instruction in https://docs.microsoft.com/en-us/ef/core/cli/dotnet
```

- SQL Server
```
Follow instruction in https://www.microsoft.com/en-gb/sql-server/sql-server-downloads
```

## Installation
- Angular
```
cd .\client\

npm install
```
- .NET
```
cd .\server\

dotnet build

dotnet ef database update --project .\GarageAPI\GarageAPI.csproj
```

## Run
- Angular
```
cd .\client\

ng serve -o
```
- .NET
```
cd .\server\

dotnet run --project .\GarageAPI\GarageAPI.csproj
```

## Test
- Angular (Not implemented yet)
```
cd .\client\

ng test
```
- .NET
```
cd .\server\

dotnet test .\GarageAPI.Test\GarageAPI.Test.csproj
```

## Note
- If you do not use dotnet CLI, the API Url may be different with the config in client side. Please update baseApiUrl in environment.ts file with the running server api if it happens.
- Use Guideline in docs folder to see the features and the expected error messages.
