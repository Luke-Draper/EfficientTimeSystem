/* -=- Efficient Number Math -=- */

function decToHex(dec) {
	return dec.toString(16);
}
function decToEffDec(dec) {
	if (dec >= CONVERSION_OFFSET) {
		dec -= CONVERSION_OFFSET;
	} else {
		dec += (MAX_DEC_TIME - CONVERSION_OFFSET);
	}
	return (dec * CONVERSION_FACTOR);
}
function effDecToEffHex(dec) {
	return decToHex(dec);
}
function decToEffHex(dec) {
	return effDecToEffHex(decToEffDec(dec));
}
function incrementHexDigit(hex) {
	if (input == "0") {
		return "1";
	} else if (input == "1") {
		return "2";
	} else if (input == "2") {
		return "3";
	} else if (input == "3") {
		return "4";
	} else if (input == "4") {
		return "5";
	} else if (input == "5") {
		return "6";
	} else if (input == "6") {
		return "7";
	} else if (input == "7") {
		return "8";
	} else if (input == "8") {
		return "9";
	} else if (input == "9") {
		return "a";
	} else if (input == "a") {
		return "b";
	} else if (input == "b") {
		return "c";
	} else if (input == "c") {
		return "d";
	} else if (input == "d") {
		return "e";
	} else if (input == "e") {
		return "f";
	} else if (input == "f") {
		return "10";
	} else {
		return " ";
	}
}

/* -=- Efficient Number Conversion -=- */

function decToHexChar(dec) {
	if (dec < 10 && dec >= 0) {
		return String(dec).substr(0,1);
	} else if (dec == 10) {
		return "a";
	} else if (dec == 11) {
		return "b";
	} else if (dec == 12) {
		return "c";
	} else if (dec == 13) {
		return "d";
	} else if (dec == 14) {
		return "e";
	} else if (dec == 15) {
		return "f";
	} else {
		return " ";
	}
}
function hexMax1Digit(hex) {
	return hex.slice(-1);
}
function hexMin4Digit(hex) {
	if (hex.length < 1) {
		hex = "0000" + hex
	} else if (hex.length < 2) {
		hex = "000" + hex
	} else if (hex.length < 3) {
		hex = "00" + hex
	} else if (hex.length < 4) {
		hex = "0" + hex
	}
	return hex;
}
function convertEffHexCharToSyllable(input) {
	if (input == "0") {
		return "lo";
	} else if (input == "1") {
		return "la";
	} else if (input == "2") {
		return "go";
	} else if (input == "3") {
		return "ga";
	} else if (input == "4") {
		return "po";
	} else if (input == "5") {
		return "pa";
	} else if (input == "6") {
		return "do";
	} else if (input == "7") {
		return "da";
	} else if (input == "8") {
		return "ro";
	} else if (input == "9") {
		return "ra";
	} else if (input == "a") {
		return "ko";
	} else if (input == "b") {
		return "ka";
	} else if (input == "c") {
		return "bo";
	} else if (input == "d") {
		return "ba";
	} else if (input == "e") {
		return "to";
	} else if (input == "f") {
		return "ta";
	} else {
		return " ";
	}
}
function convertEffHexToSyllables(input) {
	var out = "";
	for (var i=0; i<input.length;i++) {
		out += convertEffHexCharToSyllable(input.charAt(i));
	}
	return out;
}

/* -=- Efficient Number Display -=- */

$(document).ready(function(){
	setupEffDigits();
});
function setupEffDigits() {
	$(".eff-digit").html('<div class="eff-digit-container" id="main-digit-3"><span class="d-0"></span><span class="d-1"></span><span class="d-2"></span><span class="d-3"></span><span class="d-4"></span><span class="d-5"></span><span class="d-6"></span><span class="d-7"></span><span class="d-8"></span></div>');
}

function setEffDigitColor(targetDigitSelector, color) {
	var target = $(targetDigitSelector);
	target.find(".d-0").attr("style","grid-area: d-0;width: 48%;height: 48%;background: "+color+";background:-moz-linear-gradient(45deg,  transparent 28.8%, "+color+" 28.8%),-moz-linear-gradient(135deg, transparent 28.8%, "+color+" 28.8%),-moz-linear-gradient(225deg, transparent 28.8%, "+color+" 28.8%),-moz-linear-gradient(315deg, transparent 28.8%, "+color+" 28.8%);background:-o-linear-gradient(45deg,  transparent 28.8%, "+color+" 28.8%),-o-linear-gradient(135deg, transparent 28.8%, "+color+" 28.8%),-o-linear-gradient(225deg, transparent 28.8%, "+color+" 28.8%),-o-linear-gradient(315deg, transparent 28.8%, "+color+" 28.8%);background:-webkit-linear-gradient(45deg,  transparent 28.8%, "+color+" 28.8%),-webkit-linear-gradient(135deg, transparent 28.8%, "+color+" 28.8%),-webkit-linear-gradient(225deg, transparent 28.8%, "+color+" 28.8%),-webkit-linear-gradient(315deg, transparent 28.8%, "+color+" 28.8%);background-position: bottom left, bottom right, top right, top left;-moz-background-size: 55% 55%;-webkit-background-size: 55% 55%;background-size: 55% 55%;background-repeat: no-repeat;");
	target.find(".d-1, .d-2").css("border-bottom-color", ""+color);
	target.find(".d-3, .d-4").css("border-left-color", ""+color);
	target.find(".d-5, .d-6").css("border-top-color", ""+color);
	target.find(".d-7, .d-8").css("border-right-color", ""+color);
}

function setEffDigitValue(targetDigitSelector, hex) {
	$(targetDigitSelector).removeClass("eff-0 eff-1 eff-2 eff-3 eff-4 eff-5 eff-6 eff-7 eff-8 eff-9 eff-a eff-b eff-c eff-d eff-e eff-f").addClass("eff-"+hex);
}