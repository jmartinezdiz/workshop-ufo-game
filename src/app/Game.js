///////////////////////////////////////////////////////////////
// IMPORTS
///////////////////////////////////////////////////////////////
import React from 'react';

import Board from './Board';
import Timer from './Timer';

///////////////////////////////////////////////////////////////
// MAIN COMPONENT
///////////////////////////////////////////////////////////////
class App extends React.Component {

  ///////////////////////////////////////////////////////////////
  // CONSTRUCTOR
  ///////////////////////////////////////////////////////////////
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      gameOver: false,
      duration: 0,
      size: 500,
      enemiesCount: 5,
      playerSpeed: 25,
    };
  }

  ///////////////////////////////////////////////////////////////
  // PRIVATE METHODS
  ///////////////////////////////////////////////////////////////
  _play() {
    this.setState({ playing: true, gameOver: false }, () => {
      this.refs.timer.play(); // Timer activation
    });
  }

  _gameOver() {
    this.setState({ playing: false, gameOver: true, duration: this.refs.timer.getTime() });
  }

  ///////////////////////////////////////////////////////////////
  // RENDERS
  ///////////////////////////////////////////////////////////////
  _renderNewGame() {
    if (!this.state.playing) {
      let buttonDisabled = !this.state.size || this.state.size > 800 || this.state.size < 400 ||
        !this.state.enemiesCount || this.state.enemiesCount < 1 || this.state.enemiesCount > 15;
      return (
        <div>
          <h1>UFO game</h1>
          <hr />
          {this._renderGameOver()}
          <label>Tamaño de la ventana:</label>
          <input type="number" value={this.state.size} onChange={(e) => this.setState({size: e.target.value})} />
          <br /><br />
          <label>Número de enemigos:</label>
          <input type="number" value={this.state.enemiesCount} onChange={(e) => this.setState({enemiesCount: e.target.value})} />
          <br /><br />
          <button className="rpgui-button" style={{opacity: buttonDisabled && 0.5}} type="button" onClick={() => this._play()} disabled={buttonDisabled}>
            <span>Jugar</span>
          </button>
        </div>
      );
    }
  }

  _renderGameOver() {
    if (this.state.gameOver) {
      return (
        <div>
          <label style={{ color: "yellow" }}>Has durado: {this.state.duration}s!!!</label>
          <hr/>
        </div>
      );
    }
  }

  _renderGame() {
    if (this.state.playing) {
      return (
        <div>
          <Timer ref="timer" />
          <hr className="golden" />
          <Board
            ref="board"
            width={this.state.size}
            height={this.state.size}
            enemiesCount={this.state.enemiesCount}
            playerSpeed={this.state.playerSpeed}
            onGameOver={() => this._gameOver()}
            playing={this.state.playing}
          />
        </div>
      );
    }
  }

  render()  {
    return (
      <div className="App rpgui-content">
        <div className="rpgui-container framed">
          {this._renderNewGame()}
          {this._renderGame()}
        </div>
      </div>
    );
  }

}

///////////////////////////////////////////////////////////////
// EXPORTS
///////////////////////////////////////////////////////////////
export default App;
