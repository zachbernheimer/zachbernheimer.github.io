$(document).ready(function() {
    
    var new_robot = function() {
        date = new Date();
        robourl = `https://robohash.org/${date.getTime()}`;
        $('#robot').attr("src", robourl);
    };

    $("#robobutton").click(new_robot);
    $("#curiosity").click(get_rover_data("Curiosity"))
});