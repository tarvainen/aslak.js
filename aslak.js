var aslak = (function () {

	function Aslak (id) {
		this.elements = {};
	}

	Aslak.prototype.setupElements = function (formid) {
		var eles = this.elements;
		if (formid) {

			var container = document.querySelector('[aslak-form=' + formid + ']');
			if (!container) {
				eles.inputs = [];
				return false;
			}

			eles.inputs = container.querySelectorAll('[aslak-validate]:not([aslak-ignore="true"])') || [];

		} else {
			eles.inputs = document.querySelectorAll('[aslak-validate]:not([aslak-ignore="true"])') || [];
		}
	}

	Aslak.prototype.validate = function (formid) {
		this.setupElements(formid);
		var success = true;

		for (var i = 0; i < this.elements.inputs.length; i++) {
			var input = this.elements.inputs[i];

			var validator = input.getAttribute('aslak-validate');

			if (!validator) {
				break;
			}

			var validators = validator.replace(/\s/g, '').split(',');
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
		return validator.match(/^([\w]*)\((.*?(?=\)))\)/);
	}

	Aslak.prototype.email = function (input) {
		return input.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/g);
	}

	Aslak.prototype.empty = function (input) {
		return !input || !input.value || input.value.length <= 0;
	}

	Aslak.prototype.min = function (input, min) {
		return input.value >= min;
	}

	Aslak.prototype.max = function (input, max) {
		return input.value <= max;
	}

	Aslak.prototype.integer = function (input) {
		return /^\d+$/.test(input.value);
	}

	Aslak.prototype.minLength = function (input, min) {
		return input.value.length >= min;
	}

	Aslak.prototype.maxLength = function (input, max) {
		return input.value.length <= max;
	}

	Aslak.prototype.match = function (input, regex) {
		var regex = new RegExp(regex, 'i');
		return regex.test(input.value);
	}

	return new Aslak();

}).call(this);