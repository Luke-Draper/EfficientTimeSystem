/* -=- Efficient Number Math -=- */

const CONVERSION_FACTOR = 512/675;
const CONVERSION_OFFSET = 60*60*9; //09:00:00
const MAX_DEC_TIME = 60*60*24;

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

const DIGIT_HTML = '<div class="eff-digit-container"><span class="d-minus"></span><span class="d-0"></span><span class="d-1"></span><span class="d-2"></span><span class="d-3"></span><span class="d-4"></span><span class="d-5"></span><span class="d-6"></span><span class="d-7"></span><span class="d-8"></span></div>';

$(document).ready(function(){
	setupEffNumbers();
});

function setEffNumberValueFromMultiBaseMath(targetNumberSelector, decimalValue) {
	var val = new multiBaseInteger(decimalValue, 16).baseIntegerString;
	$(targetNumberSelector).attr("eff-number-value", val);
	updateEffNumbers(targetDigitSelector);
}
function setupEffNumbers() {
	updateEffNumbers(".eff-number");
}
function updateEffNumbers(targetNumberSelector) {
	$(targetNumberSelector).each(function() {
		var val = $(this).attr("eff-number-value");
		var size = $(this).attr("eff-digit-size");
		var out = '<div class="eff-number-container">';
		var columns = "";
		for (var i = 0; i<val.length;i++) {
			out += '<div class="eff-digit" eff-digit-value="'+val.charAt(i)+'" eff-digit-size="'+size+'">'+DIGIT_HTML+'</div>';
			columns += " auto";
		}
		out += "</div>"
		$(this).html(out);
		$(this).children(".eff-number-container").css("grid-template-columns", columns);
	});
	setupEffDigits();
}

function setupEffDigits() {
	setupEffDigitValue();
	setupEffDigitSize();
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
	if (hex == ".") {
		hex = "point";
	}
	$(targetDigitSelector).removeClass("eff-digit-minus eff-digit-point eff-digit-0 eff-digit-1 eff-digit-2 eff-digit-3 eff-digit-4 eff-digit-5 eff-digit-6 eff-digit-7 eff-digit-8 eff-digit-9 eff-digit-a eff-digit-b eff-digit-c eff-digit-d eff-digit-e eff-digit-f").addClass("eff-digit-"+hex);
}
function setupEffDigitValue() {
	updateEffDigitValue(".eff-digit");
}
function updateEffDigitValue(targetDigitSelector) {
	$(targetDigitSelector).each(function() {
		var val = $(this).attr("eff-digit-value");
		if (val == ".") {
			val = "point";
		}
		if (val == "-") {
			val = "minus";
		}
		$(this).removeClass("eff-digit-minus eff-digit-point eff-digit-0 eff-digit-1 eff-digit-2 eff-digit-3 eff-digit-4 eff-digit-5 eff-digit-6 eff-digit-7 eff-digit-8 eff-digit-9 eff-digit-a eff-digit-b eff-digit-c eff-digit-d eff-digit-e eff-digit-f");
		$(this).addClass("eff-digit-"+val);
	});
}
function setupEffDigitSize() {
	updateEffDigitSize(".eff-digit");
}
function setEffDigitSize(targetDigitSelector, size) {
	$(targetDigitSelector).css({"width": size, "height": size, "font-size": size});
}
function updateEffDigitSize(targetDigitSelector) {
	$(targetDigitSelector).each(function() {
		var size = $(this).attr("eff-digit-size");
		$(this).css({"width": size, "height": size, "font-size": size});
	});
}