var aslak = (function () {

	function Aslak (id) {
		this.elements = {};
	}

	Aslak.prototype.setupElements = function () {
		var eles = this.elements;
		eles.inputs = document.querySelectorAll('[aslak-validate]:not([aslak-ignore="true"])') || [];
	}

	Aslak.prototype.validate = function () {
		this.setupElements();
		var success = true;

		for (var i = 0; i < this.elements.inputs.length; i++) {
			var input = this.elements.inputs[i];

			var validator = input.getAttribute('aslak-validate');

			if (!validator) {
				break;
			}

			var validators = validator.split(',');
			if (!this.runValidators(validators, input)) {
				if (success) {
					input.focus();
					success = false;
				}
			}
		}

		return success;
	}

	Aslak.prototype.runValidators = function (validators, input) {
		for (var j = 0; j < validators.length; j++) {
			if (this[validators[j]] && typeof this[validators[j]] === 'function') {
				if (!this[validators[j]](input)) {
					return false;
				}
			} else if (this.isFunctionWithCall(validators[j])) {
				var vals = this.isFunctionWithCall(validators[j]);
				if (typeof this[vals[1]] === 'function') {
					if (!this[vals[1]](input, vals[2])) {
						return false;
					}
				}
			}
		}

		return true;
	}

	Aslak.prototype.isFunctionWithCall = function (validator) {
		return validator.match(/[,|\s]([\w]*)\((.?(?=\)))\)/);
	}

	Aslak.prototype.email = function (input) {
		return input.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/g);
	}

	Aslak.prototype.empty = function (input) {
		return !input || !input.value || input.value.length <= 0;
	}

	Aslak.prototype.min = function (input, min) {
		console.log(input.value);
		console.log(min);
		return input.value >= min;
	}

	Aslak.prototype.max = function (input, max) {
		return input.value <= max;
	}

	return new Aslak();

}).call(this);