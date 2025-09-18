/*========================================================================
EXCLUSIVE ON themeforest.net
Template Name   : DOMINA - Domain sale and auction landing page
Author: ThemeAtelier
Created: March 2019
Last update: March 2019
========================================================================*/
/* TABLE OF CONTENTS
	1. PRELOADER
	2. PRACTICLEGROUND
	3. CONTACT FORM
	4. AJAX MAILCHIMP SUBSCRIBE
	5. LOCAL SUBSCRIPTION FORM
*/
var PATH = {};
(function ($) {
  "use strict";

  /******************** 1. PRELOADER ********************/
  PATH.preLoader = function () {
    $(".loader").fadeOut();
    $(".loader-wrapper").delay(1000).fadeOut("slow");
  };
  /******************** 2. PRACTICLEGROUND ********************/
  PATH.practicalGround = function () {
    var particles = document.getElementById("particles");
    if (particles) {
      particleground(particles, {
        dotColor: "#e6ebf3",
        lineColor: "#e6ebf3",
      });
    }
  };

  /******************** 3. CONTACT FORM ********************/
  PATH.contactForm = function () {
    function isValidEmail(emailAddress) {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      return pattern.test(emailAddress);
    }
    var $contact = $("#contact-form, #offer-form");
    if ($contact.length) {
      $contact.on("submit", function (e) {
        e.preventDefault();
        var success = $(this).find(".email-success"),
          failed = $(this).find(".email-failed"),
          loader = $(this).find(".email-loading"),
          postUrl = $(this).attr("action");
        var data = {
          name: $(this).find(".contact-name").val(),
          email: $(this).find(".contact-email").val(),
          subject: $(this).find(".contact-subject").val(),
          message: $(this).find(".contact-message").val(),
        };
        if (
          isValidEmail(data["email"]) &&
          data["message"].length > 1 &&
          data["name"].length > 1
        ) {
          $.ajax({
            type: "POST",
            url: postUrl,
            data: data,
            beforeSend: function () {
              loader.fadeIn(1000);
            },
            success: function (data) {
              loader.fadeOut(1000);
              success.delay(500).fadeIn(1000);
              failed.fadeOut(500);
            },
            error: function (xhr) {
              // if error occured
              loader.fadeOut(1000);
              failed.delay(500).fadeIn(1000);
              success.fadeOut(500);
            },
            complete: function () {
              loader.fadeOut(1000);
            },
          });
        } else {
          loader.fadeOut(1000);
          failed.delay(500).fadeIn(1000);
          success.fadeOut(500);
        }
        return false;
      });
    }
  };

  /******************** 4. AJAX MAILCHIMP SUBSCRIBE ********************/
  $("#subscribe-mailchimp").ajaxChimp({
    callback: mailchimpCallback,
    url: "https://site11.us3.list-manage.com/subscribe/post?u=post&amp;id=ID", // Replace your mailchimp post url inside double quote "".
  });

  function mailchimpCallback(resp) {
    var error_msg = $("#subscribe-mailchimp").find(".error-msg");
    var success_msg = $("#subscribe-mailchimp").find(".success-msg");

    if (resp.result === "success") {
      error_msg.fadeOut(200);
      success_msg.html(resp.msg).fadeIn(200);
    } else if (resp.result === "error") {
      success_msg.fadeOut(200);
      error_msg.html(resp.msg).fadeIn(200);
    }
  }

  /******************** 5. LOCAL SUBSCRIPTION FORM ********************/
  $("#subscribe").submit(function (e) {
    e.preventDefault();
    var email = $("#subscriber-email").val();
    var dataString = "email=" + email;

    function isValidEmail(emailAddress) {
      var pattern = new RegExp(
        /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
      );
      return pattern.test(emailAddress);
    }

    if (isValidEmail(email)) {
      $.ajax({
        type: "POST",
        url: "subscribe/subscribe.php",
        data: dataString,
        success: function () {
          $(".success-msg").fadeIn(1000);
          $(".error-msg").fadeOut(500);
          $(".hide-after").fadeOut(500);
        },
      });
    } else {
      $(".error-msg").fadeIn(1000);
    }

    return false;
  });

  /******************** 6. CURRENT YEAR ********************/
  var yearElement = document.getElementById("year");
  if (yearElement !== null) {
	yearElement.innerHTML = new Date().getFullYear();
  }
  /******************** 2.15 WOW JS ********************/
  var wow = new WOW({
    offset: 50,
    mobile: true,
  });
  wow.init();

  /* Document ready function */
  $(function () {
    PATH.practicalGround();
    PATH.contactForm();
  });
  /* Window on load function */
  $(window).on("load", function () {
    PATH.preLoader();
  });
})(jQuery);


