$(function(){

  gtag('event', 'page_view', {
    'send_to': 'AW-692891183',
    'value': 'replace with value',
    'items': [{
      'id': 'replace with value',
      'location_id': 'replace with value',
      'google_business_vertical': 'real_estate'
    }]
  });

    $('#aosButtonAnchor').click(function(){
        ym(56091337, 'reachGoal', 'open_form'); 
        // gtag('event', 'open', {
        //     'event_category': 'form_popup',
        //     });
        return true;
    });
    $('.coop-whyUs__button').click(function(){
        ym(56091337, 'reachGoal', 'about_answer'); 
        // gtag('event', 'open', {
        //     'event_category': 'about_popup',
        //     });
        return true;
    });
    $('.director__button').click(function(){
        ym(56091337, 'reachGoal', 'director_form'); 
        // gtag('event', 'open', {
        //     'event_category': 'director_popup',
        //     });
        return true;
    });
    $('.services-tour__button').click(function(){
        ym(56091337, 'reachGoal', 'services_popup'); 
        // gtag('event', 'open', {
        //     'event_category': 'services_popup',
        //     });
        return true;
    });
    $('#favorites_button_popup').click(function(){
        ym(56091337, 'reachGoal', 'favorites_form'); 
        // gtag('event', 'open', {
        //     'event_category': 'favorites_popup',
        //     });
        return true;
    });
    $(document).on('click', '#callbackheadbutton', function(){
        ym(56091337, 'reachGoal', 'head_button'); 
        // gtag('event', 'open_head', {
        //     'event_category': 'form_popup_head',
        //     });
        return true;
    });
    $(document).on('click', '.testimonial__button-next', function(){
        ym(56091337, 'reachGoal', 'review_read'); 
        // gtag('event', 'click', {
        //     'event_category': 'review',
        //     });
        return true;
    });
    $('#head_phone_list').on('mouseover.phone', function(){
        ym(56091337, 'reachGoal', 'show_phone'); 
        // gtag('event', 'mouseover', {
        //     'event_category': 'show_phone',
        //     });
        $('#head_phone_list').off('mouseover.phone');
        return true;
    });
})