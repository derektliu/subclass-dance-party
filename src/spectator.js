var Spectator = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.addClass('rotating');
  // this.setPosition(top, left);  
};

Spectator.prototype = Object.create(Dancer.prototype);
Spectator.prototype.constructor = Spectator;