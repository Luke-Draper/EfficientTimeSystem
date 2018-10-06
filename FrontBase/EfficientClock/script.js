var standardTimeout;
var testTime=0;

function getTestTime() {
	return testTime+=2032;
}

function loadTime() {
	var current = new Date();//getTestTime());
	var hour = current.getHours();
	var minute = current.getMinutes();
	var second = current.getSeconds();
	var milli = current.getMilliseconds();
	var hourString = addZero(hour);
	var minuteString = addZero(minute);
	var secondString = addZero(second);
	var milliString = addZeros(milli);
	var currentSecond = (((hour*60)+minute)*60)+second+milli/1000;
	var efficientSecond = decToEffDec(currentSecond);
	var hexEquiv = decToHexFromMultiBaseMath(currentSecond);
	var efficientHexEquiv = decToHexFromMultiBaseMath(efficientSecond);
	var standardString = hourString + ":" + minuteString + ":" + secondString + "." + milliString;
	$('#dec-clock').text(standardString);
	$('#eff-dec-clock').text(String(efficientSecond).substr(0,7));
	$('#hexadec-clock').text(hexEquiv.substr(0,7));
	$('#eff-hexadec-clock').text(efficientHexEquiv.substr(0,4));
	setEffNumberValueFromMultiBaseMath('#main-clock-face', efficientSecond);
	updateText(efficientHexEquiv.substr(0,4));
	updateComparisonLine(efficientSecond);
}
function updateText(effHex) {
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

$(document).ready(function(){
	loadTime();
	standardTimeout = setInterval(loadTime, 100);
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