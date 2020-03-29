import React from "react";

import { quizData } from "./quizData";
import DifficultyProgress from './DifficultyStars';

class Quiz extends React.Component {
  state = {
    currentQuestion:0,
    myAnswer: null,
    options: [],
    score: 0,
    disabled: true,
    isEnd: false
  };

  //Load Quizdata  
  loadQuizData = () => {
    // console.log(quizData[0].question)
    this.setState(() => {
      return {
        category:decodeURIComponent(quizData[this.state.currentQuestion].category),
        questions:decodeURIComponent(quizData[this.state.currentQuestion].question),
        answer: decodeURIComponent(quizData[this.state.currentQuestion].correct_answer),
        difficulty: decodeURIComponent(quizData[this.state.currentQuestion].difficulty),
        options: quizData[this.state.currentQuestion].incorrect_answers
      };
    });
  };

  componentDidMount() {
    this.loadQuizData();
  }


//next question
  nextQuestionHandler = () => {
    const { myAnswer, answer, score , currentQuestion, max, min  } = this.state;
    if (myAnswer === answer) {
      this.setState({
        score: score + 1
      });
    }

    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
    //min max score
    min: ((this.state.score) * 100 / (this.state.currentQuestion + 1)).toFixed(0),
    max : ((this.state.currentQuestion + 1 ) * 100 /  (quizData.length - 1)).toFixed(0)
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          category:decodeURIComponent(quizData[this.state.currentQuestion].category),
          difficulty: decodeURIComponent(quizData[this.state.currentQuestion].difficulty),  
          questions: decodeURIComponent(quizData[this.state.currentQuestion].question),
          answer: decodeURIComponent(quizData[this.state.currentQuestion].correct_answer),
          options: quizData[this.state.currentQuestion].incorrect_answers
        };
      });
    }
  }


  //check answer
  checkAnswer = answer => {
    this.setState({ myAnswer: answer, disabled: false });
  };
  
  finishHandler = () => {
    if (this.state.currentQuestion === quizData.length - 1) {

      this.setState({
        isEnd: true
      });
    }
  };

  render() {
    const { options, myAnswer, currentQuestion, isEnd } = this.state;

    if (isEnd) {
      return (
        
        <div className="result">          
          <h3>your Final score is: {(this.state.min)} %  </h3>
        </div>
      );
    } 
    else {
      return (
        <div className="App">

          {/* Quiz page*/}
          <h2>{`Questions ${currentQuestion}  out of ${quizData.length}`}</h2>

          <h3>{this.state.category} </h3>

          {/* Star*/}
          <DifficultyProgress level={this.state.difficulty} />

          <h3>{this.state.questions} </h3>

          {/* //adding a option*/}
          {options.map(option => (
            <li
              key={option.id}
              className={`ui floating message options
         ${myAnswer === option ? "selected"  : null}
         `}
              onClick={() => this.checkAnswer(decodeURIComponent(option))}
            >
              {decodeURIComponent(option)}
            </li>
          ))}
          
          {/* //adding a Next button */}
          {currentQuestion < quizData.length - 1
          && (
            <button
              disabled={this.state.disabled}
              onClick={this.nextQuestionHandler }
            >Next </button>
          )
    }

          {/* //adding a finish button */}
          {currentQuestion === quizData.length - 1 && (
            <button className="ui inverted button" onClick={this.finishHandler}>
              Finish
            </button>
          )}

          {/* //message */}
          <div>                        
          { this.state.score ? (this.state.answer === this.state.myAnswer ? 'Correct!' : 'Sorry!') : '\u00A0'}
          </div><br/><br/>

          {/* //Score */}
          <div>            
          Score : {(this.state.min)} % &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Max score : {(this.state.max)} %          
        </div>


        </div>
      );
    }
  }
}

export default Quiz;
