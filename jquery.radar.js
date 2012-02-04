(function($) {
  $.fn.radar = function(method) {
    
    var FRAMES_PER_CYCLE=20; // number of frames per radar cycle
    var FRAMERATE=20; // frames per second
    var RINGS = 3;  // number of radar rings rendered
    
    
    return this.each(function() {
      
      var $this = $(this);
      
      if (!$this.get(0).getContext) return; // no canvas support
      var ctx = $this.get(0).getContext("2d");
      
      var canvassize = ($this.width()<$this.height())?$this.width():$this.height();
      
      var ringsize = canvassize/(2*RINGS+1);
      var radiusmax = ringsize/2 + ringsize + (RINGS-1)*ringsize;
      
      var animationframe=0;
      
      function animateRadarFrame()
      {
        ctx.clearRect(0,0,$this.width(),$this.height());

        var radius;
        var alpha;
        
        for (var ringno=0;ringno<RINGS;ringno++)
        {
          radius = ringsize/2 + (animationframe/FRAMES_PER_CYCLE)*ringsize + ringno*ringsize;
          alpha = (radiusmax-radius)/radiusmax;
          ctx.beginPath();
          ctx.fillStyle = "rgba(0,0,0,"+alpha+")";
          ctx.arc($this.width()/2,$this.height()/2,radius,0,2*Math.PI,false);
          ctx.fill();
        }
        
        ctx.beginPath();
        ctx.fillStyle = "rgb(244,73,73)";
        ctx.arc($this.width()/2,$this.height()/2,ringsize/2,0,2*Math.PI,false);
        ctx.fill();
        
        if (animationframe>=(FRAMES_PER_CYCLE-1))
          animationframe=0;
        else
          animationframe=animationframe+1;
      }

      var radarAnimationID = setInterval(animateRadarFrame,1000/FRAMERATE); 

    })
  }
})( jQuery );