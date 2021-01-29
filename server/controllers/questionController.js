module.exports = {
  getQuestions: (req, res) => {
    res.status(200).send('Product Questions');
  },
  addQuestion: (req, res) => {
    res.status(201).send('Question Added');
  },
  markQuestionHelpful: (req, res) => {
    res.status(204).send();
  },
  reportQuestion: (req, res) => {
    res.status(204).send();
  },
};
