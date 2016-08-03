var ExpandingBlinkyDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  // this.$node.addClass('expanding');
  // this.setPosition(top, left);
  setInterval( function() {
    if (this.$node.css('height') > 300) { 
    } else {
      this.$node.animate({
        'height': '+=50',
        'width': '+=50'
      });
    }
  }.bind(this), 1000);
  
};

ExpandingBlinkyDancer.prototype = Object.create(Dancer.prototype);
ExpandingBlinkyDancer.prototype.constructor = ExpandingBlinkyDancer;