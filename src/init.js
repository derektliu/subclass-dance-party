$(document).ready(function() {
  window.dancers = [];
  var lineupOn = false;
  var memeFaces = ['<img src="./img/Jordan.png" height="100" width="75"></img>', '<img src="./img/Lebron.png" height="100" width="100"></img>', '<img src="./img/Yao.gif" height="100" width="75"></img>', '<img src="./img/Curry.png" height="100" width="80"></img>', '<img src="./img/Chalmers.png" height="100" width="75"></img>','<img src="./img/Basketball.png" height="100" width="100"></img>'];
  var memeSelector = function() {
    return Math.floor(Math.random() * 5);
  };
  $('.addBasketballButton').on('click', function(event) {
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');
    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];
    var basketball = new dancerMakerFunction(300, 650, 500);
    basketball.$node.append(memeFaces[5]);
    $('body').append(basketball.$node);
  });
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

    dancer.$node.append(memeFaces[memeSelector()]);
    window.dancers.push(dancer);

    dancer.$node.hover(function() {
      dancer.imgheight = dancer.$node.children('img').attr('height');
      dancer.imgwidth = dancer.$node.children('img').attr('width');
      console.log(dancer.imgheight, dancer.imgwidth);
      dancer.$node.children('img').animate({'height': dancer.imgheight * 2, 'width': dancer.imgwidth * 2});
    }, function() {
      dancer.$node.children('img').animate({'height': dancer.imgheight, 'width': dancer.imgwidth});
    });

    lineUp(dancer, window.dancers.length - 1);

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
        dancer.setPosition(Math.random() * 250 + 250, Math.random() * 300 + 350);
      } else if (length < 10) {
        dancer.setPosition(Math.random() * 150 + 75, Math.random() * 200 + 825);
      } else if (length < 20) {
        dancer.setPosition(Math.random() * 200 + 450, Math.random() * 200 + 1100);
      } else {
        dancer.setPosition(Math.random() * 50 + 50, Math.random() * 200 + 100);
      }
    } else {
      dancer.setPosition(dancer.top, dancer.left);
    }
  };
});
