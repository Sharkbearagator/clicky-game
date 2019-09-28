import React, { Component } from "react";
import MatchCard from "./components/Card";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import matches from "./cards.json";
import "./App.css";

let correctGuesses = 0;
let topScore = 0;
let clickAlert =
  "Click a Card and increase your score! But, don't click a duplicate or else it's game over!";

class App extends Component {
  state = {
    matches,
    correctGuesses,
    topScore,
    clickAlert
  };

  setClicked = id => {
    const matches = this.state.matches;
    const clickedMatch = matches.filter(match => match.id === id);

    if (clickedMatch[0].clicked) {
      correctGuesses = 0;
      clickAlert = "Game Over! You already clicked that one!.";
    
      for (let i = 0; i < matches.length; i++) {
        matches[i].clicked = false;
      }
      this.setState({ clickAlert });
      this.setState({ correctGuesses });
      this.setState({ matches });

    } else if (correctGuesses < 9) {
      clickedMatch[0].clicked = true;
      correctGuesses++;
      clickAlert = "That's a new one! Keep clicking!";

      if (correctGuesses > topScore) {
        topScore = correctGuesses;
        this.setState({ topScore });
      }

      matches.sort(function (a, b) {
        return 0.5 - Math.random();
      });

      this.setState({ matches });
      this.setState({ correctGuesses });
      this.setState({ clickAlert });

    } else {
      clickedMatch[0].clicked = true;
      correctGuesses = 0;
      clickAlert = "Perfect Score!";
      topScore = 10;

      this.setState({ topScore });

      for (let i = 0; i < matches.length; i++) {
        matches[i].clicked = false;
      }

      matches.sort(function (a, b) {
        return 0.5 - Math.random();
      });

      this.setState({ matches });
      this.setState({ correctGuesses });
      this.setState({ clickAlert });
    }
  };

  render() {
    return (
      <Wrapper>
        <div className="container">
          <Title>Click it Real Good!</Title>
          <br />
          <h3 className="scoreSummary">{this.state.clickAlert}</h3>
          <h3 className="scoreSummary card-header">
            Current Score : {this.state.correctGuesses}
            <br />
            Top Score : {this.state.topScore}
          </h3>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            {this.state.matches.map(match => (
              <MatchCard
                setClicked={this.setClicked}
                id={match.id}
                key={match.id}
                image={match.image}
              />
            ))}
          </div>
        </div>
      </Wrapper>
    );
  }
}
export default App;