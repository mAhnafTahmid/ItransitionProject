using Microsoft.EntityFrameworkCore;
using backend.Model;

namespace backend.Context;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<UserModel> Users { get; set; }
    public DbSet<TempletModel> Templets { get; set; }
    public DbSet<CommentModel> Comments { get; set; }
    public DbSet<UserAnswerModel> UserAnswers { get; set; }
    public DbSet<TagsModel> Tags { get; set; }
    public DbSet<UserLikedTemplet> UserLikedTemplets { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        //  Unique Email for Users
        modelBuilder.Entity<UserModel>()
            .HasIndex(u => u.Email)
            .IsUnique();

        //  One-to-Many (User → Templets)
        modelBuilder.Entity<UserModel>()
            .HasMany(u => u.Templets)
            .WithOne(t => t.User)
            .HasForeignKey(t => t.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        //  One-to-Many (Templet → Comments)
        modelBuilder.Entity<TempletModel>()
            .HasMany(t => t.Comments)
            .WithOne(c => c.Templet)
            .HasForeignKey(c => c.TempletId)
            .OnDelete(DeleteBehavior.Cascade);


        //  One-to-Many (Templet → UserAnswers)
        modelBuilder.Entity<TempletModel>()
            .HasMany(t => t.Answers)
            .WithOne(a => a.Templet)
            .HasForeignKey(a => a.TempletId)
            .OnDelete(DeleteBehavior.Cascade);


        //  Many-to-Many (Templet ↔ Tags)
        modelBuilder.Entity<TempletModel>()
            .HasMany(t => t.Tags)
            .WithMany(tg => tg.Templets)
            .UsingEntity(j => j.ToTable("TempletTags"));

        //  Ensure Tags are Unique
        modelBuilder.Entity<TagsModel>()
            .HasIndex(t => t.Name)
            .IsUnique();

        //  Prevent duplicate likes per user
        modelBuilder.Entity<UserLikedTemplet>()
            .HasIndex(ul => new { ul.UserId, ul.TempletId })
            .IsUnique();

        //  Add a Search Vector Column for Full-Text Search
        modelBuilder.Entity<TempletModel>()
            .Property(t => t.SearchVector)
            .HasColumnType("tsvector")
            .HasComputedColumnSql(
                "setweight(to_tsvector('english', coalesce(\"Title\", '')), 'A') || " +
                "setweight(to_tsvector('english', coalesce(\"Description\", '')), 'B') || " +
                "setweight(to_tsvector('english', coalesce(\"Topic\", '')), 'C') || " +

                // Single-Line Questions
                "setweight(to_tsvector('english', coalesce(\"String1Question\", '')), 'D') || " +
                "setweight(to_tsvector('english', coalesce(\"String2Question\", '')), 'D') || " +
                "setweight(to_tsvector('english', coalesce(\"String3Question\", '')), 'D') || " +
                "setweight(to_tsvector('english', coalesce(\"String4Question\", '')), 'D') || " +

                // Multi-Line Questions
                "setweight(to_tsvector('english', coalesce(\"Text1Question\", '')), 'D') || " +
                "setweight(to_tsvector('english', coalesce(\"Text2Question\", '')), 'D') || " +
                "setweight(to_tsvector('english', coalesce(\"Text3Question\", '')), 'D') || " +
                "setweight(to_tsvector('english', coalesce(\"Text4Question\", '')), 'D') || " +

                // Integer Questions
                "setweight(to_tsvector('english', coalesce(\"Int1Question\", '')), 'D') || " +
                "setweight(to_tsvector('english', coalesce(\"Int2Question\", '')), 'D') || " +
                "setweight(to_tsvector('english', coalesce(\"Int3Question\", '')), 'D') || " +
                "setweight(to_tsvector('english', coalesce(\"Int4Question\", '')), 'D') || " +

                // Checkbox Questions
                "setweight(to_tsvector('english', coalesce(\"Checkbox1Question\", '')), 'D') || " +
                "setweight(to_tsvector('english', coalesce(\"Checkbox2Question\", '')), 'D') || " +
                "setweight(to_tsvector('english', coalesce(\"Checkbox3Question\", '')), 'D') || " +
                "setweight(to_tsvector('english', coalesce(\"Checkbox4Question\", '')), 'D') || " +

                // Checkbox Options
                "setweight(to_tsvector('english', coalesce(\"Checkbox1Option1\", '')), 'D') || " +
                "setweight(to_tsvector('english', coalesce(\"Checkbox1Option2\", '')), 'D') || " +
                "setweight(to_tsvector('english', coalesce(\"Checkbox1Option3\", '')), 'D') || " +
                "setweight(to_tsvector('english', coalesce(\"Checkbox1Option4\", '')), 'D') || " +

                "setweight(to_tsvector('english', coalesce(\"Checkbox2Option1\", '')), 'D') || " +
                "setweight(to_tsvector('english', coalesce(\"Checkbox2Option2\", '')), 'D') || " +
                "setweight(to_tsvector('english', coalesce(\"Checkbox2Option3\", '')), 'D') || " +
                "setweight(to_tsvector('english', coalesce(\"Checkbox2Option4\", '')), 'D') || " +

                "setweight(to_tsvector('english', coalesce(\"Checkbox3Option1\", '')), 'D') || " +
                "setweight(to_tsvector('english', coalesce(\"Checkbox3Option2\", '')), 'D') || " +
                "setweight(to_tsvector('english', coalesce(\"Checkbox3Option3\", '')), 'D') || " +
                "setweight(to_tsvector('english', coalesce(\"Checkbox3Option4\", '')), 'D') || " +

                "setweight(to_tsvector('english', coalesce(\"Checkbox4Option1\", '')), 'D') || " +
                "setweight(to_tsvector('english', coalesce(\"Checkbox4Option2\", '')), 'D') || " +
                "setweight(to_tsvector('english', coalesce(\"Checkbox4Option3\", '')), 'D') || " +
                "setweight(to_tsvector('english', coalesce(\"Checkbox4Option4\", '')), 'D')",
                stored: true
            );

        modelBuilder.Entity<TempletModel>()
            .HasIndex(t => t.SearchVector)
            .HasMethod("GIN");
    }
}
