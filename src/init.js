$(document).ready(function() {
  window.dancers = [];
  window.team1 = [];
  window.team2 = [];
  window.viewers1 = [];
  window.viewers2 = [];
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
  

  $('.addMovementButton').on('click', function(event) {
    console.log(lineupOn, window.team1.length, window.team2.length);
    if (lineupOn && window.team1.length === 5 && window.team2.length === 5) {
      setInterval(function() {
        for (var i = 0; i < 5; i++) { 
          window.team1[i].setPosition(window.team1[i].top + (Math.random() - 0.5) * 50, window.team1[i].left + (Math.random() - 0.5) * 50);
          window.team2[i].setPosition(window.team2[i].top + (Math.random() - 0.5) * 50, window.team2[i].left + (Math.random() - 0.5) * 50);
        }
      }, 500);
    }
  });
  $('.addDancerButton').on('click', function(event) {

    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position
    var dancer = new dancerMakerFunction(
      $('body').height() * Math.random() * .80,
      $('body').width() * Math.random() * .80,
      Math.random() * 1000 + 1000
    );

    dancer.$node.append(memeFaces[memeSelector()]);
    if (window.team1.length < 5) {
      window.team1.push(dancer);
      lineUp(dancer, 'team1');
    } else if (window.team2.length < 5) {
      window.team2.push(dancer);
      lineUp(dancer, 'team2');
    } else if (window.viewers1.length < 10) {
      window.viewers1.push(dancer);
      lineUp(dancer, 'viewers1');
    } else {
      window.viewers2.push(dancer);
      lineUp(dancer, 'viewers2');
    }

    dancer.$node.hover(function() {
      dancer.imgheight = dancer.$node.children('img').attr('height');
      dancer.imgwidth = dancer.$node.children('img').attr('width');
      dancer.$node.children('img').animate({'height': dancer.imgheight * 2, 'width': dancer.imgwidth * 2});
    }, function() {
      dancer.$node.children('img').animate({'height': dancer.imgheight, 'width': dancer.imgwidth});
    });

    $('body').append(dancer.$node);

  });
  
  $('.dancerLineupButton').on('click', function(event) {
    if (!lineupOn) {
      lineupOn = true;

    } else {
      lineupOn = false;
    }
    for (var i = 0; i < window.team1.length; i++) {
      lineUp(window.team1[i], 'team1');
    } for (var i = 0; i < window.team2.length; i++) {
      lineUp(window.team2[i], 'team2');
    }
    for (var i = 0; i < window.viewers1.length; i++) {
      lineUp(window.viewers1[i], 'viewers1');
    }
    for (var i = 0; i < window.viewers2.length; i++) {
      lineUp(window.viewers2[i], 'viewers2');
    }
  });

  var lineUp = function(dancer, loc) {
    if (lineupOn) { 
      if (loc === 'team1') {
        dancer.setPosition(Math.random() * 250 + 250, Math.random() * 300 + 350);
      } else if (loc === 'team2') {
        dancer.setPosition(Math.random() * 150 + 75, Math.random() * 200 + 825);
      } else if (loc === 'viewers1') {
        dancer.setPosition(Math.random() * 200 + 450, Math.random() * 200 + 1100);
      } else {
        dancer.setPosition(Math.random() * 50 + 50, Math.random() * 200 + 100);
      }
    } else {
      dancer.setPosition(dancer.top, dancer.left);
    }
  };
});
