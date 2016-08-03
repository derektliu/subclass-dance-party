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
    this.$node.animate({'top': this.top + 50}, this.timeBetweenSteps);
    this.bounce = false;
  } else {
    this.$node.animate({'top': this.top - 50}, this.timeBetweenSteps);
    this.bounce = true;
  }
};