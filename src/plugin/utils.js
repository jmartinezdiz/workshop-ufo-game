let utils = {

  // Check if two squares has collision
  hasCollision(a, b) {
    return !(
      ((a.y + a.height) < (b.y)) ||
      (a.y > (b.y + b.height)) ||
      ((a.x + a.width) < b.x) ||
      (a.x > (b.x + b.width))
    );
  },

  // Get next position in straight line
  getNextPosition(currentX, currentY, targetX, targetY, speed) {
    let tx = targetX - currentX;
    let ty = targetY - currentY;
    let dist = Math.sqrt(tx * tx + ty * ty);
    let velX = (tx / dist) * speed;
    let velY = (ty / dist) * speed;
    let x = currentX + velX;
    let y = currentY + velY;
    return { x, y };
  },

  // Get next position based on keyboard
  getNextPositionByKeyboard(key, x, y, screenWith, screenHeight, size, speed) {
    let newXPosition, newYPosition; // New player position
    switch (key) {
      case 'KeyA':
      case 'ArrowLeft':
        newXPosition = x - speed;
        if (newXPosition >= 0 ) {
          return { x: newXPosition, y };
        } else {
         return { x: 0, y };
        }
      case 'KeyD':
      case 'ArrowRight':
        newXPosition = x + speed;
        if (newXPosition < (screenWith - size)) {
          return { x: newXPosition, y };
        } else {
          return { x: screenWith - size, y };
        }
      case 'KeyW':
      case 'ArrowUp':
        newYPosition = y - speed;
        if (newYPosition >= 0 ){
          return { x, y: newYPosition };
        } else {
          return { x, y: 0 };
        }
      case 'KeyS':
      case 'ArrowDown':
        newYPosition = y + speed;
        if (newYPosition <= (screenHeight - size) ) {
          return { x, y: newYPosition };
        } else {
          return { x, y: screenHeight - size };
        }
      default:
    }
  },

  // Check if one squere is visible on one screen
  isOnScreen(x, y, screenWidth, screenHeight, enemySize) {
    return y > screenHeight ||
      y < -enemySize ||
      x > screenWidth ||
      x < -enemySize;
  },

};

///////////////////////////////////////////////////////////////
// EXPORTS
///////////////////////////////////////////////////////////////
export default utils;