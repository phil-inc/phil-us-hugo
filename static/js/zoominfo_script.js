(function() {
    window._zi = {
        //COPY FORM ID ON THE FOLLOWING LINE!!!
        formId: 'b62e10ca-b1fb-4608-b80e-94af26a488db',
        formLoadTimeout: 4000,
        callbacks: {
            //onReady should be used to hide all mapped fields 
            //(selectors for which can be found in the passed parameter)
            onReady: function(data) {
                //Checks to see if the form is in a HubSpot iFrame
                var doc = getContext(data.formSelector);
 
                //Itterates through all of the field selectors in the callback parameter
                data.inputs.forEach(function(input) {
                    //Builds a selector that works for both inputs and select elements
                    var field = doc.querySelector(data.formSelector + ' ' + input)
 
                    //If the field is of type hidden, we don't need to change the visibility rule
                    //so this skips it
                    if (!field || field.getAttribute('type') == 'hidden')
                        return;
 
                    //Passes the field to findEl to get the correct parent element to acutally hide
                    var el = findEl(field);
 
                    //Hides the current field
                    el.style.display = 'none';
                });
            },
            //The onMatch callback should look through all mapped field (in the passed param),
            //and display any fields that don't get filled out (value is undefined).
            onMatch: function(data) {
                //Checks to see if the form is in a HubSpot iFrame
                var doc = getContext(this.selector);
 
                //Itterates through all of the name attributes (keys) in the callback parameter
                for (var name in data) {
                    //Builds a selector that works for both inputs and select elements
                    //then use a querySelector to get the element into a var for later use.
                    var field = doc.querySelector(this.selector + ' [name="' + name + '"]');
 
                    //Checks to see if field type is hidden, if it is, there's no need to change
                    //visibility so we move to the next field
                    if (!field || field.getAttribute('type') == 'hidden')
                        continue;
 
                    //Passes the field to findEl so we can get the parent element that we want to show/hide
                    var el = findEl(field);
 
                    //If the value in the callback parameter for the current record is undefined show the element
                    //(If FormComplete didn't return anything for this input display it)
                    if (data[name] == undefined || field.getAttribute('data-zi-input-enriched') == 'false')
                        el.style.display = '';
 
                    //If the value in the callback parameter isn't undefined make sure the element is hidden
                    //(If FormComplete fills the field hide it or keep it hidden)
                    else
                        el.style.display = 'none';
                }
            }
        }
    };
    var zi = document.createElement('script');
    zi.type = 'text/javascript';
    zi.async = true;
    zi.src = 'https://ws-assets.zoominfo.com/formcomplete.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(zi, s);
 
    //findEl finds the top most element that contains exactly 1 input or select element. This will be used
    //as the element to hide so the label and any elements creating spacing are all hidden instead of just
    //the field.
    function findEl(el) {
        var parent = el.parentElement,
            count = parent.querySelectorAll('input').length + parent.querySelectorAll('select').length;
        if (count > 1)
            return (el);
        return (findEl(parent));
    }
 
    //Itterates through all HubSpot iframes on the page and determines which one has the element with the
    //passed selector. Returns the document of the iframe if it exists, returns the document of the main 
    //page if it doesn't
    function getContext(selector) {
        var iframes = document.getElementsByClassName('hs-form-iframe');
        if(iframes) {
            for(var i = 0; i < iframes.length; i+=1) {
                if(iframes[i].contentDocument.querySelector(selector))
                    return iframes[i].contentDocument;
            }
        }
        return document;
    }
})();