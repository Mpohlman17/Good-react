//common
var dataCharity = function () {
	this.charityName = null;
	this.charityNextLine = null;
	this.charityAbout = null;
	this.charityUrl = null;
	this.address = null;
};
var listRandom = [];
var map;
var map_event;
var map_search;
var sliderInstance;
var latme;
var lngme;
var API_KEY = "AIzaSyAHzPSV2jshbjI8fqnC_C4L08ffnj5EN3A";
var API_KEY_PRO = "AIzaSyCDd9mg5blcxDthtRIGYiPaZCfCRgObEmI";

function arrayRemove(arr, value) {
	return arr.filter(function (ele) {
		return ele != value;
	});
}

function printMap(latme, lngme) {
	var queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latme + ',' + lngme + '&key=' + API_KEY;
	$.ajax({
		url: queryURL,
		method: 'GET'
	}).then(function (response) {
		const id = 'aa69566f';
		//var zip  = response.results[0].address_components[6].short_name;
		var zip = '17408';
		const key = '6e6269f3d39bb81c4b37878dfaaef2f6';
		queryURL = 'https://api.data.charitynavigator.org/v2/Organizations?app_id=' + id + '&app_key=' + key + '&pageSize=15&zip=' + zip;
		$.ajax({
			url: queryURL,
			method: 'GET'
		}).then(function (response) {
			for (let i = 0; i < response.length; i++) {
				let charityName = response[i].charityName
				let charityCity = response[i].mailingAddress.city
				let charityAddress = response[i].mailingAddress.streetAddress1
				let charityUrl = response[i].charityNavigatorURL
				let charityFocus = response[i].irsClassification.nteeType
				let charityNextLine = response[i].irsClassification.classification
				let charityAbout = response[i].irsClassification.affiliation
				let zip = response[i].mailingAddress.postalCode.split("-");
				let address = charityAddress + ", " + zip[0] + ", " + charityCity;

				var datacharity = new dataCharity();
				datacharity.charityName = charityName;
				datacharity.charityNextLine = charityNextLine;
				datacharity.charityAbout = charityAbout;
				datacharity.charityUrl = charityUrl;
				datacharity.address = address;
				listRandom.push(datacharity);
			}


			if (listRandom.length > 3) {
				for (let i = 0; i < 3; i++) {
					var randomItem = listRandom[Math.floor(Math.random() * listRandom.length)];
					listRandom = arrayRemove(listRandom, randomItem);
					var text = '<div class="image-column col-md-4 col-sm-6 col-xs-12"><div class="image-holder"><div class="image-content"><h5>' + randomItem.charityName + '<br>' + randomItem.charityNextLine + '</h5><p>' + randomItem.charityAbout + '</p><div class="link-btn"><a href="' + randomItem.charityUrl + '" target="_blank" class="btn-style-three">More Info</a></div></div></div></div>';
					$("#charity").append(text);
					getCoordinates(randomItem.charityName, randomItem.address, randomItem.charityUrl);
				}
			} else {
				for (let i = 0; i < listRandom.length; i++) {
					var text = '<div class="image-column col-md-4 col-sm-6 col-xs-12"><div class="image-holder"><div class="image-content"><h5>' + listRandom[i].charityName + '<br>' + listRandom[i].charityNextLine + '</h5><p>' + listRandom[i].charityAbout + '</p><div class="link-btn"><a href="' + listRandom[i].charityUrl + '" target="_blank" class="btn-style-three">More Info</a></div></div></div></div>';
					$("#charity").append(text);
					getCoordinates(listRandom[i].charityName, listRandom[i].address, listRandom[i].charityUrl);
				}
			}
		})

	});

}

function getCoordinates(charityName, address, url) {
	let queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + API_KEY;
	$.ajax({
		url: queryURL,
		method: 'GET'
	}).then(function (response) {
		var latitude = response.results[0].geometry.location.lat;
		var longitude = response.results[0].geometry.location.lng;
		map.addMarker({
			lat: latitude,
			lng: longitude,
			title: charityName,
			click: function (e) {
				window.open(url, '_blank');
			}
		});
	})
}

