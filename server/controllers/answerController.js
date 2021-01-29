module.exports = {
  getAnswers: (req, res) => {
    res.status(200).send('Question Answers');
  },
  addAnswer: (req, res) => {
    res.status(201).send('Answer Added');
  },
  markAnswerHelpful: (req, res) => {
    res.status(204).send('Marked answer helpful');
  },
  reportAnswer: (req, res) => {
    res.status(204).send('Reported answer');
  },
};
