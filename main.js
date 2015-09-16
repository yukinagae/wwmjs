enchant();

window.onload = function() {
  var game = new Core(350, 350);
  game.fps = 30;
  game.preload('bigmonster1.gif', 'KickDrum.wav', 'FunkTrack.mp3', 'apad.png', 'icon0.png');
  var timing = [];
  var counter = 10;
  var note = 60 / 110.01 * 1;
  console.log(note);
  for(var i = 0; i < 1000; i++) {
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
    // m.tl.setTimeBased();

    var pad = new Sprite(100, 100);
    pad.image = game.assets['apad.png'];
    pad.x = 100;
    pad.y = 250;
    game.rootScene.addChild(pad);

    var energy = new Sprite(16, 16);
    energy.image = game.assets['icon0.png'];
    energy.x = 30;
    energy.y = 250 - 30;
    energy.frame = [10];
    energy.scale(2, 2);
    game.rootScene.addChild(energy);
    var es = [];
    es.push(energy);

    var judge = new Label()
    judge.font = "36px Arial";
    judge.x = 100;
    judge.y = 220;
    judge.text = '';
    game.rootScene.addChild(judge);

    var bgm = game.assets['FunkTrack.mp3'];
    bgm.play();
    bgm.volume -= 0.7;
    var beat = game.assets['KickDrum.wav'];
    game.rootScene.addEventListener('enterframe', function() {
      bgm.play();
      var now = bgm.currentTime;

      if(now > timing[index]) {
        index++;

        if(index % 2 === 0) {
          m.frame = [7];
        } else {
          m.frame = [4];
        }
      }

      var rest = Math.floor(counter / 10 - es.length);
      // console.log(rest);
      if(rest === 1) {
      // for(var i = 1; i < rest; i++) {
        var e = new Sprite(16, 16);
        e.image = game.assets['icon0.png'];
        e.x = 30;
        e.y = 250 - (30 * (es.length + 1));
        e.frame = [10];
        e.scale(2, 2);
        game.rootScene.addChild(e);
        es.push(e);
      // }
      }

    });
    game.rootScene.addEventListener('touchstart', function(e) {
      beat.play();

      pad.tl.scaleTo(2, 2).scaleBy(0.5, 2);
      for(var i = 0; i < es.length; i++) {
        es[i].tl.scaleTo(4, 2).scaleBy(0.5, 2);
      }

      console.log(counter);

      var now = bgm.currentTime;
      var time = timing[index];
      console.log(now);
      console.log(time);
      var diff = now - time + 0.4; // TODO this diff is not correct.
      console.log('##' + diff);
      if(diff < 0.1 && diff > -0.1) {
        judge.text = 'COOL';
        judge.tl.fadeIn(1).fadeOut(24);
        counter += 2;
      } else if(diff < 0.2 && diff > -0.2) {
          judge.text = 'GOOD';
        judge.tl.fadeIn(1).fadeOut(24);
        counter += 1;
      } else {
        judge.text = 'BAD';
        judge.tl.fadeIn(1).fadeOut(24);
      }
    });
  }

  // start
  game.start();
  console.log('game start');
};
