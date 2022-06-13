using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GarageAPI.Migrations
{
    public partial class InitMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ParkingLevels",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AvailableCarSpaces = table.Column<int>(type: "int", nullable: false),
                    AvailableMotorbikeSpaces = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParkingLevels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ParkingLogs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CardId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ParkingLevelId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ParkingSpaceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ParkingSlot = table.Column<int>(type: "int", nullable: false),
                    LicensePlate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VehicalType = table.Column<int>(type: "int", nullable: false),
                    ParkTime = table.Column<long>(type: "bigint", nullable: false),
                    LeaveTime = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParkingLogs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ParkingSpaces",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ParkingSlot = table.Column<int>(type: "int", nullable: false),
                    VehicalType = table.Column<int>(type: "int", nullable: false),
                    ParkingLevelId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParkingSpaces", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ParkingSpaces_ParkingLevels_ParkingLevelId",
                        column: x => x.ParkingLevelId,
                        principalTable: "ParkingLevels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ParkingSpaces_ParkingLevelId",
                table: "ParkingSpaces",
                column: "ParkingLevelId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ParkingLogs");

            migrationBuilder.DropTable(
                name: "ParkingSpaces");

            migrationBuilder.DropTable(
                name: "ParkingLevels");
        }
    }
}
