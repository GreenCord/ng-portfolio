$(document).ready(function(){
	var timer;
	var currentTitle = document.title;
	var isChangerNeeded = function() {
		if ($('#js-herochanger').length > 0) {
			return true;
		} else {
			return false;
		}
	};

function getHiddenProp(){
		var prefixes = ['webkit','moz','ms','o'];

		if ('hidden' in document) return 'hidden';
		for (var i = 0; i < prefixes.length; i++) {
			if ((prefixes[i] + 'Hidden') in document)
				return prefixes[i] + 'Hidden';
		}
		return null;
	}

	function isHidden() {
		var prop = getHiddenProp();
		if (!prop) return false;
		return document[prop];
	}

	var heroText = {
		words:
		[
			'working',
			'learning',
			'experimenting',
			'improving',
			'communicating',
			'collaborating'
		],

		pauser: function(blurred){
			var dontgo = 'Aw, don\'t leave :(';
			
			if ((isHidden() && blurred === undefined) || blurred) {
				document.title = dontgo;
				if (isChangerNeeded()) { clearTimeout(timer) };
			} else {
				document.title = currentTitle;
				if (isChangerNeeded()) { 
					timer = setTimeout( function(){
					heroText.textchg();
				},3750);
				}
			}
		},

		changer: function(text,fade) {
			if (fade) {
				$('#js-herochanger').fadeTo(400, 0, function(){
					$(this).text(text);
				}).fadeTo(400,1);
			} else {
				$('#js-herochanger').text(text);
			}
		},

		textchg: function(){
			if (isChangerNeeded()) {
				heroText.changer(heroText.words[i],true);
				if (i < (heroText.words.length - 1)) 
					{	i++; } 
				else 
					{	i = 0; }
				clearTimeout(timer);
				timer = setTimeout( function(){
					heroText.textchg();
				},3750);
			}
		}
		
	};

	// Start changer
  var i = 1;
  heroText.pauser(false);

	// Detect window/tab visibility
	
	var visProp = getHiddenProp();
	if (visProp) {
		var e = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
		document.addEventListener(e,heroText.pauser);
	}

	$(window).blur(function() {
		clearTimeout(timer);
		heroText.pauser(true)
	});
	$(window).focus(function() {
		heroText.pauser(false)
	});

	// Button click handler

	$('button').click(function(e){
		e.preventDefault();
		window.open($(this).attr('href'));
	});

});