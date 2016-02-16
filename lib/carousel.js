// from http://www.competa.com/blog/2015/07/fullscreen-image-slider-with-vanilla-javascript/
var Carousel = function(frameSelector, sliderSelector, slidesSelector, btnLeftSelector, btnRightSelector) {
  //A variable to store the position of the slides
  var leftPosition = 0;
  var frame = document.querySelector(frameSelector);
  var slides = document.querySelectorAll(slidesSelector);
  //Get the number of slides in the slider
  var slidesNumber = slides.length;
  var leftButton = document.querySelector(btnLeftSelector);
  var rightButton = document.querySelector(btnRightSelector);
  var slider = document.querySelector(sliderSelector);

  //Add classes to frame and slider divs
  frame.classList.add('frame');
  slider.classList.add('slider');

  //Event listeners for when the user clicks on the arrows
  leftButton.addEventListener("click", function() {
    carousel.previous();
  });

  rightButton.addEventListener("click", function() {
    carousel.next();
  });

  //Function that moves the slides left or right depending on variable value
  //Moves to the next slide if value is -1, moves to the previous is value is 1
  var moveSlide = function(value) {
    leftPosition += value * 100;
    slider.style.left = leftPosition + '%';
  };

  return {
    //Function to move to next slide
    next: function() {
      if (leftPosition > (slidesNumber - 1) * -100) {
        moveSlide(-1);
      } else {
        leftPosition = 0;
        slider.style.left = leftPosition + '%';
      }
    },
    //Function to go to previous slide
    previous: function() {
      if (leftPosition !== 0) {
        moveSlide(1);
      } else {
        leftPosition = (slidesNumber - 1) * -100;
        slider.style.left = leftPosition + '%';
      }
    }
  };
};

//Create new instance of Carousel
var carousel = new Carousel('#frame', '#slider', '#slider .slide', '.arrowLeft', '.arrowRight');


/*
    <div id="frame">
        <div id="slider">
            <div class="slide" id="picture1"></div>
            <div class="slide" id="picture2"></div>
            <div class="slide" id="picture3"></div>
            <div class="slide" id="picture4"></div>
        </div>
    </div> 
    <img src="img/arrow_left.png" class='arrowLeft'/>
    <img src="img/arrow_right.png" class='arrowRight'/>
 */


/*
.arrowLeft {
    float: left;
    margin-top: 20%;
}
 
.arrowRight {
    float: right;
    margin-top: 20%;
}
 
.frame {
    position: absolute; 
    z-index: -1; 
    margin: auto; 
    left: 0; 
    right: 0;
    top: 0;
    height: 100%;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
}
 
.slider {
    position: relative;
    transition: 1s;
    height: 110%;
}
 
.slide {
    width: 100%;
    height: 100%;
    margin: 0 -4px 0 0;
    display: inline-block;
}
 
#picture1 {
    background-position: center;
    background-size: cover;
    background-image: url("img/picture1.jpg");
}
 
#picture2 {
    background-position: center;
    background-size: cover;
    background-image: url("img/picture2.jpg");
}
 
#picture3 {
    background-position: center;
    background-size: cover;
    background-image: url("img/picture3.jpg");
}
 
#picture4 {
    background-position: center;
    background-size: cover;
    background-image: url("img/picture4.jpg");
}

 */
