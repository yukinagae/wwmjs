enchant();

window.onload = function() {
  var game = new Core(320, 320);
  game.fps = 30;
  game.preload('bigmonster1.gif', 'KickDrum.wav', 'bgm07.wav');
  var timing = [];
  var note = 60 / 115.09 * 1;
  for(var i = 0; i < 100; i++) {
    timing.push(i * note);
  }
  console.log(timing);
  var index = 0;
  game.onload = function() {
    console.log('game onload');
    var m = new Sprite(80, 80);
    m.image = game.assets['bigmonster1.gif'];
    m.x = 100;
    m.y = 100;
    m.frame = [4];
    m.scale(2, 2);
    game.rootScene.addChild(m);
    m.tl.setTimeBased();

    var judge = new Label()
    judge.font = "36px Arial"
    judge.x = 100
    judge.y = 250
    judge.text = 'START';
    game.rootScene.addChild(judge)

    var bgm = game.assets['bgm07.wav'];
    bgm.volume -= 0.7;
    var beat = game.assets['KickDrum.wav'];
    game.rootScene.addEventListener('enterframe', function() {
      bgm.play();
      var now = bgm.currentTime;

      if(now > timing[index]) {
        index++;

        if(index % 2 === 0) {
          m.x -= 10;
          m.y += 10;
        } else {
          m.x += 10;
          m.y -= 10;
        }
      }
    });
    game.rootScene.addEventListener('touchstart', function(e) {
      beat.play();

      var now = bgm.currentTime;
      var time = timing[index];
      console.log(now);
      console.log(time);
      var diff = now - time;
      console.log('##' + diff);
      if(diff < 0.1 && diff > -0.1) {
        judge.text = 'COOL';
      } else if(diff < 1 && diff > -1) {
          judge.text = 'GOOD';
      } else {
        judge.text = 'BAD';
      }
    });
  }

  // start
  game.start();
  console.log('game start');
};
