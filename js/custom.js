(function($) {
    "use strict"; // Start of use strict

    console.log('Welcome to my little site...');

    // validate the contact form submission
    $('#contact-submit').on('click', function(){

      //cache element(s)
      var $form = $('#contact-form');
      // create a reference to 'this' (button) to use inside the ajax call
      var submitBtn = this;

      // reset errors
      $form.find(this).attr('disabled', true);
      $form.find('div').removeClass('has-error');
      $form.find('.f_error').remove();
      $form.find('.ajax-response').empty();

      var formData = {
        name: $form.find('#c_name').val(),
        email: $form.find('#c_email').val(),
        message: $form.find('#c_message').val()
      }

      var formDataJSON = JSON.stringify(formData);

      $.ajax({
        url: 'contact.php',
        data: {"data":formData},
        type: 'post',
        // beforeSend: function() {
        // },
        success: function(data) {
          var dataObj = JSON.parse(data);
          if (dataObj.errors) {
            for (var e in dataObj.errors) {
              $form.find('#' + e)
              .parent()
              .addClass('has-error')
              .append('<div class="f_error">' + dataObj.errors[e] +  '</div>')
              .find('span')
              .addClass('fa-times');
            }
          } else {
            $form.find("input[type=text], input[type=email], textarea").val('');
            $('.ajax-response').append('"' + dataObj.message + '"');
          }
        }
      })
      .done(function(data){
        $(submitBtn).attr('disabled', false);
        }
      );

      return false;
    });

    //pre fetch the json data for the modal of recent work
    var modalContent;
    if (typeof modalContent == 'undefined') {
      $.getJSON("./js/modalRecentContent.json", function(result){
        modalContent = result;
      });
    }
    // fill modal with data based on button data-num attribute
    $("#projectsCarousel").on('click', 'button.info', function() {

    	var dataNum = this.attributes[3].textContent;

      // cache modal dom element
      var $recentModal = $('#recentModal');
    	//$('.modal-title').text(modalContent[dataNum-1][0]);
      $recentModal.find('.modal-title').html('<a href="' + modalContent[dataNum-1].link + '" target="_blank">' + modalContent[dataNum-1].title + '</a>');
    	$recentModal.find('.modal-body img').attr('src', 'img/portfolio/' + dataNum + '-sm.jpg');
      $recentModal.find('.modal-body-content p').text(modalContent[dataNum-1].desc);
      var $modalBodyLi = $recentModal.find('.modal-body-content ul').empty();
      $.each(modalContent[dataNum-1].desclist, function(i) {
        $modalBodyLi.append('<li>'+ modalContent[dataNum-1].desclist[i] +'</li>');
      });

    });

    $('#projectsCarousel').carousel({
      interval: 5000
    })

    $('.carousel .item').each(function(){
      var next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));

      if (next.next().length>0) {
        next.next().children(':first-child').clone().appendTo($(this));
      } else {
      	$(this).siblings(':first').children(':first-child').clone().appendTo($(this));
      }
    });

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

    /*-------------------------------
      CENTER MAIN HEADER CONTENT VERTICALY
    -------------------------------*/
    function mainHeaderContent() {
      var winHeight = $(window).innerHeight();

      // @screen width => 992px
      if ($(window).width() >= 992) {
        var mainHeaderContentMargin = -($('.main-header-content').height() / 2);

        $('.main-header-content').css('margin-top', mainHeaderContentMargin);
      }

  	// @screen width => 768px and <= 991px
  	else if ($(window).width() >= 768 && $(window).width() <= 991) {
        var headerContainerHeight = $('.main-header > .container').height();

        if ((winHeight - 100) <= headerContainerHeight) {
          $('.main-header > .container').css('margin', '110px 0 60px');
        }

        else {
          var headerContainerMargin = (50 + ((winHeight - 100) - headerContainerHeight)) / 2;

          $('.main-header > .container').css('margin-top', headerContainerMargin);
        }
  	}

  	// @screen width <= 767px
  	else {
        var headerContainerHeight = $('.main-header > .container').height();

        if ((winHeight - 50) <= headerContainerHeight) {

        }

        else {
          var headerContainerMargin = (50 + (winHeight - headerContainerHeight)) / 2;

          $('.main-header > .container').css('margin-top', headerContainerMargin);
        }
  	};
    };

    mainHeaderContent();

    $(window).resize(function() {
  	mainHeaderContent();
    });



})(jQuery); // End of use strict
