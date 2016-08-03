var ColoredBlinkyDancer = function(top, left, timeBetweenSteps) {
  BlinkyDancer.call(this, top, left, timeBetweenSteps);
  this.$node.addClass('colored'); 
  this.setPosition(top, left);
  this.i = 0;
};

ColoredBlinkyDancer.prototype = Object.create(BlinkyDancer.prototype);
ColoredBlinkyDancer.prototype.constructor = ColoredBlinkyDancer;

ColoredBlinkyDancer.prototype.step = function() {

  BlinkyDancer.prototype.step.call(this);
  this.$node.css('border-color', this.makeColorGradient(.3, .3, .3, 0, 2, 4));
};

ColoredBlinkyDancer.prototype.makeColorGradient = function(frequency1, frequency2, frequency3, phase1, phase2, phase3, center, width, len) {
  if (center === undefined) {
    center = 128;
  }
  if (width === undefined) {
    width = 127;
  }
  console.log('coloring');
  return (function() {
    var red = Math.floor(Math.sin(frequency1 * this.i + phase1) * width + center);
    var grn = Math.floor(Math.sin(frequency2 * this.i + phase2) * width + center);
    var blu = Math.floor(Math.sin(frequency3 * this.i + phase3) * width + center);
    this.i++;
    console.log('RGB(' + red + ', ' + grn + ', ' + blu + ')');
    return 'rgb(' + red + ', ' + grn + ', ' + blu + ')';
  }).call(this);
};