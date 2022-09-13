"user strict";

// Preloader
$(window).on("load", function () {
	$(".preloader").fadeOut(1000);
});

// Menu Click Event
let trigger = $(".header-trigger");
let dropdown = $(".menu");
if (trigger || dropdown) {
	trigger.each(function () {
		$(this).on("click", function (e) {
			e.stopPropagation();
			dropdown.slideToggle();
			trigger.toggleClass("active");
		});
	});
	dropdown.each(function () {
		$(this).on("click", function (e) {
			e.stopPropagation();
		});
	});
	$(document).on("click", function () {
		if (parseInt(screenSize) < parseInt(991)) {
			dropdown.slideUp();
			trigger.removeClass("active");
		}
	});
}

// Submenu Click Event
$(".menu .menu-item .menu-link").on("click", function (e) {
	if (parseInt(screenSize) < parseInt(991)) {
		$(this).siblings(".sub-menu").slideToggle();
	}
});

//Menu Dropdown
$("ul>li>.sub-menu").parent("li").addClass("has-submenu");

// Detect Screen Size
let screenSize = window.innerWidth;
window.addEventListener("resize", function (e) {
	screenSize = window.innerWidth;
});

// Sticky Menu
var header = document.querySelector(".header");
if (header) {
	window.addEventListener("scroll", function () {
		header.classList.toggle("sticky", window.scrollY > 0);
	});
}

// Scroll To Top Event
var scrollTop = $(".scrollToTop");
$(window).on("scroll", function () {
	if ($(this).scrollTop() < 500) {
		scrollTop.removeClass("active");
	} else {
		scrollTop.addClass("active");
	}
});

// Click event to scroll to top
$(".scrollToTop").on("click", function () {
	$("html, body").animate(
		{
			scrollTop: 0,
		},
		300
	);
	return false;
});

// Slider Part
$(".what-slider").slick({
	fade: false,
	slidesToShow: 1,
	slidesToScroll: 1,
	infinite: true,
	autoplay: true,
	pauseOnHover: true,
	centerMode: false,
	dots: true,
	arrows: false,
	nextArrow: '<i class="las la-arrow-right arrow-right"></i>',
	prevArrow: '<i class="las la-arrow-left arrow-left"></i> ',
	responsive: [
		{
			breakpoint: 1199,
			settings: {
				slidesToShow: 1,
			},
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 1,
			},
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
			},
		},
		{
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
			},
		},
	],
});

// Slider Part
$(".roadmap-slider").slick({
	fade: false,
	slidesToShow: 6,
	slidesToScroll: 1,
	infinite: true,
	autoplay: false,
	pauseOnHover: true,
	centerMode: false,
	dots: true,
	arrows: false,
	nextArrow: '<i class="las la-arrow-right arrow-right"></i>',
	prevArrow: '<i class="las la-arrow-left arrow-left"></i> ',
	responsive: [
		{
			breakpoint: 1199,
			settings: {
				slidesToShow: 5,
			},
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 4,
			},
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 3,
			},
		},
		{
			breakpoint: 575,
			settings: {
				slidesToShow: 2,
			},
		},
	],
});

// Odometer Counter
let counter = $(".counter-item");
if (counter) {
	counter.each(function () {
		$(this).isInViewport(function (status) {
			if (status === "entered") {
				for (var i = 0; i < document.querySelectorAll(".odometer").length; i++) {
					var el = document.querySelectorAll(".odometer")[i];
					el.innerHTML = el.getAttribute("data-odometer-final");
				}
			}
		});
	});
}

//Faq Click Event
$(".faq-item__header").on("click", function (e) {
	var element = $(this).parent(".faq-item");
	if (element.hasClass("open")) {
		element.removeClass("open");
		element.find(".faq-item__content").removeClass("open");
		element.find(".faq-item__content").slideUp(300);
	} else {
		element.addClass("open");
		element.children(".faq-item__content").slideDown(300);
		element.siblings(".faq-item").children(".faq-item__content").slideUp(300);
		element.siblings(".faq-item").removeClass("open");
		element.siblings(".faq-item").find(".faq-item__content").slideUp(300);
	}
});

var videoItem = $(".video-pop");
if (videoItem) {
	videoItem.magnificPopup({
		type: "iframe",
	});
}

// Active Path Active
var path = location.pathname.split("/");
var current = location.pathname.split("/")[path.length - 1];
$(".menu li a").each(function () {
	if ($(this).attr("href").indexOf(current) !== -1 && current != "") {
		$(this).addClass("active");
	}
});

if ($(".datepicker-here-top-orientation")) {
	$(".datepicker-here-top-orientation").datepicker({
		orientation: "bottom",
		autoclose: true,
	});
}

$(".sidebar-toggler").on("click", function () {
	$(".sidebar").toggleClass("active");
	$(".overlay").toggleClass("overlay-color");
});

$(".overlay, .sidebar-close").on("click", function () {
	$(".sidebar").removeClass("active");
	$(".overlay").removeClass("overlay-color");
});

$("").on("click", function () {
	$("#click-to-remove").this(".faq-main-wrapper").remove();
});
$("#click-to-remove").on("click", function () {
	$("#in-progress").removeClass(".d-none");
});

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
	// This function will display the specified tab of the form...
	var x = document.getElementsByClassName("tab");
	x[n].style.display = "block";
	//... and fix the Previous/Next buttons:
	if (n == 0) {
		document.getElementById("prevBtn").style.display = "none";
	} else {
		document.getElementById("prevBtn").style.display = "inline";
	}
	if (n == x.length - 1) {
		document.getElementById("nextBtn").innerHTML = "Submit";
	} else {
		document.getElementById("nextBtn").innerHTML = "Next";
	}
	//... and run a function that will display the correct step indicator:
	fixStepIndicator(n);
}

function nextPrev(n) {
	// This function will figure out which tab to display
	var x = document.getElementsByClassName("tab");
	// Exit the function if any field in the current tab is invalid:
	if (n == 1 && !validateForm()) return false;
	// Hide the current tab:
	x[currentTab].style.display = "none";
	// Increase or decrease the current tab by 1:
	currentTab = currentTab + n;
	// if you have reached the end of the form...
	if (currentTab >= x.length) {
		// ... the form gets submitted:
		document.getElementById("regForm").submit();
		return false;
	}
	// Otherwise, display the correct tab:
	showTab(currentTab);
}

function validateForm() {
	// This function deals with validation of the form fields
	var x,
		y,
		i,
		valid = true;
	x = document.getElementsByClassName("tab");
	y = x[currentTab].getElementsByTagName("input");
	// A loop that checks every input field in the current tab:
	for (i = 0; i < y.length; i++) {
		// If a field is empty...
		if (y[i].value == "") {
			// add an "invalid" class to the field:
			y[i].className += " invalid";
			// and set the current valid status to false
			valid = false;
		}
	}
	// If the valid status is true, mark the step as finished and valid:
	if (valid) {
		document.getElementsByClassName("step")[currentTab].className += " finish";
	}
	return valid; // return the valid status
}

function fixStepIndicator(n) {
	// This function removes the "active" class of all steps...
	var i,
		x = document.getElementsByClassName("step");
	for (i = 0; i < x.length; i++) {
		x[i].className = x[i].className.replace(" active", "");
	}
	//... and adds the "active" class on the current step:
	x[n].className += " active";
}


var progressBarOptions = {
	startAngle: -1.55,
	size: 200,
	value: 0.75,
	fill: {
		color: "#ffa500",
	},
};

$('.circlechart').circlechart(); // Initialization