function printEvent(latme, lngme) {
	var latme = 39.910095;
	var lngme = -76.814430;
	const token = 'LTV5SOWTS6QBZF72VGDA';
	let queryURL = 'https://www.eventbriteapi.com/v3/events/search/?location.longitude=' + lngme + '&location.latitude=' + latme + '&expand=venue&token=' + token;
	$.ajax({
		url: queryURL,
		method: 'GET'
	}).then(function (response) {
		let results = response.events;
		//console.log("resultado "+results);
		for (var i = 0; i < results.length; i++) {
			let name = results[i].name.text
			let description = results[i].description.text
			if (description != null && description.length > 150) {
				description = description.substr(0, 150)
			}
			let url = results[i].url
			let date = new Date(results[i].start.local);
			let location = results[i].venue.address.localized_address_display + " - " + results[i].venue.address.country;
			let latitude = results[i].venue.address.latitude;
			let longitude = results[i].venue.address.longitude;
			map_event.addMarker({
				lat: latitude,
				lng: longitude,
				title: name,
				click: function (e) {
					window.open(url, '_blank');
				}
			});
			var todayDate = date.toISOString().slice(0, 10);
			var time = date.toTimeString().split(' ')[0];
			var text = '<div class="slide-item"><div class="left-side"><div class="image-box"><figure><a href="" ><img src="images/asfalt-light.png" alt=""></a></figure></div><h5>' + todayDate + '</h5></div><div class="right-side comment"><a href=' + url + ' target="_blank"><h4>' + name + '</h4></a><ul><li><i class="fa fa-clock-o" aria-hidden="true"></i>' + time + '</li><li><i class="fa fa-map-marker" aria-hidden="true"></i>' + location + '</li></ul><p>' + description + '</p></div></div>';
			$("#events-slide").append(text);

		}
		if ($('.events-slide').length) {
			var slider = $('.events-slide').bxSlider({
				auto: true,
				mode: 'vertical',
				nextText: '<i class="fa fa-angle-right"></i>',
				prevText: '<i class="fa fa-angle-left"></i>',
				maxSlides: 3,
				minSlides: 3,
				moveSlides: 1,
				pause: 5000,
				speed: 700,
				pagerCustom: '.events-section .slider-pager .thumb-box'
			});
			$('#slider-next').click(function () {
				slider.goToNextSlide();
				return false;
			});
			$('#slider-prev').click(function () {
				slider.goToPrevSlide();
				return false;
			});
		}
	})

}

(function($) {
	
	"use strict";

function expertizeRoundCircle () {
		var rounderContainer = $('.single-expertize .icon');
		if (rounderContainer.length) {
			rounderContainer.each(function () {
				var Self = $(this);
				var value = Self.data('value');
				var size = Self.parent().width();
				var color = Self.data('fg-color');

				Self.find('span').each(function () {
					var expertCount = $(this);
					expertCount.appear(function () {
						expertCount.countTo({
							from: 1,
							to: value*100,
							speed: 3000
						});
					});

				});
				Self.appear(function () {					
					Self.circleProgress({
						value: value,
						size: size,
						thickness: 20,
						emptyFill: 'rgba(0, 0, 0, .0)',
						animation: {
							duration: 3000
						},
						fill: {
							color: color
						}
					});
				});
			});
		};
	}
		
	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.preloader').length){
			$('.preloader').delay(200).fadeOut(500);
		}
	}
	
	//Update header style + Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop();
			if (windowpos >= 250) {
				$('.main-header').addClass('fixed-header');
				$('.scroll-to-top').fadeIn(300);
			} else {
				$('.main-header').removeClass('fixed-header');
				$('.scroll-to-top').fadeOut(300);
			}
		}
	}
	
	headerStyle();

	// Scroll to a Specific Div
	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');
				// animate
				$('html, body').animate({
					scrollTop: $(target).offset().top
				}, 1000);
		});
	}
	
	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown ul').length){
		$('.main-header li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');
		
		//Dropdown Button
		$('.main-header li.dropdown .dropdown-btn').on('click', function() {
			$(this).prev('ul').slideToggle(500);
		});
		
		
		//Disable dropdown parent link
		$('.navigation li.dropdown > a').on('click', function(e) {
			e.preventDefault();
		});
	}

	//Main BX-Slider
	/*if($('.events-slide').length){
		$('.events-slide').bxSlider({
			auto:true,
			mode:'vertical',
			nextSelector: '.events-section #slider-next',
	        prevSelector: '.events-section #slider-prev',
	        nextText: '<i class="fa fa-angle-right"></i>',
	        prevText: '<i class="fa fa-angle-left"></i>',
			maxSlides: 3,
			minSlides: 3,
			moveSlides: 1,
			pause: 5000,
			speed: 700,
			pagerCustom: '.events-section .slider-pager .thumb-box'
		});
	}*/
	
	//Contact Form Validation
	if($('#contact_form').length){
		$("#contact_form").validate({
		    submitHandler: function(form) {
		      var form_btn = $(form).find('button[type="submit"]');
		      var form_result_div = '#form-result';
		      $(form_result_div).remove();
		      form_btn.before('<div id="form-result" class="alert alert-success" role="alert" style="display: none;"></div>');
		      var form_btn_old_msg = form_btn.html();
		      form_btn.html(form_btn.prop('disabled', true).data("loading-text"));
		      $(form).ajaxSubmit({
		        dataType:  'json',
		        success: function(data) {
		          if( data.status == 'true' ) {
		            $(form).find('.form-control').val('');
		          }
		          form_btn.prop('disabled', false).html(form_btn_old_msg);
		          $(form_result_div).html(data.message).fadeIn('slow');
		          setTimeout(function(){ $(form_result_div).fadeOut('slow') }, 6000);
		        }
		      });
		    }
		});
	}

/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */
	$(window).on('scroll', function() {
		headerStyle();
	});
	
/* ==========================================================================
   When document is loaded, do
   ========================================================================== */
	$(window).on('load', function() {
		handlePreloader();
		expertizeRoundCircle();
		//galleryMasonaryLayout();
	});

})(window.jQuery);
