var geocoder = new google.maps.Geocoder();
var data;

$("#signupform").submit(function(event){
    $("#signupmessage").hide();
    $("#spinner").css("display", "block");
    event.preventDefault();
    var datatopost = $(this).serializeArray();
    $.ajax({
        url: "signup.php",
        type: "POST",
        data: datatopost,
        success: function(data){
            if(data){
                $("#signupmessage").html(data);
                $("#spinner").css("display", "none");
                $("#signupmessage").slideDown();
            }
        },
        error: function(){
            $("#signupmessage").html("<div class='alert alert-danger'>There was an error with the Ajax Call. Please try again later.</div>");
            $("#spinner").css("display", "none");
            $("#signupmessage").slideDown();
            
        }
    
    });

});

$("#loginform").submit(function(event){ 
    $("#loginmessage").hide();
    $("#spinner").css("display", "block");
    event.preventDefault();
    var datatopost = $(this).serializeArray();
    $.ajax({
        url: "login.php",
        type: "POST",
        data: datatopost,
        success: function(data){
            if(data == "success"){
                window.location = "mainpageloggedin.php";
            }else{
                $('#loginmessage').html(data);   
                $("#spinner").css("display", "none");
                $("#loginmessage").slideDown();
            }
        },
        error: function(){
            $("#loginmessage").html("<div class='alert alert-danger'>There was an error with the Ajax Call. Please try again later.</div>");
            $("#spinner").css("display", "none");
            $("#loginmessage").slideDown();
            
        }
    
    });

});

$("#forgotpasswordform").submit(function(event){ 
    
    $("#forgotpasswordmessage").hide();
    $("#spinner").css("display", "block");
    event.preventDefault();
    var datatopost = $(this).serializeArray();
    $.ajax({
        url: "forgot-password.php",
        type: "POST",
        data: datatopost,
        success: function(data){
            $('#forgotpasswordmessage').html(data);
            $("#spinner").css("display", "none");
            $("#forgotpasswordmessage").slideDown();
        },
        error: function(){
            $("#forgotpasswordmessage").html("<div class='alert alert-danger'>There was an error with the Ajax Call. Please try again later.</div>");
            $("#spinner").css("display", "none");
            $("#forgotpasswordmessage").slideDown();
        }
    
    });

});

$("#searchform").submit(function(event){
    $("#results").fadeOut();
    $("#spinner").css("display", "block");
    event.preventDefault();
    data = $(this).serializeArray();
    console.log(data);
    
    
    getSearchTripDepartureCoordinates();
    
});
                        
    function getSearchTripDepartureCoordinates(){
        geocoder.geocode(
            {
                'address' : document.getElementById("departure").value
            },
            function(results, status){
                if(status == google.maps.GeocoderStatus.OK){
                    departureLongitude = results[0].geometry.location.lng();
                    departureLatitude = results[0].geometry.location.lat();
                    data.push({name:'departureLongitude', value: departureLongitude});
                    data.push({name:'departureLatitude', value: departureLatitude});
                    getSearchTripDestinationCoordinates();
                }else{
                    getSearchTripDestinationCoordinates();
                }

            }
        );
    }

    function getSearchTripDestinationCoordinates(){
        geocoder.geocode(
            {
                'address' : document.getElementById("destination").value
            },
            function(results, status){
                if(status == google.maps.GeocoderStatus.OK){
                    destinationLongitude = results[0].geometry.location.lng();
                    destinationLatitude = results[0].geometry.location.lat();
                    data.push({name:'destinationLongitude', value: destinationLongitude});
                    data.push({name:'destinationLatitude', value: destinationLatitude});
                    submitSearchTripRequest();
                }else{
                    submitSearchTripRequest();
                }

            }
        );

    }

    function submitSearchTripRequest(){
        console.log(data);
        $.ajax({
            url: "search.php",
            data: data,
            type: "POST",
            success: function(data2){
                console.log(data);
                if(data2){
                    $('#results').html(data2);
                    //accordion
                    $("#message").accordion({
                        icons: false,
                        active:false,
                        collapsible: true,
                        heightStyle: "content"   
                    });
                }
                $("#spinner").css("display", "none");
                $("#results").fadeIn();
        },
            error: function(){
                $("#results").html("<div class='alert alert-danger'>There was an error with the Ajax Call. Please try again later.</div>");
                $("#spinner").css("display", "none");
                $("#results").fadeIn();

    }
        }); 

    }





