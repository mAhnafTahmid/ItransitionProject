using backend.Model;

namespace backend.HelperFunctions;

public static class TempletHelper
{
    public static TempletModel MapToTempletModel(TempletCreateRequest request, UserModel user, List<TagsModel> tags)
    {
        return new TempletModel
        {
            Title = request.Title,
            Description = request.Description,
            ImageUrl = request.ImageUrl,
            Likes = 0,

            UserId = user.Id,
            User = user,

            Topic = request.Topic,
            IsPublic = request.IsPublic,
            AccessList = request.AccessList ?? [],
            Tags = tags,

            String1State = request.String1State,
            String1Question = request.String1Question,

            String2State = request.String2State,
            String2Question = request.String2Question,

            String3State = request.String3State,
            String3Question = request.String3Question,

            String4State = request.String4State,
            String4Question = request.String4Question,

            Text1State = request.Text1State,
            Text1Question = request.Text1Question,

            Text2State = request.Text2State,
            Text2Question = request.Text2Question,

            Text3State = request.Text3State,
            Text3Question = request.Text3Question,

            Text4State = request.Text4State,
            Text4Question = request.Text4Question,

            Int1State = request.Int1State,
            Int1Question = request.Int1Question,

            Int2State = request.Int2State,
            Int2Question = request.Int2Question,

            Int3State = request.Int3State,
            Int3Question = request.Int3Question,

            Int4State = request.Int4State,
            Int4Question = request.Int4Question,

            Checkbox1State = request.Checkbox1State,
            Checkbox1Question = request.Checkbox1Question,
            Checkbox1Option1 = request.Checkbox1Option1,
            Checkbox1Option2 = request.Checkbox1Option2,
            Checkbox1Option3 = request.Checkbox1Option3,
            Checkbox1Option4 = request.Checkbox1Option4,

            Checkbox2State = request.Checkbox2State,
            Checkbox2Question = request.Checkbox2Question,
            Checkbox2Option1 = request.Checkbox2Option1,
            Checkbox2Option2 = request.Checkbox2Option2,
            Checkbox2Option3 = request.Checkbox2Option3,
            Checkbox2Option4 = request.Checkbox2Option4,

            Checkbox3State = request.Checkbox3State,
            Checkbox3Question = request.Checkbox3Question,
            Checkbox3Option1 = request.Checkbox3Option1,
            Checkbox3Option2 = request.Checkbox3Option2,
            Checkbox3Option3 = request.Checkbox3Option3,
            Checkbox3Option4 = request.Checkbox3Option4,

            Checkbox4State = request.Checkbox4State,
            Checkbox4Question = request.Checkbox4Question,
            Checkbox4Option1 = request.Checkbox4Option1,
            Checkbox4Option2 = request.Checkbox4Option2,
            Checkbox4Option3 = request.Checkbox4Option3,
            Checkbox4Option4 = request.Checkbox4Option4,
        };


    }
    public static void UpdateTempletModel(TempletModel templet, TempletCreateRequest request, List<TagsModel> tags)
    {
        templet.Title = request.Title;
        templet.Description = request.Description;
        templet.ImageUrl = request.ImageUrl;
        templet.Topic = request.Topic;
        templet.IsPublic = request.IsPublic;
        templet.AccessList = request.AccessList ?? [];
        templet.Tags = tags;

        templet.String1State = request.String1State;
        templet.String1Question = request.String1Question;

        templet.String2State = request.String2State;
        templet.String2Question = request.String2Question;

        templet.String3State = request.String3State;
        templet.String3Question = request.String3Question;

        templet.String4State = request.String4State;
        templet.String4Question = request.String4Question;

        templet.Text1State = request.Text1State;
        templet.Text1Question = request.Text1Question;

        templet.Text2State = request.Text2State;
        templet.Text2Question = request.Text2Question;

        templet.Text3State = request.Text3State;
        templet.Text3Question = request.Text3Question;

        templet.Text4State = request.Text4State;
        templet.Text4Question = request.Text4Question;

        templet.Int1State = request.Int1State;
        templet.Int1Question = request.Int1Question;

        templet.Int2State = request.Int2State;
        templet.Int2Question = request.Int2Question;

        templet.Int3State = request.Int3State;
        templet.Int3Question = request.Int3Question;

        templet.Int4State = request.Int4State;
        templet.Int4Question = request.Int4Question;

        templet.Checkbox1State = request.Checkbox1State;
        templet.Checkbox1Question = request.Checkbox1Question;
        templet.Checkbox1Option1 = request.Checkbox1Option1;
        templet.Checkbox1Option2 = request.Checkbox1Option2;
        templet.Checkbox1Option3 = request.Checkbox1Option3;
        templet.Checkbox1Option4 = request.Checkbox1Option4;

        templet.Checkbox2State = request.Checkbox2State;
        templet.Checkbox2Question = request.Checkbox2Question;
        templet.Checkbox2Option1 = request.Checkbox2Option1;
        templet.Checkbox2Option2 = request.Checkbox2Option2;
        templet.Checkbox2Option3 = request.Checkbox2Option3;
        templet.Checkbox2Option4 = request.Checkbox2Option4;

        templet.Checkbox3State = request.Checkbox3State;
        templet.Checkbox3Question = request.Checkbox3Question;
        templet.Checkbox3Option1 = request.Checkbox3Option1;
        templet.Checkbox3Option2 = request.Checkbox3Option2;
        templet.Checkbox3Option3 = request.Checkbox3Option3;
        templet.Checkbox3Option4 = request.Checkbox3Option4;

        templet.Checkbox4State = request.Checkbox4State;
        templet.Checkbox4Question = request.Checkbox4Question;
        templet.Checkbox4Option1 = request.Checkbox4Option1;
        templet.Checkbox4Option2 = request.Checkbox4Option2;
        templet.Checkbox4Option3 = request.Checkbox4Option3;
        templet.Checkbox4Option4 = request.Checkbox4Option4;
    }

}
