$(document).ready(function(e){
    //PHIL PATIENT ACCESS PLATFORM INQUIRY
    $("#manufacturersInquiry").submit(function (e) {
        e.preventDefault();
        var baseUrl = apiEndPoint + "/api/web/v1/manufacturers/inquiry";
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        var body = $('#manufacturersInquiry').serializeArray();

        var postBody = formValidation(body);
        if(postBody) {
            $.ajax({
                type: "POST",
                url: baseUrl,
                headers: headers,
                data: JSON.stringify(postBody),
                success: function (result) {
                    if (result.data == "OK") {
                        $('.manufacturers-page__button').prop('disabled',true);
                        setTimeout(function() { 
                            $('.manufacturers-page__button').css('display','none');
                            $('.manufacturers-page__form-text').css('display','block');
                            $('.form__input__input').val("");
                        }, 2000);
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
    });

    //Pharmacy Inquiry FOR
    $("#pharmacyInquiry").submit(function (e) {
        e.preventDefault();
        var baseUrl = apiEndPoint + "/api/web/v1/pharmacy/inquiry";
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        var body = $('#pharmacyInquiry').serializeArray();

        var postBody = formValidation(body);
        if(postBody) {
            $.ajax({
                type: "POST",
                url: baseUrl,
                headers: headers,
                data: JSON.stringify(postBody),
                success: function (result) {
                    if (result.data == "OK") {
                        $('.pharmacy-inquiry-submit').prop('disabled',true);
                        setTimeout(function() { 
                            $('.pharmacy-inquiry-submit').css('display','none');
                            $('.pharmacy-page__form-text').css('display','block');
                            $('.form__input__input').val("");
                        }, 2000);
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
    });

    //PATIENT CONTACT FORM
    $("#patientContact").submit(function (e) {
        e.preventDefault();
        var baseUrl = apiEndPoint + "/api/web/v1/contact-us";
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        var body = $('#patientContact').serializeArray();
        
        var postBody = formValidation(body);
        if(postBody) {
            $.ajax({
                type: "POST",
                url: baseUrl,
                headers: headers,
                data: JSON.stringify(postBody),
                success: function (result) {
                    if (result.data == "OK") {
                        $('.patient-contact-page__button').prop('disabled',true);
                        setTimeout(function() { 
                            $('.patient-contact-page__button').css('display','none');
                            $('.patient-contact-page__form-text').css('display','block');
                            $('.form__input__input').val("");
                            $('.form__textarea__input').val("");
                        }, 2000);
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
    });

    function formValidation(body){
        var validation = true;
        var jsonBody = {};
        body.forEach(function(e,i){
            jsonBody[e.name] = e.value;
            if (e.name != 'phone' && e.value == "") {
                validation = false;
                if (e.name == "description") {
                    $('textarea[name='+e.name+']').addClass('form__error');
                    $('textarea[name='+e.name+']').closest('.form__textarea').addClass('form__textarea__error');
                    $('textarea[name='+e.name+']').after('<span class="form__textarea__error-text">Please provide '+$('textarea[name='+e.name+']').attr('data-name')+'.</span>');
                } else {
                    $('input[name='+e.name+']').addClass('form__error');
                    $('input[name='+e.name+']').closest('.form__input').addClass('form__input__error');
                    $('input[name='+e.name+']').after('<span class="form__input__error-text">Please provide '+$('input[name='+e.name+']').attr('data-name')+'.</span>');
                }
            } else {
                if ((e.name == "contactEmail" || e.name == "email") && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.value))) {
                    validation = false;
                    $('input[name='+e.name+']').addClass('form__error');
                    $('input[name='+e.name+']').closest('.form__input').addClass('form__input__error');
                    $('input[name='+e.name+']').after('<span class="form__input__error-text">Please provide a valid email format.</span>');
                } 
    
                if (e.name == "dateOfBirth" && moment(e.value).isValid() == false) {
                    validation = false;
                    $('input[name='+e.name+']').addClass('form__error');
                    $('input[name='+e.name+']').closest('.form__input').addClass('form__input__error');
                    $('input[name='+e.name+']').after('<span class="form__input__error-text">Please provide a valid date.</span>');
                }
            }
        });
        if (validation == false) {
            return false;
        }

        return jsonBody;
    }

    $(document).on('focus','.form__error', function(){
        $(this).removeClass('form__error');
        $(this).closest('.form__input').removeClass('form__input__error');
        $(this).closest('.form__input').find('span').remove();
        $(this).closest('.form__textarea').removeClass('form__textarea__error');
        $(this).closest('.form__textarea').find('span').remove();
    });
});