/* mw: 13/10/2015 added code to client.init to fix hover problems */

if(jQ.name==="Firefox") {
    // add this if you have a problem with thumbnail hovers positioning (jQ is defined in infradox.js)
    var mouseoverpos={
    	"inside":{"at":"center top","my":"center top"},
	    "outside":{"at":"center top","my":"center-4 top-1"}
    };
}  

var client = {
    init: function() { 

        if(jQ.name==="Firefox") {
            switch(settings.pt) { // pt=pagetype
            case 1: // search
                if($("#pagethumbnails").hasClass("layout1")){ // list thumbs
                    mouseoverpos.outside.my="center-5 top-2"; 
                }
                
                if($("#pagethumbnails").hasClass("layout0")){ // grid
                    mouseoverpos.outside.my="center-4 top-1"; 
                }
            
                
                break;
                    
            case 4: // order/cart
                mouseoverpos.outside.my="center+1 top-2"; 
                break;
            }
        }   
        
        // set viewport stuff 
        //viewport = document.querySelector("meta[name=viewport]");
       // viewport.setAttribute('content', 'zoom=1');
        
        // move the keywords menu item into the images submenu
        // mw: this is a setting in pages and menu, no need to do this with script
        //$('#lmenu_20 a').insertAfter("#lmenu_19 a");
    //    $('#menu_20').css('margin-top', '14px');
    //    $('#lmenu_20').hide();
        
        // change Photographer fieldname on cart and orders page to Photo Credit
        //$("#cart .metadatacontainer .fieldcontainer:nth-child(4) .fieldname, #order .metadatacontainer .fieldcontainer:nth-child(3) .fieldname").text("Photo Credit");

        // on orders page there is a link "Download Order" change this to "View all Orders"
        $("#order .ordertopcontainer .innercontainer > a").text("View all Orders");
        
        // hide latin and common names from order and cart pages
        $("#cart .fieldname:contains('Common Name 2')").parent().hide();
        $("#cart .fieldname:contains('Latin Name 2')").parent().hide();
         $("#order .fieldname:contains('Common Name 2')").parent().hide();
        $("#order .fieldname:contains('Latin Name')").parent().hide();


        if(settings.page==="preview\\preview.html") {
            // only do this if on the preview page
            
            $('#preview .filesizes .fieldname').text('Max file size');
            
            //$('#preview .restrictioninfo, .filesizes .sizedisk, .filesizes .sizelabel').hide();
            $('#preview .restrictioninfo').hide();
            $(".fieldname:contains('Available file(s)')").html('File size');
            $("#preview .c1 .fieldname").text('Species');
            $("#preview .c11 .fieldname").text('');
        
            $("#preview .c9 .fieldname, #preview .c12 .fieldname").text('Restrictions');
            $("#preview .c12 .fieldvalue, #preview .c9 .fieldvalue").css("width", "70%");
        
            if ($("#preview .c9 .fieldname").length) {
                $("#preview .c12 .fieldname").hide();
                $("#preview .c12 .fieldvalue").css("padding-left", "109px")
            }
        
            // change "photographer" to "credit"  > use the repository to do this
            //$('.metadatacontainer .fieldname:contains(Photographer)').html('Credit');
            
       
        }
        
            // in the advanced search section use text instead of images. The images are removed in custom CSS
            $('<span>Horizontal</span>').insertAfter(".orientation li.hor input");
            $('<span>Vertical</span>').insertAfter(".orientation li.ver input");
            $('<span>Panoramic</span>').insertAfter(".orientation li.pan  input");
            $('<span>Square</span>').insertAfter(".orientation li.sqr  input");
            
            // currently can't have a space in the title of an advanced search section so am replacing
            $('.lisfc1 .arrowbox').html('File size<div class="arrowicon sfc1"></div>');
           $('.lidate .arrowbox').html('Date added<div class="arrowicon date"></div>'); 
           
           // for some reason the arrows are noting changing classes when the container is open and closed so doing it here
           // this is for the advanced search panel
           $('.searchoptionbox.closed').prev().children().toggleClass('arrowicondown'); 
           $('.arrowbox').click(function() {
               $(this).children().toggleClass('arrowicondown').removeClass('arrowiconup');
           });
        
        // adds .button to the save and close button for the layout changer in modal
        $( "#pagelayout" ).click(function() {
            
            setTimeout(
            function() {
               
                $("#pagelayoutmenu a").addClass("button");
                
            },
            2000);
            
        });
        
        
        if(settings.page==="cart\\cart.html") {
            // add the ref number to the top of table on cart page
            $('#cart .reference1').each(function(){
                $(this).parents('.orderitemcontainer').find('.caption').prepend($(this));
            });
            
            // change downloadable file(s) to "Max file size"
             $('#cart .label:contains(Downloadable file(s))').text('Max file size');
        
            // hide the hover stuff on cart 
            $('#cart .gridModeBox .showonhover').remove();
            
            $('#cart #cartsubmitcontainer p:contains("Click next to confirm this order.")').text('Please tick the checkbox below then click Next to confirm this order');
            
            // stop the Photograher being a link. I know you can change this in admin but Larry wants on preview page but not cart
            $('#cart .fieldname:contains("Photographer")').next().children().css('color', 'black').click(function( event ) {
                event.preventDefault();
               
                
            });
           // photographer = $('#cart .fieldname:contains("Photographer")').next().children().text();
            
            $('#cart .fieldname:contains("Photographer")').next().children().each(function(){
                photographer = $(this).text();
                shortend_photographer = photographer.split('/')[0];
                $(this).text(shortend_photographer);
            });
           
            
            $('#cart .fieldname:contains("Territorial Restrictions")').text('Restrictions');
            $('#cart .fieldname:contains("Use Restrictions")').text('');
            
            
        }
        
        // restrictions on order page to be tweaked
         $('#order .fieldname:contains("Territorial Restrictions")').text('Restrictions');
         $('#order .fieldname:contains("Photographer")').text('Photo credit').next().children().css('color', 'black').click(function( event ) {
                event.preventDefault();
            });
           
            $('#order .fieldname:contains("Use Restrictions")').text('');
            
            // move the 13MB size on disk div to the end of the container for every size option
            $('#order td.sizeinfo').each(function(){
                $(this).find('.sizedisk').insertAfter($(this).find('.sizeinches'));
               
            });
            
             $('#order .metadatacontainer').each(function(){
                $(this).find('.fieldcontainer:nth-child(2)').insertAfter($(this).find('.fieldcontainer:nth-child(3)'));
               
            });
            
             
           
            
            
           
            
            
        
            
           


        // remove the infradox mouseover thing
        //$("#search .info, #search .caption").removeClass('showonhover');
        
        // make whole box in gallery page clicable
        
        
        $("#group .groupbox").click(function() {
            window.location = $(this).find("a").first().attr("href");
            return false;
        });
        
        // move latin name 1 next to common name 1
         $('#preview .c11 .fieldvalue a').insertAfter("#preview .c1 .fieldvalue a");
         
         $('#preview .c2').show();
        $('#preview .c2 .fieldname, #preview .c3 .fieldname').css('font-size', '0px');
        
        $('#preview .c2 span').css('margin-right', '10px');
       
         $('#preview .c3 .fieldvalue a').insertAfter("#preview .c2 .fieldvalue a");
         
         $('#preview .c3, #preview .c11').hide();
         
        
        /* $( "#preview .c1 .fieldvalue a" ).text(function( index ) {
                return "(" + $('#preview .c1 .fieldvalue a').text() + ")";
        });
        $( "#preview .c2 .fieldvalue a" ).text(function( index ) {
                return "(" + $('#preview .c2 .fieldvalue a').text() + ")";
        });*/
        
        // move the common name 2 etc 
       /* $('#preview .c11 .fieldvalue a').text(function( index ) {
                return "(" + $('#preview .c11 .fieldvalue a').text() + ")";
        });
        
         $('#preview .c3 .fieldvalue a').text(function( index ) {
                return "(" + $('#preview .c3 .fieldvalue a').text() + ")";
        });
        
       
        */
        
        
        /* mw: no need for this in 26.4 - you can enable the footer on all pages with a setting */ 
        // add footer to search
        //$('<div id="footer-block"></div>').insertAfter( "#search #contentwrapper" );
        //$( "#search #footer-block" ).load( "/home .footercontainer");

/*
        // move the menuwrapper into the #masthead
        $(".menuwrapper").insertAfter(".mastheadleft");

        // adds .logged-in to the body if you .bar a has href = /myaccount and then hide that element
        $('.bar a[href$="/myaccount"]').parents('body').addClass('logged-in');
        $('.bar a[href$="/myaccount"]').hide();
        
        // adds .logged-out to the body if .needlogin is present in the user bit top left
        $('.needlogin').parents('body').addClass('logged-out');
        
        // move logout button
        $('.logged-in #menuaccountlist ul').append($('.bar'));
        
        // pop the phone number
        $('.mastheadright').append('<p class="phone alignright"><a href="mailto:info@mindenpictures.com">info@mindenpictures.com</a> | <i></i>831 661 5551 <span>| <a href="#" id="plankton_login_trigger">Login</a> | <a href="/register">Register</a></span></p>');

        // remove stuff if logged in
        $('.logged-out #right, .logged-out #userInfo, .logged-in .phone span').hide();

        // add a span so I can add an icon to a couple of nav item
        $('#menu_6, #menu_8').prepend('<i></i>');

        // wrap number of cart items in main nav in ()'s
        $('#menucartcount').prepend('(').append(')');

*/
        
        // add a link to the footer cart sliding out thing
        $('<li><a href="/cart">Order these files</a></li>').insertAfter('#floatingcart #carttoolbar ul li:last-of-type');
        
        // make the login button click the real login button
        $( "#plankton_login_trigger" ).click(function() {
            $('.needlogin').click();
        });
        
        
        /*$('#taglist input').click(function() {
            $('#taglistgo').click();
        });*/
        
        
        $('<p style="float: left; width: 78%; margin: 14px 0 0 6px; text-align: right;"><a class="plankton-reset-search" href="#">Clear Refined Search</a></p>').insertAfter('.taglisttitle');
        $('.plankton-reset-search').click(function() {
            $('#linksearch').click();
        });
        
        $('#taglistgo').addClass('button').css('float', 'left');
        
        $('#taglistcontainer .gocontainer').parent().prepend($('#taglistcontainer .gocontainer'));
        $('#taglist').parent().prepend($('#taglist'));
        $(".taglistselect").parent().prepend($(".taglistselect"));
       
        $('.taglisttitle').parent().prepend($('.taglisttitle'));
        
        
        $('.toolscontainer').insertAfter( "#filtersections" ).css({'margin' : '5px 0 5px 0px'});
        $('#taglistcontainer').insertAfter( ".toolscontainer" ).css("border-top", "3px solid black").css("margin", "5px 0 5px 0px").css("padding-bottom", "0px").css("padding-top", "12px");
        
        $('#filtersections').next().insertAfter($('#sidebaradvanced > ul'));
        
        
        
        // grab the #usage-information-full from the usage-information.html page
        //$("#group .textcontainer").prepend('<div id="plankton-menu-list-container"></div>');
        //$( "#group #plankton-menu-list-container" ).load( "/c/1/22/menulist.html #plankton-menu-list");

        

    }
};