///////////////////////////////////////////////////////////////
// IMPORTS
///////////////////////////////////////////////////////////////
import React from 'react';

import Utils from '../plugin/utils';

import Player from './Player';
import Enemy from './Enemy';

///////////////////////////////////////////////////////////////
// CONTANTS
///////////////////////////////////////////////////////////////
const INCREASE_ENEMIES_TIME = 5000

///////////////////////////////////////////////////////////////
// MAIN COMPONENT
///////////////////////////////////////////////////////////////
class Board extends React.Component {

  ///////////////////////////////////////////////////////////////
  // CONSTRUCTOR
  ///////////////////////////////////////////////////////////////
  constructor(props) {
    super(props);
    this.state = {
      enemies: this._generateEnemies(props.enemiesCount),
    };
    this.timer = null; // Controlls enemies appearance
  }

  ///////////////////////////////////////////////////////////////
  // CALLBACKS
  ///////////////////////////////////////////////////////////////
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        enemies: this.state.enemies.concat(
          [this._generateEnemy(this.state.enemies.length)]
        )
      });
    }, INCREASE_ENEMIES_TIME);
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  ///////////////////////////////////////////////////////////////
  // PRIVATE METHODS
  ///////////////////////////////////////////////////////////////
  _generateEnemies(enemiesCount) {
    let enemies = [];
    for (let i = 0; i < enemiesCount; i++) {
      enemies.push(this._generateEnemy(i));
    }
    return enemies;
  }

  _generateEnemy(key) {
    return(
      <Enemy
        key={key}
        boardWidth={this.props.width}
        boardHeight={this.props.height}
        onChangePosition={(enemy) => this._onChangeEnemyPosition(enemy)}
      />
    );
  }

  _getBoardWrapperStyles() {
    return {
      width: `${this.props.width}px`,
      height: `${this.props.height}px`,
    };
  }

  ///////////////////////////////////////////////////////////////
  // EVENTS
  ///////////////////////////////////////////////////////////////
  _onChangeEnemyPosition(enemy) {
    let hasCollision = Utils.hasCollision(
      { x: enemy.getX(), y: enemy.getY(), width: enemy.getSize(), height: enemy.getSize() },
      { x: this.refs.player.getX(), y: this.refs.player.getY(), width: this.refs.player.getSize(), height: this.refs.player.getSize() },
    );
    // Game over if player crash with enemy
    hasCollision && this.props.onGameOver();
  }

  ///////////////////////////////////////////////////////////////
  // RENDERS
  ///////////////////////////////////////////////////////////////
  render()  {
    return (
      <div className="Board" style={this._getBoardWrapperStyles()}>
        <Player ref="player" boardWidth={this.props.width} boardHeight={this.props.height} playerSpeed={this.props.playerSpeed} />
        {this.state.enemies}
      </div>
    );
  }

}

///////////////////////////////////////////////////////////////
// EXPORTS
///////////////////////////////////////////////////////////////
export default Board;
