using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using NpgsqlTypes;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class initialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Templets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: true),
                    Likes = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Topic = table.Column<string>(type: "text", nullable: false),
                    IsPublic = table.Column<bool>(type: "boolean", nullable: false),
                    AccessList = table.Column<List<int>>(type: "integer[]", nullable: false),
                    SearchVector = table.Column<NpgsqlTsVector>(type: "tsvector", nullable: true, computedColumnSql: "setweight(to_tsvector('english', coalesce(\"Title\", '')), 'A') || setweight(to_tsvector('english', coalesce(\"Description\", '')), 'B') || setweight(to_tsvector('english', coalesce(\"Topic\", '')), 'C')", stored: true),
                    String1State = table.Column<bool>(type: "boolean", nullable: false),
                    String1Question = table.Column<string>(type: "text", nullable: true),
                    String2State = table.Column<bool>(type: "boolean", nullable: false),
                    String2Question = table.Column<string>(type: "text", nullable: true),
                    String3State = table.Column<bool>(type: "boolean", nullable: false),
                    String3Question = table.Column<string>(type: "text", nullable: true),
                    String4State = table.Column<bool>(type: "boolean", nullable: false),
                    String4Question = table.Column<string>(type: "text", nullable: true),
                    Text1State = table.Column<bool>(type: "boolean", nullable: false),
                    Text1Question = table.Column<string>(type: "text", nullable: true),
                    Text2State = table.Column<bool>(type: "boolean", nullable: false),
                    Text2Question = table.Column<string>(type: "text", nullable: true),
                    Text3State = table.Column<bool>(type: "boolean", nullable: false),
                    Text3Question = table.Column<string>(type: "text", nullable: true),
                    Text4State = table.Column<bool>(type: "boolean", nullable: false),
                    Text4Question = table.Column<string>(type: "text", nullable: true),
                    Int1State = table.Column<bool>(type: "boolean", nullable: false),
                    Int1Question = table.Column<string>(type: "text", nullable: true),
                    Int2State = table.Column<bool>(type: "boolean", nullable: false),
                    Int2Question = table.Column<string>(type: "text", nullable: true),
                    Int3State = table.Column<bool>(type: "boolean", nullable: false),
                    Int3Question = table.Column<string>(type: "text", nullable: true),
                    Int4State = table.Column<bool>(type: "boolean", nullable: false),
                    Int4Question = table.Column<string>(type: "text", nullable: true),
                    Checkbox1State = table.Column<bool>(type: "boolean", nullable: false),
                    Checkbox1Question = table.Column<string>(type: "text", nullable: true),
                    Checkbox1Option1 = table.Column<string>(type: "text", nullable: true),
                    Checkbox1Option2 = table.Column<string>(type: "text", nullable: true),
                    Checkbox1Option3 = table.Column<string>(type: "text", nullable: true),
                    Checkbox1Option4 = table.Column<string>(type: "text", nullable: true),
                    Checkbox2State = table.Column<bool>(type: "boolean", nullable: false),
                    Checkbox2Question = table.Column<string>(type: "text", nullable: true),
                    Checkbox2Option1 = table.Column<string>(type: "text", nullable: true),
                    Checkbox2Option2 = table.Column<string>(type: "text", nullable: true),
                    Checkbox2Option3 = table.Column<string>(type: "text", nullable: true),
                    Checkbox2Option4 = table.Column<string>(type: "text", nullable: true),
                    Checkbox3State = table.Column<bool>(type: "boolean", nullable: false),
                    Checkbox3Question = table.Column<string>(type: "text", nullable: true),
                    Checkbox3Option1 = table.Column<string>(type: "text", nullable: true),
                    Checkbox3Option2 = table.Column<string>(type: "text", nullable: true),
                    Checkbox3Option3 = table.Column<string>(type: "text", nullable: true),
                    Checkbox3Option4 = table.Column<string>(type: "text", nullable: true),
                    Checkbox4State = table.Column<bool>(type: "boolean", nullable: false),
                    Checkbox4Question = table.Column<string>(type: "text", nullable: true),
                    Checkbox4Option1 = table.Column<string>(type: "text", nullable: true),
                    Checkbox4Option2 = table.Column<string>(type: "text", nullable: true),
                    Checkbox4Option3 = table.Column<string>(type: "text", nullable: true),
                    Checkbox4Option4 = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Templets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Templets_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Comment = table.Column<string>(type: "text", nullable: false),
                    TempletId = table.Column<int>(type: "integer", nullable: false),
                    Likes = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comments_Templets_TempletId",
                        column: x => x.TempletId,
                        principalTable: "Templets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TempletTags",
                columns: table => new
                {
                    TagsId = table.Column<int>(type: "integer", nullable: false),
                    TempletsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TempletTags", x => new { x.TagsId, x.TempletsId });
                    table.ForeignKey(
                        name: "FK_TempletTags_Tags_TagsId",
                        column: x => x.TagsId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TempletTags_Templets_TempletsId",
                        column: x => x.TempletsId,
                        principalTable: "Templets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserAnswers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    TempletId = table.Column<int>(type: "integer", nullable: false),
                    String1State = table.Column<bool>(type: "boolean", nullable: false),
                    String1Answer = table.Column<string>(type: "text", nullable: true),
                    String2State = table.Column<bool>(type: "boolean", nullable: false),
                    String2Answer = table.Column<string>(type: "text", nullable: true),
                    String3State = table.Column<bool>(type: "boolean", nullable: false),
                    String3Answer = table.Column<string>(type: "text", nullable: true),
                    String4State = table.Column<bool>(type: "boolean", nullable: false),
                    String4Answer = table.Column<string>(type: "text", nullable: true),
                    Text1State = table.Column<bool>(type: "boolean", nullable: false),
                    Text1Answer = table.Column<string>(type: "text", nullable: true),
                    Text2State = table.Column<bool>(type: "boolean", nullable: false),
                    Text2Answer = table.Column<string>(type: "text", nullable: true),
                    Text3State = table.Column<bool>(type: "boolean", nullable: false),
                    Text3Answer = table.Column<string>(type: "text", nullable: true),
                    Text4State = table.Column<bool>(type: "boolean", nullable: false),
                    Text4Answer = table.Column<string>(type: "text", nullable: true),
                    Int1State = table.Column<bool>(type: "boolean", nullable: false),
                    Int1Answer = table.Column<int>(type: "integer", nullable: true),
                    Int2State = table.Column<bool>(type: "boolean", nullable: false),
                    Int2Answer = table.Column<int>(type: "integer", nullable: true),
                    Int3State = table.Column<bool>(type: "boolean", nullable: false),
                    Int3Answer = table.Column<int>(type: "integer", nullable: true),
                    Int4State = table.Column<bool>(type: "boolean", nullable: false),
                    Int4Answer = table.Column<int>(type: "integer", nullable: true),
                    Checkbox1State = table.Column<bool>(type: "boolean", nullable: false),
                    Checkbox1Answer = table.Column<int>(type: "integer", nullable: true),
                    Checkbox2State = table.Column<bool>(type: "boolean", nullable: false),
                    Checkbox2Answer = table.Column<int>(type: "integer", nullable: true),
                    Checkbox3State = table.Column<bool>(type: "boolean", nullable: false),
                    Checkbox3Answer = table.Column<int>(type: "integer", nullable: true),
                    Checkbox4State = table.Column<bool>(type: "boolean", nullable: false),
                    Checkbox4Answer = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAnswers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserAnswers_Templets_TempletId",
                        column: x => x.TempletId,
                        principalTable: "Templets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserAnswers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserLikedTemplets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    TempletId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLikedTemplets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserLikedTemplets_Templets_TempletId",
                        column: x => x.TempletId,
                        principalTable: "Templets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserLikedTemplets_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Comments_TempletId",
                table: "Comments",
                column: "TempletId");

            migrationBuilder.CreateIndex(
                name: "IX_Tags_Name",
                table: "Tags",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Templets_SearchVector",
                table: "Templets",
                column: "SearchVector")
                .Annotation("Npgsql:IndexMethod", "GIN");

            migrationBuilder.CreateIndex(
                name: "IX_Templets_UserId",
                table: "Templets",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_TempletTags_TempletsId",
                table: "TempletTags",
                column: "TempletsId");

            migrationBuilder.CreateIndex(
                name: "IX_UserAnswers_TempletId",
                table: "UserAnswers",
                column: "TempletId");

            migrationBuilder.CreateIndex(
                name: "IX_UserAnswers_UserId",
                table: "UserAnswers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserLikedTemplets_TempletId",
                table: "UserLikedTemplets",
                column: "TempletId");

            migrationBuilder.CreateIndex(
                name: "IX_UserLikedTemplets_UserId_TempletId",
                table: "UserLikedTemplets",
                columns: new[] { "UserId", "TempletId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "TempletTags");

            migrationBuilder.DropTable(
                name: "UserAnswers");

            migrationBuilder.DropTable(
                name: "UserLikedTemplets");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropTable(
                name: "Templets");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
