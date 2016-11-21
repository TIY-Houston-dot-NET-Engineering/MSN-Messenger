using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MSNMessenger.Migrations
{
    public partial class changes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HandleId",
                table: "Chatrooms",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Chatrooms_HandleId",
                table: "Chatrooms",
                column: "HandleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Chatrooms_Handles_HandleId",
                table: "Chatrooms",
                column: "HandleId",
                principalTable: "Handles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chatrooms_Handles_HandleId",
                table: "Chatrooms");

            migrationBuilder.DropIndex(
                name: "IX_Chatrooms_HandleId",
                table: "Chatrooms");

            migrationBuilder.DropColumn(
                name: "HandleId",
                table: "Chatrooms");
        }
    }
}
