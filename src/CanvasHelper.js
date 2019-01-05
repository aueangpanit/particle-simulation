class CanvasHelper {
  static drawArrow = (context, x1, y1, x2, y2) => {
    var headlen = 5; // length of head in pixels
    var angle = Math.atan2(y2 - y1, x2 - x1);
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(
      x2 - headlen * Math.cos(angle - Math.PI / 6),
      y2 - headlen * Math.sin(angle - Math.PI / 6)
    );
    context.moveTo(x2, y2);
    context.lineTo(
      x2 - headlen * Math.cos(angle + Math.PI / 6),
      y2 - headlen * Math.sin(angle + Math.PI / 6)
    );
  };
}

export { CanvasHelper };
