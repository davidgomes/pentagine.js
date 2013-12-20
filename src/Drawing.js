drawCircle = function(x, y, radius, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.fill();
};

drawRectangle = function(x, y, width, height, color) {
  if (color) {
    context.fillStyle = color;
  }

  context.fillRect(x, y, width, height);
};

drawLine = function(x1, y1, x2, y2, color) {
  if (color) {
    context.fillStyle = color;
  }

  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
};

drawString = function(text, x, y, color, alignment) {
  if (!alignment) {
    context.textAlign = "left";
  } else {
    context.textAlign = alignment;
  }

  context.font = currentFont;
  context.fillStyle = color;
  context.fillText(text, x, y);
};

clearCanvas = function(backgroundColor) {
  context.clearRect(0, 0, context.width, context.height);

  if (backgroundColor != null) {
    drawRectangle(0, 0, context.width, context.height, backgroundColor);
  }
};

isOutsideOfScreen = function(x, y) {
  return (x < 0 || x > context.width || y < 0 || y > context.height);
};
