/* -=- Multi-Base Number Math -=- */

/* 
 * * * * Naming Scheme * *
 * Int = Integer
 * Dig = Digit
 * Str = String
 * Arr = Array
 * Cnv = convert
 * Dec = Decimal / Base 10
 * Bas = Bas / The current base in use
 * BasDecDig = Base Decimal Digit / The base 10 equivalent of the current digit in the current base i.e. 11 = b^B16
 */

const MULTI_BASE_DIGIT_ORDER_36_UNDER = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const MULTI_BASE_DIGIT_ORDER_100_UNDER = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99"];
const MULTI_BASE_DIGIT_ORDER_100_UNDER_DELIMITER = ":";

function MultiBaseInteger (decimalInteger, base) {
	base = truncate(base);
	if (base>1 && base<=100) {
		this.base = base;
	} else {
		this.base = 10;
	}
	if (decimalInteger >= 0) {
		this.positive = true;
	} else {
		this.positive = false;
	}
	this.decimalInteger = truncate(Math.abs(decimalInteger));
	this.baseDecimalDigitArray = cnvDecInt2BasDecDigArr(this.decimalInteger, this.base);
	this.baseDigitArray = cnvBasDecDigArr2BasDigArr(this.baseDecimalDigitArray, this.base);
	this.baseIntegerString = cnvBasDigArr2BasIntStr(this.baseDigitArray, this.base);
}

MultiBaseInteger.prototype.getDecimalInteger = function() {
	if (this.positive) {
		return this.decimalInteger;
	} else {
		return -1 * this.decimalInteger;
	}
}
MultiBaseInteger.prototype.addIntoCurrentBase = function(multiBaseIntegerToAdd) {
	return new MultiBaseInteger(this.getDecimalInteger() + multiBaseIntegerToAdd.getDecimalInteger(), this.base)
}
MultiBaseInteger.prototype.toString = function() {
	var out = "";
	if (!this.positive) {
		out += "-";
	}
	out += this.baseIntegerString;
	out += ("^B" + this.base);
	return out;
};

function truncate(n) {
	return n | 0;
}
function getRemainder(dividend, divisor) { // Top, Bottom
	return dividend % divisor;
}
function getQuotient(dividend, divisor) { // Top, Bottom
	return truncate(dividend / divisor);
}

function cnvDecInt2BasDecDigArr(decimalInteger, base) {
	base = truncate(base);
	decimalInteger = truncate(decimalInteger);
	outBaseDecDigArray = [];
	if (decimalInteger == 0) {
		outBaseDecDigArray.push(decimalInteger);
	} else {
		var currentDividend = decimalInteger;
		while (currentDividend != 0) {
			outBaseDecDigArray.push(getRemainder(currentDividend, base));
			currentDividend = getQuotient(currentDividend, base);
		}
		outBaseDecDigArray.reverse();
	}
	return outBaseDecDigArray;
}
function cnvBasDecDigArr2BasDigArr(baseDecimalDigitArray, base) {
	var outBaseDigitArray = [];
	for (var i=0; i<baseDecimalDigitArray.length; i++) {
		outBaseDigitArray.push(cnvBasDecDig2BasDig(baseDecimalDigitArray[i], base));
	}
	return outBaseDigitArray;
}
function cnvBasDecDig2BasDig(decimalDigit, base) {
	base = truncate(base);
	if (base>1 && base<=100) {
		this.base = base;
	} else {
		this.base = 10;
	}
	if (base<=36) {
		return MULTI_BASE_DIGIT_ORDER_36_UNDER[decimalDigit%base];
	} else if (base<=100) {
		return MULTI_BASE_DIGIT_ORDER_100_UNDER[decimalDigit%base];
	}
}
function cnvBasDigArr2BasIntStr(baseDigitArray, base) {
	var outBaseIntegerString = "";
	if (base<=36) {
		for (var i=0; i<baseDigitArray.length; i++) {
			outBaseIntegerString += baseDigitArray[i];
		}
	} else {
		for (var i=0; i<baseDigitArray.length; i++) {
			outBaseIntegerString += baseDigitArray[i];
			outBaseIntegerString += MULTI_BASE_DIGIT_ORDER_100_UNDER_DELIMITER;
		}
		outBaseIntegerString = outBaseIntegerString.slice(0,-1);
	}
	return outBaseIntegerString;
};



//Testing

$(document).ready(function(){
	$("#math-test-1").text("0.23 = "+truncate(0.23)+" 12.5 = "+truncate(12.5)+" -55.467 = "+truncate(-55.467));
	var outText = "";
	for (var i=2; i<= 100; i++) {
		outText += " -=- 100^B10 - B"+i+" = "+ String(new MultiBaseInteger(100, i));
	}
	outText += " -=- 100^B10 - B"+i+" = "+ String(new MultiBaseInteger(-10000, 16));
	$("#math-test-2").text(outText);
});

