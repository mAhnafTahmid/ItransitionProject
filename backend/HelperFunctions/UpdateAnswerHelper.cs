using backend.Model;

namespace backend.HelperFunctions;

public class UpdateAnswerHelper
{
    public static void UpdateAnswerFields(UserAnswerModel existing, UserAnswerModel updated)
    {
        existing.String1State = updated.String1State;
        existing.String1Answer = updated.String1Answer;
        existing.String2State = updated.String2State;
        existing.String2Answer = updated.String2Answer;
        existing.String3State = updated.String3State;
        existing.String3Answer = updated.String3Answer;
        existing.String4State = updated.String4State;
        existing.String4Answer = updated.String4Answer;

        existing.Text1State = updated.Text1State;
        existing.Text1Answer = updated.Text1Answer;
        existing.Text2State = updated.Text2State;
        existing.Text2Answer = updated.Text2Answer;
        existing.Text3State = updated.Text3State;
        existing.Text3Answer = updated.Text3Answer;
        existing.Text4State = updated.Text4State;
        existing.Text4Answer = updated.Text4Answer;

        existing.Int1State = updated.Int1State;
        existing.Int1Answer = updated.Int1Answer;
        existing.Int2State = updated.Int2State;
        existing.Int2Answer = updated.Int2Answer;
        existing.Int3State = updated.Int3State;
        existing.Int3Answer = updated.Int3Answer;
        existing.Int4State = updated.Int4State;
        existing.Int4Answer = updated.Int4Answer;

        existing.Checkbox1State = updated.Checkbox1State;
        existing.Checkbox1Answer = updated.Checkbox1Answer;
        existing.Checkbox2State = updated.Checkbox2State;
        existing.Checkbox2Answer = updated.Checkbox2Answer;
        existing.Checkbox3State = updated.Checkbox3State;
        existing.Checkbox3Answer = updated.Checkbox3Answer;
        existing.Checkbox4State = updated.Checkbox4State;
        existing.Checkbox4Answer = updated.Checkbox4Answer;
    }
}