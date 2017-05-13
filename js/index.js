/**  
* jQuery.turn.js plugin  
*  
*  
*  
*  
*/  
  
;(function($, window, document, undefined) {        
  function Turn (el,opts) {
          this.x = 0,
          this.y = 0,
          this.imgX = 0,
          this.imgY = 0;
    this.$ = el;
    this.defaults = {  
        'speed': 10,
        'row': 1,
        'column': 24  
    }; 
    this.$.w = this.$.width();
    this.$.h = this.$.height();
    this.$.cw = this.$[0].clientWidth;
    this.$.ch = this.$[0].clientHeight;

    this.startX = 0;
    this.currentX = 0;
    this.frames = 0;      //旋转动画播放的帧数
    this.options = $.extend({}, this.defaults, opts); 
    this.bindEvents();
    this.initImg();
  };  

  Turn.prototype.bindEvents = function (el) {
    console.log(this.$.ch,this.$.ch);
    document.addEventListener('touchstart', this.onStart.bind(this));
    document.addEventListener('touchmove', this.onMove.bind(this));
    document.addEventListener('touchend', this.onEnd.bind(this));

    document.addEventListener('mousedown', this.onStart.bind(this));
    document.addEventListener('mousemove', this.onMove.bind(this));
    document.addEventListener('mouseup', this.onEnd.bind(this));

  };
  Turn.prototype.initImg = function(){
    var l = this.options.row,
        c = this.options.column,
        w = 1 / l * 100,
        h = 1 / c * 100;


    this.$.css({
      'background-size': w + '%',
      'background-position': '0 0',
      'background-repeat': 'no-repeat'
    });
  };


  Turn.prototype.onStart = function (e) {
    this.currentX = e.pageX || e.touches[0].pageX;
    this.startX = this.currentX;
  };

  Turn.prototype.onMove = function (e) {
    this.currentX = e.pageX || e.touches[0].pageX;
    var diff = this.startX - this.currentX;
    var dir = (diff > 0) ? 'left' : 'right';
    this.frames = Math.ceil(diff / 100 * this.options.speed);
    this.setImg(dir);
  };

  Turn.prototype.onEnd = function (e) {
    var diff = this.startX - this.currentX;
    
    this.startX = 0;
  }; 
  Turn.prototype.setImg = function (dir){
    var imgSize = 100 / (this.options.column - 1);
    for(var i=0;i<=this.frames;i++){

      console.log(dir);
      var d = dir;
      if(d == "left"){
        if(this.x < this.options.row - 1){
          this.x++;
        }else{
          this.x = 0;
          this.y++;
          if(this.y > this.options.column){
            this.y = 0;
          }
        };
      }else{
        if(this.x >= 0){
          this.x--;
        }else{
          this.x = this.options.row - 1;
          this.y--;
          if(this.y < 0 ){
            this.y = this.options.column-1;
          }
        };
      }
      this.imgX = imgSize * this.x;
      this.imgY = imgSize * this.y;
      this.$.css({
        'background-position': this.imgX + '% '+ this.imgY +'%'
      });
    }
  };
  $.fn.extend({  
      turn: function(opts) {  
          return this.each(function() {  
              new Turn($(this),opts);  
          })  
      }  
  })
})(jQuery, window, document);