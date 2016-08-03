$(document).ready(function() {
  window.dancers = [];
  window.team1 = [];
  window.team2 = [];
  window.spectators1 = [];
  window.spectators2 = [];
  var lineupOn = false;
  var playing = false;
  var memeFaces = ['<img class="basketball" src="./img/Basketball.png" height="100" width="100"></img>',
  '<img src="./img/Jordan.png" height="100" width="75"></img>',
  '<img src="./img/Lebron.png" height="100" width="100"></img>',
  '<img src="./img/Yao.gif" height="100" width="75"></img>',
  '<img src="./img/Curry.png" height="100" width="80"></img>',
  '<img src="./img/Chalmers.png" height="100" width="75"></img>',
  '<img src="./img/Lebron2.png" height="100" width="100"></img>',
  '<img src="./img/SwaggyP.png" height="100" width="75"></img>',
  '<img src="./img/DeAndre.png" height="100" width="75"></img>',
  '<img src="./img/Melo.png" height="100" width="100"></img>'];
  var memeSelector = function() {
    return Math.floor(Math.random() * 9 + 1);
  };  

  $('.addMovementButton').on('click', function(event) {
    console.log(lineupOn);
    if (lineupOn && !playing) {
      if ( window.team1.length === 5 && window.team2.length === 5) {
        interval = setInterval(function() {
          for (var i = 0; i < 5; i++) { 
            window.team1[i].setPosition(window.team1[i].randHeight + (Math.random() - 0.5) * 100, window.team1[i].randWidth + (Math.random() - 0.5) * 100);
            window.team2[i].setPosition(window.team2[i].randHeight + (Math.random() - 0.5) * 100, window.team2[i].randWidth + (Math.random() - 0.5) * 100);
          }
        }, 500);
        playing = true;
      }
    } else {
      console.log(interval);
      clearInterval(interval);
      playing = false;
    }
  });

  $('.addDancerButton').on('click', function(event) {

    if (window.team1.length < 5 || window.team2.length < 5) {

      var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');
        
      var dancerMakerFunction = window[dancerMakerFunctionName];

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
      }

      dancer.$node.hover(function() {
        dancer.imgheight = dancer.$node.children('img').attr('height');
        dancer.imgwidth = dancer.$node.children('img').attr('width');
        dancer.$node.children('img').animate({'height': dancer.imgheight * 2, 'width': dancer.imgwidth * 2});
      }, function() {
        dancer.$node.children('img').animate({'height': dancer.imgheight, 'width': dancer.imgwidth});
      });

      $('body').append(dancer.$node);
    }

  });

  $('.addSpectatorButton').on('click', function(event) {

    var dancer = new Spectator(
      $('body').height() * Math.random() * .80,
      $('body').width() * Math.random() * .80,
      Math.random() * 1000 + 1000
    );

    dancer.$node.append(memeFaces[memeSelector()]);
    if (window.spectators1.length < 10) {
      window.spectators1.push(dancer);
      lineUp(dancer, 'spectators1');
    } else {
      window.spectators2.push(dancer);
      lineUp(dancer, 'spectators2');
    }

    $('body').append(dancer.$node);

  });
  
  $('.dancerLineupButton').on('click', function(event) {
    if (!lineupOn) {
      var basketball = new Basketball(300, 650, 500);
      basketball.$node.append(memeFaces[0]);
      $('body').append(basketball.$node);
      lineupOn = true;
    } else {
      $('.basketball').remove();
      lineupOn = false;
    }
    for (var i = 0; i < window.team1.length; i++) {
      lineUp(window.team1[i], 'team1');
    } for (var i = 0; i < window.team2.length; i++) {
      lineUp(window.team2[i], 'team2');
    }
    for (var i = 0; i < window.spectators1.length; i++) {
      lineUp(window.spectators1[i], 'spectators1');
    }
    for (var i = 0; i < window.spectators2.length; i++) {
      lineUp(window.spectators2[i], 'spectators2');
    }
  });

  var lineUp = function(dancer, loc) {
    if (lineupOn) { 
      if (loc === 'team1') {
        dancer.randHeight = Math.random() * 250 + 250;
        dancer.randWidth = Math.random() * 300 + 350;
      } else if (loc === 'team2') {
        dancer.randHeight = Math.random() * 150 + 75;
        dancer.randWidth = Math.random() * 200 + 825;
      } else if (loc === 'spectators1') {
        dancer.randHeight = Math.random() * 200 + 450;
        dancer.randWidth = Math.random() * 200 + 1100;
      } else {
        dancer.randHeight = Math.random() * 50 + 50;
        dancer.randWidth = Math.random() * 200 + 100;
      }
      dancer.setPosition(dancer.randHeight, dancer.randWidth);
    } else {
      dancer.setPosition(dancer.top, dancer.left);
    }
  };
});
