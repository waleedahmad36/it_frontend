import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';

const CreateQuiz = ({user}) => {
    console.log(user._id);
  const [courseName, setCourseName] = useState('');
  const [instructor, setInstructor] = useState('');
  const [topics, setTopics] = useState([{ name: '', questions: [{ questionText: '', options: [{ optionText: '', isCorrect: false }] }] }]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(`${API_URL}/api/v1/quiz/create`, {
        courseName,
        instructor: user._id,
        topics,
      });
      alert("Quiz Created Successfully");
      navigate('/admin/dashboard'); // Redirect after creation
    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("Failed to create quiz.");
    }
    setLoading(false);
  };

  // Manage topic changes
  const handleTopicChange = (index, event) => {
    const newTopics = [...topics];
    newTopics[index].name = event.target.value;
    setTopics(newTopics);
  };

  // Manage question changes
  const handleQuestionChange = (topicIndex, questionIndex, event) => {
    const newTopics = [...topics];
    newTopics[topicIndex].questions[questionIndex].questionText = event.target.value;
    setTopics(newTopics);
  };

  // Manage option changes
  const handleOptionChange = (topicIndex, questionIndex, optionIndex, event) => {
    const newTopics = [...topics];
    newTopics[topicIndex].questions[questionIndex].options[optionIndex].optionText = event.target.value;
    setTopics(newTopics);
  };

  // Toggle correct option
  const handleCorrectChange = (topicIndex, questionIndex, optionIndex) => {
    const newTopics = [...topics];
    newTopics[topicIndex].questions[questionIndex].options[optionIndex].isCorrect = !newTopics[topicIndex].questions[questionIndex].options[optionIndex].isCorrect;
    setTopics(newTopics);
  };

  // Add a new topic
  const addTopic = () => {
    setTopics([...topics, { name: '', questions: [{ questionText: '', options: [{ optionText: '', isCorrect: false }] }] }]);
  };

  // Add a new question to a specific topic
  const addQuestion = (index) => {
    const newTopics = [...topics];
    newTopics[index].questions.push({ questionText: '', options: [{ optionText: '', isCorrect: false }] });
    setTopics(newTopics);
  };

  // Add a new option to a specific question
const addOption = (topicIndex, questionIndex) => {
    const newTopics = [...topics];
    
    // Check if the current number of options is less than 4 before adding
    if (newTopics[topicIndex].questions[questionIndex].options.length < 4) {
      newTopics[topicIndex].questions[questionIndex].options.push({ optionText: '', isCorrect: false });
      setTopics(newTopics);
    } else {
      alert('You can only add up to 4 options.');
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Create a New Quiz</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-gray-700 text-lg mb-2">Course Name</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>

        {topics.map((topic, topicIndex) => (
          <div key={topicIndex} className="bg-gray-50 p-4 rounded-lg shadow-md mb-6">
            <div>
              <label className="block text-gray-700 text-lg mb-2">Topic Name</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={topic.name}
                onChange={(e) => handleTopicChange(topicIndex, e)}
                required
              />
            </div>

            {topic.questions.map((question, questionIndex) => (
              <div key={questionIndex} className="mt-6">
                <label className="block text-gray-700 text-lg mb-2">Question</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={question.questionText}
                  onChange={(e) => handleQuestionChange(topicIndex, questionIndex, e)}
                  required
                />

                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="mt-4">
                    <label className="block text-gray-700">Option {optionIndex + 1}</label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        value={option.optionText}
                        onChange={(e) => handleOptionChange(topicIndex, questionIndex, optionIndex, e)}
                        required
                      />
                      <input
                        type="checkbox"
                        checked={option.isCorrect}
                        onChange={() => handleCorrectChange(topicIndex, questionIndex, optionIndex)}
                        className="ml-4"
                      />
                      <span className="ml-2">Correct</span>
                    </div>
                  </div>
                ))}

<button
  type="button"
  className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg"
  onClick={() => addOption(topicIndex, questionIndex)}
  disabled={question.options.length >= 4}  // Disable if there are 4 or more options
>
  Add Option
</button>
              </div>
            ))}
            <button
  type="button"
  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
  onClick={() => addQuestion(topicIndex)}
  disabled={topic.questions.length >= 10}  // Disable if there are 5 or more questions
>
  Add Question
</button>
          </div>
        ))}

        <button
          type="button"
          className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-lg"
          onClick={addTopic}
        >
          Add Topic
        </button>

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Quiz"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;
