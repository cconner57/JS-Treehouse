//Sets Focus to first input field
$("#name").focus();

// Job Section
$("#other-title").hide(); //Hide other input
$('#title').change(function(){
    $(this).val() === 'other' ? $("#other-title").show() : $("#other-title").hide(); //Show or hide input
});

// T-Shirt Section
$("#design option:first").hide();

// Hide Color Selections
$('#color').hide();
$('#color2').hide();
$('#color-text').text('Please select a T-shirt theme')

// Hide/Show Color Selections
$("#design").change(function(){
    $('#color-text').hide();
    if($(this).val() === 'js puns') {
        $('#color').show();
        $('#color2').hide();
    } else if($(this).val() === 'heart js') {
        $('#color2').show();
        $('#color').hide();
    }
});

// Activities Section
let costElement = $('<label>Total: $</label>').hide();
let totalCost = 0;
let element;
let $text;
let $dollarIndex;
let cost;
let dashIndex;
let commaIndex;
let dayAndTime;
const $activityInputs = $('.activities input');

$('.activities').append(costElement);

$('.activities').change(function(e){
    element = $(e.target);
    $text = $(element).parent().text();
    $('#errActivities').hide();

// Cost Section - Add or Subtract Cost
    cost = parseFloat($text.slice(-3));
    $(element).is(':checked') ? totalCost += cost : totalCost -= cost;
    $(costElement).text('Total: $' + totalCost);
    $('.activities input:checked').length > 0 ? $(costElement).show() : $(costElement).hide();

//Activities Section - Enable or Disable Activity
    dashIndex = $text.indexOf('—');
    commaIndex = $text.indexOf(',');
    dayAndTime = $text.slice(dashIndex + 1, commaIndex);

    $($activityInputs).each(function(){
        if ($(this).parent().text().includes(dayAndTime)
            && $(this).parent().text() !== $text) {
                $(element).is(':checked') ? $(this).attr('disabled', true) : $(this).attr('disabled', false);
            }
    });
});

// Payment Section
$('#payment option:first').hide();
$('#payment option:eq(1)').attr('selected', true);
$('#paypal-section').hide();
$('#bitcoin-section').hide();

// Hide Paypal or Bitcoin
$('#payment').change(function(){
    if (($(this).val() === 'credit card')) {
        $('#credit-card').show();
        $('#paypal-section').hide();        
        $('#bitcoin-section').hide();
    } else if ($(this).val() === 'paypal') {
        $('#paypal-section').show();
        $('#credit-card').hide();
        $('#bitcoin-section').hide();
    } else if (($(this).val() === 'bitcoin')) {
        $('#bitcoin-section').show();
        $('#credit-card').hide();
        $('#paypal-section').hide();
    }
});

// Form Validation
const $errName = $('<p>Valid name is required.</p>').attr('id', 'errName').addClass('error').hide().insertBefore('#name');

//Name Validation
function validateName() {
    if (/^[a-z][a-z\s]*$/i.test($('#name').val())) {
        $('#name').css('border', '');
        $('#errName').hide();
        return true;
    } else {
        $('#name').css('border', '1px solid red');
        $('#errName').show();
        return false;
    }
}

$('#name').focusout(function(){
    if ($('#name').val() !== "") {
        validateName()
    } else {
        $('#name').css('border', '');
        $('#errName').hide();
    };
});

// Email Validation
const $errEmail = $('<p>Please enter a valid email address.</p>').attr('id', 'errEmail').addClass('error').hide().insertBefore('#mail');

function validateEmail() {
    const pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    if (pattern.test($('#mail').val())) {
        $('#mail').css('border', '');
        $('#errEmail').hide();
        return true;
    } else {
        $('#mail').css('border', '1px solid red');
        $('#errEmail').show();
        return false;
    };
}   

$('#mail').focusout(function(){
    if ($('#mail').val() !== "") {
        validateEmail()
    } else {
        $('#mail').css('border', '');
        $('#errEmail').hide();
    };
});

// Activity Section Validation
const $errActivities = $('<p>Please select at least one activity.</p>').attr('id', 'errActivities').addClass('error').hide().insertAfter('.activities legend');

function validateActivities() {
    if ($('.activities input:checked').length > 0) {
        $('#errActivities').hide();
        return true;
    } else {
        $('#errActivities').show();
        return false;
    };
}

// Credit Card Validation
const $errCC = $('<p>Please enter a valid credit card number.</p>').attr('id', 'errCC').addClass('error').hide().insertAfter('#payment');

function validateCreditCardNum() {
    if ($('#payment').val() === 'credit card') {  
        if (/^\d{13,16}$/.test($('#cc-num').val())) {  
            $('#errCC').hide();
            $('#cc-num').css('border', '');
            return true;
        } else {
            if (($('#cc-num').val().length <= 12 || $('#cc-num').val().length >= 17) && $.isNumeric($("#cc-num").val())) {
                $('#errCC').text('Please enter a number that is between 13 and 16 digits long.')
            } else {
                $('#errCC').text('Please enter a valid credit card number.')
            }
            $('#errCC').show();
            $('#cc-num').css('border', '1px solid red');
            return false;
        };
    } else {
        return true;
    }
}

$('#cc-num').focusout(function(){
    if ($('#cc-num').val() !== '') {
        validateCreditCardNum();
    } else {
        $('#errCC').hide();
        $('#cc-num').css('border', '');
    }
});

// Zip Code Validation
const $errZip = $('<p>Please enter a valid Zip Code.</p>')
    .attr('id', 'errZip')
    .addClass('error')
    .hide()
    .insertAfter('#errCC');

function validateZipCode() {
    if ($('#payment').val() === 'credit card') {    
        if (/^\d{5}$/.test($('#zip').val())) {
            $('#errZip').hide();
            $('#zip').css('border', '');
            return true;
        } else {
            $('#errZip').show();
            $('#zip').css('border', '1px solid red');
            return false;
        };
    } else {
        return true;
    }
}

$('#zip').focusout(function(){
    if ($('#zip').val() !== '') {
        validateZipCode();
    } else {
        $('#errZip').hide();
        $('#zip').css('border', '');
    }
});

// CVV Validation
const $errCVV = $('<p>Please enter a valid CVV.</p>').attr('id', 'errCVV').addClass('error').hide().insertAfter('#errZip');

function validateCVV() {
    if ($('#payment').val() === 'credit card') { 
        if (/^\d{3}$/.test($('#cvv').val())) {
            $('#errCVV').hide();
            $('#cvv').css('border', '');
            return true;
        } else {
            $('#errCVV').show();
            $('#cvv').css('border', '1px solid red');
            return false;
        };
    } else {
        return true;
    }
}

$('#cvv').focusout(function(){
    if ($('#cvv').val() !== '') {
    validateCVV();
    } else {
        $('#errCVV').hide();
        $('#cvv').css('border', '');
    }
});


// Validate All
const validateAll = () => {
    if (validateName() && validateEmail() && validateActivities() && validateCreditCardNum() &&
        validateZipCode() && validateCVV()) {
            return true;
    } else {
        validateName();
        validateEmail();
        validateActivities();
        validateCreditCardNum();
        validateZipCode();
        validateCVV();
        return false;
    }
}

// Event Listener for Submit Button
$('button').on('click', function(e){
    e.preventDefault();
    const validation = validateAll();
    if (!validation) {
        validateAll();
        return false;
    } else {
        $('form').submit();
    }
});