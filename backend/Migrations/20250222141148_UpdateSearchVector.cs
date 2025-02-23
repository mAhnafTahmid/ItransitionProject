using Microsoft.EntityFrameworkCore.Migrations;
using NpgsqlTypes;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSearchVector : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<NpgsqlTsVector>(
                name: "SearchVector",
                table: "Templets",
                type: "tsvector",
                nullable: true,
                computedColumnSql: "setweight(to_tsvector('english', coalesce(\"Title\", '')), 'A') || setweight(to_tsvector('english', coalesce(\"Description\", '')), 'B') || setweight(to_tsvector('english', coalesce(\"Topic\", '')), 'C') || setweight(to_tsvector('english', coalesce(\"String1Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"String2Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"String3Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"String4Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Text1Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Text2Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Text3Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Text4Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Int1Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Int2Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Int3Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Int4Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox1Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox2Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox3Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox4Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox1Option1\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox1Option2\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox1Option3\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox1Option4\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox2Option1\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox2Option2\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox2Option3\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox2Option4\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox3Option1\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox3Option2\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox3Option3\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox3Option4\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox4Option1\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox4Option2\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox4Option3\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox4Option4\", '')), 'D')",
                stored: true,
                oldClrType: typeof(NpgsqlTsVector),
                oldType: "tsvector",
                oldNullable: true,
                oldComputedColumnSql: "setweight(to_tsvector('english', coalesce(\"Title\", '')), 'A') || setweight(to_tsvector('english', coalesce(\"Description\", '')), 'B') || setweight(to_tsvector('english', coalesce(\"Topic\", '')), 'C')",
                oldStored: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<NpgsqlTsVector>(
                name: "SearchVector",
                table: "Templets",
                type: "tsvector",
                nullable: true,
                computedColumnSql: "setweight(to_tsvector('english', coalesce(\"Title\", '')), 'A') || setweight(to_tsvector('english', coalesce(\"Description\", '')), 'B') || setweight(to_tsvector('english', coalesce(\"Topic\", '')), 'C')",
                stored: true,
                oldClrType: typeof(NpgsqlTsVector),
                oldType: "tsvector",
                oldNullable: true,
                oldComputedColumnSql: "setweight(to_tsvector('english', coalesce(\"Title\", '')), 'A') || setweight(to_tsvector('english', coalesce(\"Description\", '')), 'B') || setweight(to_tsvector('english', coalesce(\"Topic\", '')), 'C') || setweight(to_tsvector('english', coalesce(\"String1Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"String2Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"String3Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"String4Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Text1Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Text2Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Text3Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Text4Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Int1Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Int2Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Int3Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Int4Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox1Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox2Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox3Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox4Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox1Option1\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox1Option2\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox1Option3\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox1Option4\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox2Option1\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox2Option2\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox2Option3\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox2Option4\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox3Option1\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox3Option2\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox3Option3\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox3Option4\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox4Option1\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox4Option2\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox4Option3\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox4Option4\", '')), 'D')",
                oldStored: true);
        }
    }
}
