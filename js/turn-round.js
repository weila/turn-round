/**  
* jQuery.TurnRound.js plugin  
*  
*  
*  
*  
*/  
  
;(function($, window, document, undefined) {
    var  isMoving = false; 
    var TurnRound = function (el,params) {
    	//assigning params
    	this.$ = el;
        this.total = params.total;
        this.speed = params.speed;
        this.use = params.use;
        this.picIdx = 0;

    	this.currentX = 0;
    	this.currentImage = 0;

        this.initPic();
        this.assignOperations();
    };

        TurnRound.prototype.initPic = function() {
            if(this.use == 'bg' || this.use == 'background' || this.use == 'background-image'){
                this.$.css({
                  'background-size': '100%',
                  'background-position': '0 0',
                  'background-repeat': 'no-repeat'
                });
            }else if(this.use == 'img' || this.use == 'image'){
                this.$.css({
                  'position': 'absolute',
                  'clip': 'rect(0,100px,100px,0)'
                });
            }
        };

        TurnRound.prototype.assignOperations = function() {
            var that = this;
            this.$.mousedown(function(target) {
                isMoving = true;
                this.currentX=target.pageX - this.offsetLeft;
            });

            $(document).mouseup(function() {
                isMoving = false
            });

            this.$.mousemove(function(target) {
                if (isMoving){
                    that.setImage(target.pageX - this.offsetLeft);
                }
            });

            this.$.on("touchstart", function() {
                isMoving = true
            });

            $(document).on("touchend", function() {
                isMoving = false
            });

            this.$.on("touchmove", function(target) {
                target.preventDefault();
                var actualTouch = target.originalEvent.touches[0] || target.originalEvent.changedTouches[0];
                if (isMoving == true) 
                    that.setImage(actualTouch.pageX - this.offsetLeft);
                else 
                    this.currentX = actualTouch.pageX - this.offsetLeft
            });
        };

        TurnRound.prototype.setImage = function (newX) {
            var showPos = 0,
                unit = 100 / (this.total-1),
                height = 100;
                    if (this.currentX - newX > this.speed ) {
                        this.currentX = newX;
                        this.currentImage = --this.currentImage < 0 ? this.total-1 : this.currentImage;
                        showPos = this.currentImage * unit;

                        if(this.use == 'bg' || this.use == 'background' || this.use == 'background-image'){
                            this.$.css({"background-position": '0% ' + showPos +'%'});
                        }else if(this.use == 'img' || this.use == 'image'){
                            this.$.css({
                                "clip": 'rect('+ this.currentImage * height +'px,100px,' + (this.currentImage + 1) * height +'px,0)',
                                "margin-top": -1 * this.currentImage * height + 'px'
                            });

                        }

                    } else if (this.currentX - newX < -this.speed) {
                        this.currentX = newX;
                        this.currentImage = ++this.currentImage > this.total-1 ? 0 : this.currentImage;
                        showPos = this.currentImage * unit;

                        if(this.use == 'bg' || this.use == 'background' || this.use == 'background-image'){                
                            this.$.css({"background-position": '0% ' + showPos +'%'});
                        }else if(this.use == 'img' || this.use == 'image'){
                            this.$.css({
                                "clip": 'rect('+ this.currentImage * height +'px,100px,' + (this.currentImage + 1) * height +'px,0)',
                                "margin-top": -1 * this.currentImage * height + 'px'
                            });
                        }
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