(function ($) {

	"use strict";

	//brand part js
	$('.brand-main').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		dots: false,
		arrows: false,
		autoplaySpeed: 2500,
		responsive: [
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				}
    },
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				}
    },
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				}
    },

  ]
	});

	//reviews part js
	$('.review-main').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true,
		dots: false,
		arrows: true,
		nextArrow: '#reviews .fa-arrow-right',
		prevArrow: '#reviews .fa-arrow-left',
		autoplaySpeed: 2500,
		responsive: [
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
    },
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
    },
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				}
    },

  ]
	});
	
    // preloader js
    $(window).on('load', function () {
        $('#preloader').delay(1000).fadeOut(1000);

    });
	
	//animation scroll js
	var html_body = $('html, body');
	$('.navbar a, #backtotop #backtotop-value').on('click', function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name="' + this.hash.slice(1) + '"]');
			if (target.length) {
				html_body.animate({
					scrollTop: target.offset().top - 35
				}, 1500);
				return false;
			}
		}
	});

	// smooth scroll js 
	$(window).scroll(function () {
		var scrolling = $(this).scrollTop();
		var stikey = $('.sticky-top');
		var old_star = "images/star.png";
		var new_star = "images/star-red.png";

		if (scrolling >= 950 && scrolling <= 1910 ||
			scrolling >= 4150 && scrolling <= 5160) {
			$('#banner .marquee').addClass("marquee-white");
			$('.marquee img').attr('src', new_star);
		} else {
			$(stikey).removeClass("nav-bg");
			$('#banner .marquee').removeClass("marquee-white");
			$('.marquee img').attr('src', old_star);
		}

		if (scrolling >= 100) {
			$(stikey).addClass("nav-bg");
		} else {
			$(stikey).removeClass("nav-bg");
		}
	});

	// back to top
	$(document).ready(function () {
		let calcScrollValue = () => {
			let scrollProgress = document.getElementById("backtotop");
			let progressValue = document.getElementById("backtotop-value");
			let pos = document.documentElement.scrollTop;
			let calcHeight =
				document.documentElement.scrollHeight -
				document.documentElement.clientHeight;
			let scrollValue = Math.round((pos * 100) / calcHeight);
			if (pos > 100) {
				scrollProgress.style.display = "grid";
			} else {
				scrollProgress.style.display = "none";
			}
			scrollProgress.addEventListener("click", () => {
				document.documentElement.scrollTop = 0;
			});
			scrollProgress.style.background = `conic-gradient(#d71515 ${scrollValue}%, #FFF ${scrollValue}%)`;
		};

		window.onscroll = calcScrollValue;
		window.onload = calcScrollValue;
	});

	//parallax effect js
	var img_one = $('.banner-img.one');
	var banner_icon = $('.banner-icon');
	var img_two = $('.banner-img.two');

	var layer = $('.banner-images');

	layer.mousemove(function (e) {
		var ivalueX = (e.pageX * -1 / 30);
		var ivalueY = (e.pageY * -1 / 30);
		var cvalueX = (e.pageX * -1 / 40);
		var cvalueY = (e.pageY * -1 / 60);
		img_one.css('transform', 'translate3d(' + ivalueX + 'px,' + ivalueY + 'px, 0)rotate(6deg)');
		banner_icon.css('transform', 'translate3d(' + ivalueX + 'px,' + ivalueY + 'px, 0)rotate(20deg)');
		img_two.css('transform', 'translate3d(' + cvalueX + 'px,' + cvalueY + 'px, 0)');
	});

	// venobox player js
	new VenoBox({
		selector: ".button-circular, .veno-img",
		numeration: true,
		infinigall: true,
		share: true,
	});

	// counter part js
	$('.counter').counterUp();

}(jQuery));
