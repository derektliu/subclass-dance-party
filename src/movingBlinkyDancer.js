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