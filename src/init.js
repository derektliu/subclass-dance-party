$(document).ready(function() {
  window.dancers = [];
  var lineupOn = false;
  var memeFaces = ['<img src="./img/Jordan.png" height="100px" width="75"></img>'];

  $('.addDancerButton').on('click', function(event) {

    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      80 * Math.random() + '%',
      80 * Math.random() + '%',
      Math.random() * 1000 + 1000
    );

    dancer.$node.append(memeFaces[0]);
    window.dancers.push(dancer);
    console.log(lineupOn);
    lineUp(dancer, window.dancers.length-1);

    $('body').append(dancer.$node);

  });
  
  $('.dancerLineupButton').on('click', function(event) {
    if (!lineupOn) {
      lineupOn = true;

    } else {
      lineupOn = false;
    }
    for (var i = 0; i < window.dancers.length; i++) {
      lineUp(window.dancers[i], i);
    }
    

  });

  var lineUp = function(dancer, length) {
    if (lineupOn) { 
      if (length < 5) {
        dancer.setPosition(Math.random() * 100 + 300, Math.random() * 150 + 400);
      } else if (length < 10) {
        dancer.setPosition(Math.random() * 100 + 75, Math.random() * 150 + 825);
      } else if (length < 20) {
        dancer.setPosition(Math.random() * 150 + 450, Math.random() * 150 + 1100);
      } else {
        dancer.setPosition(Math.random() * 50 + 50, Math.random() * 200 + 100);
      }
    } else {
      dancer.setPosition(dancer.top, dancer.left);
    }
  };
});
