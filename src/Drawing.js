function drawCircle(x, y, radius, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.stroke();
}

function drawRectangle(x, y, width, height, color) {
  if (color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
    context.fillStyle = "#FFFFFF";
  } else {
    context.fillRect(x, y, width, height);
  }
}

function drawString(text, x, y, color, alignment) {
  if (!alignment)
    context.textAlign = "left";
  else
    context.textAlign = alignment;

  context.font = currentFont;
  context.fillStyle = color;
  context.fillText(text, x, y);
}

function clearCanvas(color) {
  if (!color) {
    context.fillStyle = "#FFF";
    context.clearRect(0, 0, context.width, context.height);
  } else {
    context.fillStyle = color;
    context.clearRect(0, 0, context.width, context.height);
    drawRectangle(0, 0, context.width, context.height, color);
  }
}
