# PSK
University project for the PSK lecture

## Frontend
Made with [React](https://reactjs.org/ "React's Homepage") using [Typescript](https://www.typescriptlang.org/ "Typescript's Homepage"). For handling CSS we are using [Tailwind](https://tailwindcss.com/ "Tailwinds's Homepage") and as a basis for its UI components - [MerakiUI](https://merakiui.com/ "MerakiUI's Homepage"). _(More information will be added as the development progresses)_

To start the application locally, run `npm install` and `npm start`. (Make sure you have [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed on your machine)

FE was created using `create-react-app --template typescript`.

## Backend
### Technologies used
* C# 10 on the .NET6 framework
* ASP.NET - Web API
* Entity Framework Core - Database data access framework
* SQLite - Database

### Development setup
* Install Visual Studio 2022
* On first launch select and install the "ASP.NET and web development" workload
* Open command prompt in VS (Tools -> Command Line -> Developer Powershell)
* Execute command `dotnet tool install --global dotnet-ef`

### General development info
Running the WebAPI:
* If not selected, select the "WebAPI" startup project at the top of VS
* Press F5 to run the project

Database migration - after updating the database models, add and execute a new migration:
* Open command prompt in VS (Tools -> Command Line -> Developer Powershell)
* `cd Data` - change directory to our Data project, need to be here to work with migrations
* `dotnet ef migrations add MigrationName` - add new migration
* `dotnet ef migrations remove` - remove last added migration
* `dotnet ef database update` - update/create database with all migrations
