/**  
* jQuery.TurnRound.js plugin  
*  
*  
*  
*  
*/  
  
;(function($, window, document, undefined) {  
    TurnRound = function (el,params) {
    	//assigning params
    	this.$ = el;
        this.total = params.total;
        this.speed = params.speed;
        this.picIdx = 0;
    	
    	this.isMoving = false;
    	this.currentX = 0;
    	this.currentImage=1;

        this.initPic();
        this.assignOperations();
    };

        TurnRound.prototype.initPic = function() {
            this.$.css({
              'background-size': '100%',
              'background-position': '0 0',
              'background-repeat': 'no-repeat'
            });
        };

        TurnRound.prototype.assignOperations = function() {
            var that = this;
            this.$.mousedown(function(target) {
                this.isMoving = true;
                this.currentX=target.pageX - this.offsetLeft;
            });

            $(document).mouseup(function() {
                this.isMoving = false;
            });

            this.$.mousemove(function(target) {
                if (this.isMoving == true) 
                    that.setImage(target.pageX - this.offsetLeft);
            });

            this.$.bind("touchstart", function() {
                this.isMoving = true
            });

            $(document).bind("touchend", function() {
                this.isMoving = false
            });

            this.$.bind("touchmove", function(target) {
                target.preventDefault();
                var actualTouch = target.originalEvent.touches[0] || target.originalEvent.changedTouches[0];
                if (this.isMoving == true) 
                    that.setImage(actualTouch.pageX - this.offsetLeft);
                else 
                    this.currentX = actualTouch.pageX - this.offsetLeft
            });
        };

        TurnRound.prototype.setImage = function (newX) {
            var showPos = 0,
                unit = 100 / (this.total-1);
            if (this.currentX - newX > 25 ) {
                this.currentX = newX;
                this.currentImage = --this.currentImage < 0 ? this.total-1 : this.currentImage;
                showPos = this.currentImage * unit;
                this.$.css({"background-position": '0% ' + showPos +'%'});
            } else if (this.currentX - newX < -25) {
                this.currentX = newX;
                this.currentImage = ++this.currentImage > this.total-1 ? 0 : this.currentImage;
                showPos = this.currentImage * unit;                
                this.$.css({"background-position": '0% ' + showPos +'%'});
            }
            
        };


    $.fn.extend({  
      TurnRound: function(params) {  
          return this.each(function() {  
              new TurnRound($(this), params);  
          });  
        }  
    });

 
})(jQuery, window, document);