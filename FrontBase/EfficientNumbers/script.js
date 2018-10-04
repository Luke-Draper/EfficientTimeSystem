
function decToHex(dec) {
	return dec.toString(16);
}
function decToEff(dec) {
	if (dec >= CONVERSION_OFFSET) {
		dec -= CONVERSION_OFFSET;
	} else {
		dec += (MAX_DEC_TIME - CONVERSION_OFFSET);
	}
	return (dec * CONVERSION_FACTOR);
}
function decDigitToHexChar(dec) {
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
function effDecToEffHex(dec) {
	var hex = decToHex(dec);
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

$(document).ready(function(){
	setInterval(incrementMainDigit, 300);
	setupEffDigits();
});

function setupEffDigits() {
	$(".eff-digit").html('<div class="eff-digit-container" id="main-digit-3"><span class="d-0"></span><span class="d-1"></span><span class="d-2"></span><span class="d-3"></span><span class="d-4"></span><span class="d-5"></span><span class="d-6"></span><span class="d-7"></span><span class="d-8"></span></div>');
	setColor(".eff-digit", "red");
}
var current = 0;
function incrementMainDigit() {
	var main = $("#main-digit");
	main.removeClass("eff-"+decDigitToHexChar(current));
	current++;
	if (current>15) {
		current = 0;
	}
	main.addClass("eff-"+decDigitToHexChar(current));
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

function setColor(targetDigitSelector, color) {
	var target = $(targetDigitSelector);
	$(targetDigitSelector).find(".d-0").css("background","linear-gradient(45deg, transparent 28.8%, "+color+" 28.8%),linear-gradient(135deg, transparent 28.8%, "+color+" 28.8%),linear-gradient(225deg, transparent 28.8%, "+color+" 28.8%),linear-gradient(315deg, transparent 28.8%, "+color+" 28.8%);");
	console.log($(targetDigitSelector).find(".d-0"))
}