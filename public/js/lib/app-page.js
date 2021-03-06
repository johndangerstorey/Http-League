(function(){
  "use strict";

  function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}

    /*------------------------------------*\

        #ABOUT

    \*------------------------------------*/
    // $('body').on('click', '.item .person img, .item .person .name',  function () {
    //     $(this).parent().parent().toggleClass('clicked');
    // });

    // // click on about section to close
    // $('body').on('click', '.item .about .ion-close-round', function() {
    //     $(this).parent().parent().toggleClass('clicked');
    // });


    /*------------------------------------*\

        #USER

    \*------------------------------------*/
    if (window.user){
        var userItem = $('input.js-record-score-oid[value='+ user._id + ']').parent().parent().parent();
        userItem.find('a.action').replaceWith("<a href='/account'><i class='fa fa-cog f10'></i>edit profile</a>"); // removes "challenge" option
        userItem.find('.record-score').remove(); // removes report score
    }
   


    /*------------------------------------*\

        #RECORD SCORE

    \*------------------------------------*/
    $('body').on('click', '.item .record-score', function (ev) {
        $(this).addClass('clicked');
    });

    // record score hide
    $('body').on('click', '.item .record-score .close-record-score', function (ev) {
        ev.stopPropagation();
        $(this).parent().removeClass('clicked');
    });


    $('.item .record-score input').on({ // stops it from going up parent tree and registering click to .record-store
    	click: function(e){
    		e.stopPropagation();
    	}
    });

    $('body').on('submit', 'form.js-record-score', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();

        var form = $(this).closest('form.js-record-score').serialize();
        var elm = $(this).parent();

        $.ajax( {
         url: '/app/recordScore/' + $(this).find('.js-record-score-oid').val(),
         data: form,
         type: 'post',
         success: function (res) {
             if(res.success){
                // congragulate, tell to reload page
             } else {
                // display error
             }
         }
        }).then(function () {
            elm.removeClass('clicked');
        });
      });

    $('body').on('click', 'form.js-record-score .btn', function (ev) {
        ev.stopPropagation();
    });
})();