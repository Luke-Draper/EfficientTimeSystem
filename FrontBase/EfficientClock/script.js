var standardTimeout;
var testTime=0;

function getTestTime() {
	return testTime+=2032;
}

function loadTime() {
	var current = new Date(getTestTime());
	var hour = current.getHours();
	var minute = current.getMinutes();
	var second = current.getSeconds();
	var milli = current.getMilliseconds();
	var hourString = addZero(hour);
	var minuteString = addZero(minute);
	var secondString = addZero(second);
	var milliString = addZeros(milli);
	var currentSecond = (((hour*60)+minute)*60)+second+milli/1000;
	var efficientSecond = decToEff(currentSecond);
	var hexEquiv = decToHex(currentSecond);
	var efficientHexEquiv = effDecToEffHex(efficientSecond);
	var standardString = hourString + ":" + minuteString + ":" + secondString + "." + milliString;
	$('#dec-clock').text(standardString);
	$('#eff-dec-clock').text(String(efficientSecond).substr(0,7));
	$('#hexadec-clock').text(hexEquiv.substr(0,7));
	$('#eff-hexadec-clock').text(efficientHexEquiv.substr(0,4));
	updateDigits(efficientHexEquiv.substr(0,4));
	updateComparisonLine(efficientSecond);
}
function updateDigits(effHex) {
	$(".eff-digit").removeClass("eff-0 eff-1 eff-2 eff-3 eff-4 eff-5 eff-6 eff-7 eff-8 eff-9 eff-a eff-b eff-c eff-d eff-e eff-f");
	$("#main-digit-0").addClass("eff-"+effHex.charAt(0));
	$("#main-digit-1").addClass("eff-"+effHex.charAt(1));
	$("#main-digit-2").addClass("eff-"+effHex.charAt(2));
	$("#main-digit-3").addClass("eff-"+effHex.charAt(3));
	$("#main-readout-0").text(convertEffHexCharToSyllable(effHex.charAt(0)));
	$("#main-readout-1").text(convertEffHexCharToSyllable(effHex.charAt(1)));
	$("#main-readout-2").text(convertEffHexCharToSyllable(effHex.charAt(2)));
	$("#main-readout-3").text(convertEffHexCharToSyllable(effHex.charAt(3)));
}

function updateComparisonLine(effDec) {
	var percent = 100*effDec/65535;
	$("#comparison-line").css("top", String(percent) + "%");
}

function addZero(input) {
	if (input < 10) {
		input = "0" + input;
	}
	return input;
}
function addZeros(input) {
	if (input < 10) {
		input = "00" + input;
	} else if (input < 100) {
		input = "0" + input;
	}
	return input;
}

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
	loadTime();
	standardTimeout = setInterval(loadTime, 10);
});


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