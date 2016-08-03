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
  var fight = '<img class= "fight hidden" src="./img/fight.png" height="300" width="300"></img>';
  var memeSelector = function() {
    return Math.floor(Math.random() * 9 + 1);
  };  
  $('body').append(fight);          
  $('.addMovementButton').on('click', function(event) {
    if (lineupOn && !playing) {
      if ( window.team1.length === 5 && window.team2.length === 5) {
        interval = setInterval(function() {
          for (var i = 0; i < window.team1.length; i++) { 
            window.team1[i].setPosition(window.team1[i].randHeight + (Math.random() - 0.5) * 100, window.team1[i].randWidth + (Math.random() - 0.5) * 100);
          }
          for (var i = 0; i < window.team2.length; i++) { 
            window.team2[i].setPosition(window.team2[i].randHeight + (Math.random() - 0.5) * 100, window.team2[i].randWidth + (Math.random() - 0.5) * 100);
          }
        }, 500);
        playing = true;
      }
    } else {
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
        dancer.lineUpNumber = window.team1.length;
        window.team1.push(dancer);
        lineUp(dancer, 'team1');
      } else if (window.team2.length < 5) {
        dancer.lineUpNumber = window.team2.length;
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
      /************************************ Foul ******************************************/
      dancer.$node.on('click', function(event) {
        if (playing === true && team1.length === team2.length) {

          var player1 = window.team1[dancer.lineUpNumber];
          var player2 = window.team2[dancer.lineUpNumber];

          var collisionTop = Math.random() * 300 + 100;
          var collisionLeft = Math.random() * 500 + 300;
          if (player1 === undefined) {
          }
          player1.setPosition(collisionTop, collisionLeft, 700);
          player2.setPosition(collisionTop, collisionLeft, 700);
          setTimeout(function() {
            $('.fight').css({'top': collisionTop-100, 'left': collisionLeft-100});
            $('.fight').removeClass('hidden');
            $('.fight').addClass('visible');
          }, 500);

          // console.log('before: ', window.team1);
          window.team1.splice(dancer.lineUpNumber, 1);
          window.team2.splice(dancer.lineUpNumber, 1);
          for (var i = dancer.lineUpNumber; i < team1.length; i++) {
            var nextDancer = window.team1[i];
            nextDancer.lineUpNumber--;
            var nextDancer = window.team2[i];
            nextDancer.lineUpNumber--;
          }
          // console.log('after: ', window.team1);
          window.spectators2.push(player1);
          window.spectators2.push(player2);
          setTimeout(function() {
            lineUp(player1, 'spectators2');
            lineUp(player2, 'spectators2');
            $('.fight').removeClass('visible');
            $('.fight').addClass('hidden');
          }, 2000);
        }
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
        dancer.randHeight = Math.random() * 450 + 200;
        dancer.randWidth = Math.random() * 500 + 300;
      } else if (loc === 'team2') {
        dancer.randHeight = Math.random() * 150 + 75;
        dancer.randWidth = Math.random() * 300 + 875;
      } else if (loc === 'spectators1') {
        dancer.randHeight = Math.random() * 300 + 400;
        dancer.randWidth = Math.random() * 200 + 1100;
      } else {
        dancer.randHeight = Math.random() * 50;
        dancer.randWidth = Math.random() * 500 + 50;
      }
      dancer.setPosition(dancer.randHeight, dancer.randWidth, 500);
    } else {
      dancer.setPosition(dancer.top, dancer.left);
    }
  };
});
