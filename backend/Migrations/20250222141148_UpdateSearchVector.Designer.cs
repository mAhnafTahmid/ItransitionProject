﻿// <auto-generated />
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using NpgsqlTypes;
using backend.Context;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20250222141148_UpdateSearchVector")]
    partial class UpdateSearchVector
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("TagsModelTempletModel", b =>
                {
                    b.Property<int>("TagsId")
                        .HasColumnType("integer");

                    b.Property<int>("TempletsId")
                        .HasColumnType("integer");

                    b.HasKey("TagsId", "TempletsId");

                    b.HasIndex("TempletsId");

                    b.ToTable("TempletTags", (string)null);
                });

            modelBuilder.Entity("backend.Model.CommentModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Comment")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Likes")
                        .HasColumnType("integer");

                    b.Property<int>("TempletId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("TempletId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("backend.Model.TagsModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("backend.Model.TempletModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.PrimitiveCollection<List<string>>("AccessList")
                        .IsRequired()
                        .HasColumnType("text[]");

                    b.Property<string>("Checkbox1Option1")
                        .HasColumnType("text");

                    b.Property<string>("Checkbox1Option2")
                        .HasColumnType("text");

                    b.Property<string>("Checkbox1Option3")
                        .HasColumnType("text");

                    b.Property<string>("Checkbox1Option4")
                        .HasColumnType("text");

                    b.Property<string>("Checkbox1Question")
                        .HasColumnType("text");

                    b.Property<bool>("Checkbox1State")
                        .HasColumnType("boolean");

                    b.Property<string>("Checkbox2Option1")
                        .HasColumnType("text");

                    b.Property<string>("Checkbox2Option2")
                        .HasColumnType("text");

                    b.Property<string>("Checkbox2Option3")
                        .HasColumnType("text");

                    b.Property<string>("Checkbox2Option4")
                        .HasColumnType("text");

                    b.Property<string>("Checkbox2Question")
                        .HasColumnType("text");

                    b.Property<bool>("Checkbox2State")
                        .HasColumnType("boolean");

                    b.Property<string>("Checkbox3Option1")
                        .HasColumnType("text");

                    b.Property<string>("Checkbox3Option2")
                        .HasColumnType("text");

                    b.Property<string>("Checkbox3Option3")
                        .HasColumnType("text");

                    b.Property<string>("Checkbox3Option4")
                        .HasColumnType("text");

                    b.Property<string>("Checkbox3Question")
                        .HasColumnType("text");

                    b.Property<bool>("Checkbox3State")
                        .HasColumnType("boolean");

                    b.Property<string>("Checkbox4Option1")
                        .HasColumnType("text");

                    b.Property<string>("Checkbox4Option2")
                        .HasColumnType("text");

                    b.Property<string>("Checkbox4Option3")
                        .HasColumnType("text");

                    b.Property<string>("Checkbox4Option4")
                        .HasColumnType("text");

                    b.Property<string>("Checkbox4Question")
                        .HasColumnType("text");

                    b.Property<bool>("Checkbox4State")
                        .HasColumnType("boolean");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("text");

                    b.Property<string>("Int1Question")
                        .HasColumnType("text");

                    b.Property<bool>("Int1State")
                        .HasColumnType("boolean");

                    b.Property<string>("Int2Question")
                        .HasColumnType("text");

                    b.Property<bool>("Int2State")
                        .HasColumnType("boolean");

                    b.Property<string>("Int3Question")
                        .HasColumnType("text");

                    b.Property<bool>("Int3State")
                        .HasColumnType("boolean");

                    b.Property<string>("Int4Question")
                        .HasColumnType("text");

                    b.Property<bool>("Int4State")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsPublic")
                        .HasColumnType("boolean");

                    b.Property<int>("Likes")
                        .HasColumnType("integer");

                    b.Property<NpgsqlTsVector>("SearchVector")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("tsvector")
                        .HasComputedColumnSql("setweight(to_tsvector('english', coalesce(\"Title\", '')), 'A') || setweight(to_tsvector('english', coalesce(\"Description\", '')), 'B') || setweight(to_tsvector('english', coalesce(\"Topic\", '')), 'C') || setweight(to_tsvector('english', coalesce(\"String1Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"String2Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"String3Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"String4Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Text1Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Text2Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Text3Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Text4Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Int1Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Int2Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Int3Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Int4Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox1Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox2Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox3Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox4Question\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox1Option1\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox1Option2\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox1Option3\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox1Option4\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox2Option1\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox2Option2\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox2Option3\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox2Option4\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox3Option1\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox3Option2\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox3Option3\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox3Option4\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox4Option1\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox4Option2\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox4Option3\", '')), 'D') || setweight(to_tsvector('english', coalesce(\"Checkbox4Option4\", '')), 'D')", true);

                    b.Property<string>("String1Question")
                        .HasColumnType("text");

                    b.Property<bool>("String1State")
                        .HasColumnType("boolean");

                    b.Property<string>("String2Question")
                        .HasColumnType("text");

                    b.Property<bool>("String2State")
                        .HasColumnType("boolean");

                    b.Property<string>("String3Question")
                        .HasColumnType("text");

                    b.Property<bool>("String3State")
                        .HasColumnType("boolean");

                    b.Property<string>("String4Question")
                        .HasColumnType("text");

                    b.Property<bool>("String4State")
                        .HasColumnType("boolean");

                    b.Property<string>("Text1Question")
                        .HasColumnType("text");

                    b.Property<bool>("Text1State")
                        .HasColumnType("boolean");

                    b.Property<string>("Text2Question")
                        .HasColumnType("text");

                    b.Property<bool>("Text2State")
                        .HasColumnType("boolean");

                    b.Property<string>("Text3Question")
                        .HasColumnType("text");

                    b.Property<bool>("Text3State")
                        .HasColumnType("boolean");

                    b.Property<string>("Text4Question")
                        .HasColumnType("text");

                    b.Property<bool>("Text4State")
                        .HasColumnType("boolean");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Topic")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("SearchVector");

                    NpgsqlIndexBuilderExtensions.HasMethod(b.HasIndex("SearchVector"), "GIN");

                    b.HasIndex("UserId");

                    b.ToTable("Templets");
                });

            modelBuilder.Entity("backend.Model.UserAnswerModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("Checkbox1Answer")
                        .HasColumnType("integer");

                    b.Property<bool>("Checkbox1State")
                        .HasColumnType("boolean");

                    b.Property<int?>("Checkbox2Answer")
                        .HasColumnType("integer");

                    b.Property<bool>("Checkbox2State")
                        .HasColumnType("boolean");

                    b.Property<int?>("Checkbox3Answer")
                        .HasColumnType("integer");

                    b.Property<bool>("Checkbox3State")
                        .HasColumnType("boolean");

                    b.Property<int?>("Checkbox4Answer")
                        .HasColumnType("integer");

                    b.Property<bool>("Checkbox4State")
                        .HasColumnType("boolean");

                    b.Property<int?>("Int1Answer")
                        .HasColumnType("integer");

                    b.Property<bool>("Int1State")
                        .HasColumnType("boolean");

                    b.Property<int?>("Int2Answer")
                        .HasColumnType("integer");

                    b.Property<bool>("Int2State")
                        .HasColumnType("boolean");

                    b.Property<int?>("Int3Answer")
                        .HasColumnType("integer");

                    b.Property<bool>("Int3State")
                        .HasColumnType("boolean");

                    b.Property<int?>("Int4Answer")
                        .HasColumnType("integer");

                    b.Property<bool>("Int4State")
                        .HasColumnType("boolean");

                    b.Property<string>("String1Answer")
                        .HasColumnType("text");

                    b.Property<bool>("String1State")
                        .HasColumnType("boolean");

                    b.Property<string>("String2Answer")
                        .HasColumnType("text");

                    b.Property<bool>("String2State")
                        .HasColumnType("boolean");

                    b.Property<string>("String3Answer")
                        .HasColumnType("text");

                    b.Property<bool>("String3State")
                        .HasColumnType("boolean");

                    b.Property<string>("String4Answer")
                        .HasColumnType("text");

                    b.Property<bool>("String4State")
                        .HasColumnType("boolean");

                    b.Property<int>("TempletId")
                        .HasColumnType("integer");

                    b.Property<string>("Text1Answer")
                        .HasColumnType("text");

                    b.Property<bool>("Text1State")
                        .HasColumnType("boolean");

                    b.Property<string>("Text2Answer")
                        .HasColumnType("text");

                    b.Property<bool>("Text2State")
                        .HasColumnType("boolean");

                    b.Property<string>("Text3Answer")
                        .HasColumnType("text");

                    b.Property<bool>("Text3State")
                        .HasColumnType("boolean");

                    b.Property<string>("Text4Answer")
                        .HasColumnType("text");

                    b.Property<bool>("Text4State")
                        .HasColumnType("boolean");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("TempletId");

                    b.HasIndex("UserId");

                    b.ToTable("UserAnswers");
                });

            modelBuilder.Entity("backend.Model.UserLikedTemplet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("TempletId")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("TempletId");

                    b.HasIndex("UserId", "TempletId")
                        .IsUnique();

                    b.ToTable("UserLikedTemplets");
                });

            modelBuilder.Entity("backend.Model.UserModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("TagsModelTempletModel", b =>
                {
                    b.HasOne("backend.Model.TagsModel", null)
                        .WithMany()
                        .HasForeignKey("TagsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Model.TempletModel", null)
                        .WithMany()
                        .HasForeignKey("TempletsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("backend.Model.CommentModel", b =>
                {
                    b.HasOne("backend.Model.TempletModel", "Templet")
                        .WithMany("Comments")
                        .HasForeignKey("TempletId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Templet");
                });

            modelBuilder.Entity("backend.Model.TempletModel", b =>
                {
                    b.HasOne("backend.Model.UserModel", "User")
                        .WithMany("Templets")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Model.UserAnswerModel", b =>
                {
                    b.HasOne("backend.Model.TempletModel", "Templet")
                        .WithMany("Answers")
                        .HasForeignKey("TempletId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Model.UserModel", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Templet");

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Model.UserLikedTemplet", b =>
                {
                    b.HasOne("backend.Model.TempletModel", "Templet")
                        .WithMany()
                        .HasForeignKey("TempletId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Model.UserModel", "User")
                        .WithMany("LikedTemplets")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Templet");

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Model.TempletModel", b =>
                {
                    b.Navigation("Answers");

                    b.Navigation("Comments");
                });

            modelBuilder.Entity("backend.Model.UserModel", b =>
                {
                    b.Navigation("LikedTemplets");

                    b.Navigation("Templets");
                });
#pragma warning restore 612, 618
        }
    }
}
