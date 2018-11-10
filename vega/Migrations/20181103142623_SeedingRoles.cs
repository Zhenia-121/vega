using Microsoft.EntityFrameworkCore.Migrations;

namespace vega.Migrations
{
    public partial class SeedingRoles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO AspNetRoles (Id, Name) VALUES (1, 'user')");
            migrationBuilder.Sql("INSERT INTO AspNetRoles (Id, Name) VALUES (2, 'admin')");            
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
