# aslak.js
A simple JavaScript form validation library.

# Installation
Just link the `aslak.js` in to your HTML file.

# Usage
Create your HTML file with a simple form with few text inputs and submit button. Also link the `aslak.js` in to your HTML file.
You have also to add `aslak-validate` attributes for your inputs you want to validate.

    <html>
      <head>
      <title>aslak.js</title>
      </head>
      
      <body>
      	<form id="aslakform">
      		<input type="text" aslak-validate="empty" placeholder="Name">
      		<input type="text" aslak-validate="email" placeholder="Email">
      		<button type="submit">Submit</button>
      	</form>
      
      </body>
      
      <script src="path_to_your_aslak_folder/aslak.js"></script>
      <script src="script.js"></script>
    </html>

In your `script.js` you have to define a submit listener for your `aslakform`.

    var el = document.getElementById('aslakform');
    
    el.addEventListener('submit', function () {
    	aslak.validate();
    });

And that is pretty much it. What this all will actually do is just tell the aslak that when it has to validate the form, it has to evaluate 
the functions listed in the `aslak-validate` attribute. All the functions listed in the attribute value will be ran except in the case 
when some of the checks fails (returns `false`).

# Predefined validating functions
`aslak.js` ships with few handy predefined validating functions
* empty - check that the inputs value is not empty
* email - check that the inputs value is some kind of email
* min(value) - check that the input value is greater than the given min value
* max(value) - check that the input value is smaller than the given max value
* integer - check that the input value is an integer
* minLength(value) - check that the input value is longer than the given min value
* maxLength(value) - check that the input value is shorter than the given max value
* match(regex) - check that the input value matches the pattern given

# Defining your own validating function
In the case you want to do something specific when the validation fails you are able to define your own `aslak.js` validation function.
The process is actually pretty simple. Only thing you have to do is to define a new function property for the `aslak` object.

    aslak.validateEmail = function (input) {
      if (!aslak.email(input)) {
        // handle your own error callback here!
        console.log('Invalid email!');
        return false;
      }
      return true;
    }

To use your self defined function you have to modify your input `aslak-validate` attribute.
      		
    <input type="text" aslak-validate="validateEmail" placeholder="Email">

# Other attributes

## aslak-ignore
In the case you use some kind of dynamic form changed by Angular etc. you may want to ignore some validations. To ignore the impact of the `aslak-validate` you have to use the `aslak-ignore` attribute with the value `true`.

    <input type="text" aslak-validate="empty" aslak-ignore="true" placeholder="Name">
    <input type="text" aslak-validate="empty" aslak-ignore="{{ binding.maybe.show }}" placeholder="Binding">

# License
WTFPL
