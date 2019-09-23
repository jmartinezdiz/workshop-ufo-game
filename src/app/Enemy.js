///////////////////////////////////////////////////////////////
// IMPORTS
///////////////////////////////////////////////////////////////
import React from 'react';
import Character from './Character';

import Utils from '../plugin/utils';

import asteroid from '../assets/img/asteroid.svg';

///////////////////////////////////////////////////////////////
// CONTANTS
///////////////////////////////////////////////////////////////
const ENEMY_SIZE = 48;
const ENEMY_SPEED = 2;

///////////////////////////////////////////////////////////////
// MAIN COMPONENT
///////////////////////////////////////////////////////////////
class Enemy extends Character {

  ///////////////////////////////////////////////////////////////
  // CONSTRUCTOR
  ///////////////////////////////////////////////////////////////
  constructor(props) {
    super(props);
    this.timer = null; // Controlls enemies movement
  }

  ///////////////////////////////////////////////////////////////
  // CALLBACKS
  ///////////////////////////////////////////////////////////////
  componentDidMount() {
    this.timer = setInterval(() => {
      let { x, y } = Utils.getNextPosition(
        this.state.x, this.state.y, this.state.targetX, this.state.targetY, ENEMY_SPEED
      );
      // Check if enemy is visible
      if (Utils.isOnScreen(x, y, this.props.boardWidth, this.props.boardHeight, this.getSize())) {
        // Enemy dissapeared, need generate new random position
        this.setState(this._getNewPositions(), () => {
          this.props.onChangePosition(this);
        });
      } else {
        // Enemy is visible, need update position
        this.setState({ x, y }, () => {
          this.props.onChangePosition(this);
        });
      }
    }, 25);
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  ///////////////////////////////////////////////////////////////
  // PUBLIC METHODS
  ///////////////////////////////////////////////////////////////
  getSize() {
    return ENEMY_SIZE;
  }

  ///////////////////////////////////////////////////////////////
  // PRIVATE METHODS
  ///////////////////////////////////////////////////////////////

  // Returns new inital and target positions
  _getNewPositions() {
    let border = Math.floor(Math.random() * 4);
    let targetBorder = Math.floor(Math.random() * 4);
    // Get target border until will be diferent from border
    while (targetBorder === border) { targetBorder = Math.floor(Math.random() * 4) };
    let [x, y] = this._getNewPosition(border);
    let [targetX, targetY] = this._getNewPosition(targetBorder);
    return { x, y, targetX, targetY };
  }

  // Get position for border
  _getNewPosition(border) {
    switch (border) {
      case 0:
        // Up
        return [Math.floor(Math.random() * (this.props.boardWidth + 1)), -this.getSize()];
      case 1:
        // Right
        return [-this.getSize(), Math.floor(Math.random() * (this.props.boardHeight + 1))];
      case 2:
        // Down
        return [Math.floor(Math.random() * (this.props.boardWidth + 1)), this.props.boardHeight];
      case 3:
        // Bottom
        return [this.props.boardWidth, Math.floor(Math.random() * (this.props.boardHeight + 1))];
      default:
        throw new Error("Unexpected border on _getNewPosition!!!");
    }
  }

  _getImageStyles() {
    return {
      left: this.state.x,
      top: this.state.y,
      width: `${this.getSize()}px`,
      height: `${this.getSize()}px`,
    };
  }

  ///////////////////////////////////////////////////////////////
  // RENDERS
  ///////////////////////////////////////////////////////////////
  render()  {
    return (
      <img src={asteroid} alt="enemy" style={this._getImageStyles()} className="Enemy-image" />
    );
  }

}

///////////////////////////////////////////////////////////////
// EXPORTS
///////////////////////////////////////////////////////////////
export default Enemy;
