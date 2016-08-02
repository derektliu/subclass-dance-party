var BlinkyDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);

  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
};

BlinkyDancer.prototype = Object.create(Dancer.prototype);
BlinkyDancer.prototype.constructor = BlinkyDancer;

BlinkyDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);
  if (this.$node.css('visibility') === 'hidden') {
    this.$node.css('visibility', 'visible');
  } else {
    this.$node.css('visibility', 'hidden');
  }
};


// var MovingBlinkyDancer = function(top, left, timeBetweenSteps) {
//   BlinkyDancer.call(this, top, left, timeBetweenSteps);
//   this.$node.css('background-image', 'url("src/Basketball.png")');
//   setInterval( function() {    
//     this.$node.animate({
//       left: '+=50',
//       top: '+=50',
//     }); 
//   }.bind(this), 50);
    
// };

// MovingBlinkyDancer.prototype = Object.create(BlinkyDancer.prototype);
// MovingBlinkyDancer.prototype.constructor = MovingBlinkyDancer;

// MovingBlinkyDancer.prototype.step = function() {
//   BlinkyDancer.prototype.step.call(this);
//   // call the old version of step at the beginning of any call to this new version of step
//   // toggle() is a jQuery method to show/hide the <span> tag.
//   // See http://api.jquery.com/category/effects/ for this and
//   // other effects you can use on a jQuery-wrapped html tag.
// };

var ExpandingBlinkyDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.addClass('expanding');
  this.setPosition(top, left);
  setInterval( function() {
    if (parseInt(this.$node.css('border-width')) > 200) { 
    } else {
      console.log(parseInt(this.$node.css('border-width')));
      this.$node.animate({
        'border-width': '+=5',
        'border-radius': '+=5'
      });
    }
  }.bind(this), 200);
  
};

ExpandingBlinkyDancer.prototype = Object.create(Dancer.prototype);
ExpandingBlinkyDancer.prototype.constructor = ExpandingBlinkyDancer;



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

var Basketball = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.addClass('basketball'); 
  this.setPosition(top, left);
  this.i = 0;
  this.bounce = false;
};

Basketball.prototype = Object.create(Dancer.prototype);
Basketball.prototype.constructor = Basketball;

Basketball.prototype.step = function() {

  Dancer.prototype.step.call(this);
  if (this.bounce) {
    this.$node.animate({'top': this.top+50}, this.timeBetweenSteps);
    this.bounce = false;
  } else {
    this.$node.animate({'top': this.top-50}, this.timeBetweenSteps);
    this.bounce = true;
  }
};
