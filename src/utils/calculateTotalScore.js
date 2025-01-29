export const calculateTotalScore = (attempt) => {
    return attempt.submitted_answers.reduce((totalScore, submittedAnswer) => {
        const correctAnswer = attempt.correct_answers.find(correct => correct.question_id === submittedAnswer.question_id);
        if (correctAnswer && submittedAnswer.answer === correctAnswer.answer) {
            totalScore += correctAnswer.marks;
        }
        return totalScore;
    }, 0);
}