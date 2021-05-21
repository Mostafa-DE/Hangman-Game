import React, { Component } from "react";
import {randomWord} from './words';
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  reset(){
    this.setState({
      nWrong: 0, guessed: new Set(), answer: randomWord()
    });
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    if(this.state.nWrong < 7 ){
      return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
        <button
          key={ltr}
          value={ltr}
          onClick={this.handleGuess}
          disabled={this.state.guessed.has(ltr)} 
        >
          {ltr}
        </button>
      ));
    }

  }

  /** render: render game */
  render() {
    const altText = `${this.state.nWrong}/6 guesses`;
    return (
      <div className='Hangman'>
        {
          this.state.nWrong === 7 || this.guessedWord().join("") === this.state.answer ? null : <h1><span role="img" aria-label="emoji">Hangman😎</span></h1>
        }

        {
        this.state.nWrong === 7 ? <h1 id='h1-loser'><span role="img" aria-label="emoji">Game Over 😔</span></h1> : null
        }

        {
          this.state.nWrong === 7 ? <h2 id='h2-nWrong'>The Word Is: <span id='span-answer'>{this.state.answer}</span></h2> : null
        }

        {
        this.guessedWord().join("") === this.state.answer ? <h1 id='h1-winner'><span role="img" aria-label="emoji">congratulations You Win 😍</span></h1> : null
        }

         <h2 id='h2-nWrong'>Number Of Wrong: {this.state.nWrong}</h2>
         
        <h2>{this.state.nWrong === 6 ? alert('One guess remaining🙁') : null}</h2>
        { this.state.nWrong < 7 ? <img src={this.props.images[this.state.nWrong]} alt={altText} /> :  <img src={this.props.images[6]} alt='6/6 guesses' />}
        
        <p className='Hangman-word'>{this.guessedWord()}</p>

        {
          this.state.nWrong > 7 || this.guessedWord().join("") === this.state.answer ? null : <p className='Hangman-btns'>{this.generateButtons()}</p>
        }



        <button onClick={this.reset} id='btn-reset'>Restart </button>
        
      </div>
    );
  }
}

export default Hangman;
