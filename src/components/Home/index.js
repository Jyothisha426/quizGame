import {Component} from 'react'
import Header from '../Header'
import './index.css'

class Home extends Component {
  state = {
    isQuizStarted: false,
    questions: [],
    loading: false,
    currentQuestionIndex: 0,
  }

  onClickStartQuiz = async () => {
    this.setState({loading: true})
    try {
      const response = await fetch('https://apis.ccbp.in/assess/questions')
      if (response.ok) {
        const data = await response.json()
        console.log(data)

        const updatedData = data.questions.map(question => ({
          id: question.id,
          question: question.question_text,
          options: question.options.map(option => ({
            id: option.option_id,
            text: option.text,
            isCorrect: option.is_correct,
          })),
        }))

        this.setState({
          questions: updatedData,
          loading: false,
          isQuizStarted: true,
        })
      } else {
        console.error('Error fetching quiz questions:', response.statusText)
        this.setState({loading: false})
      }
    } catch (error) {
      console.error('Error fetching quiz questions:', error)
      this.setState({loading: false})
    }
  }

  handleNextQuestion = () => {
    this.setState(prevState => ({
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
    }))
  }

  render() {
    const {isQuizStarted, questions, loading, currentQuestionIndex} = this.state
    const currentQuestion = questions[currentQuestionIndex]

    return (
      <div className="home-container">
        <Header />
        {isQuizStarted ? (
          <div className="quiz-container">
            {currentQuestion ? (
              <div className="question-container">
                <div className="qn-top-header">
                  <div className="qn-num-container">
                    <p className="qn-num-head">Question</p>
                    <h1 className="qn-num">{currentQuestionIndex + 1}/20</h1>
                  </div>
                  <div className="fifteen-container">
                    <p className="fifteen">15</p>
                  </div>
                </div>

                <div className="current-qn-container">
                  <h2 className="question">{currentQuestion.question}</h2>
                  <ul className="options-list">
                    {currentQuestion.options.map((option, index) => (
                      <li key={option.id} className="option">
                        <button type="button" className="option-btn">
                          {String.fromCharCode(65 + index)}. {option.text}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="btn-container">
                  <button
                    className="next-question-btn"
                    type="button"
                    onClick={this.handleNextQuestion}
                  >
                    Next Question
                  </button>
                </div>
              </div>
            ) : (
              <p>No more questions</p>
            )}
          </div>
        ) : (
          <>
            <div className="start-quiz-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png"
                alt="start quiz game"
                className="start-quiz-img"
              />
              <h1 className="start-quiz-heading">
                How Many Of These Questions Do You Actually Know?
              </h1>
              <p className="start-quiz-para">
                Test yourself with these easy quiz questions and answers
              </p>
              <button
                className="start-quiz-btn"
                type="button"
                onClick={this.onClickStartQuiz}
              >
                Start Quiz
              </button>
              {loading && <p>Loading...</p>}
            </div>
            <p className="alert">
              All the progress will be lost, if you reload during the quiz
            </p>
          </>
        )}
      </div>
    )
  }
}

export default Home
