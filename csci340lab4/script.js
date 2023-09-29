$(document).ready(function() {
    
    var new_robot = function() {
        // get a procedurally generated robot using the robohash API with the current timestamp as a key
        let date = new Date();
        let robourl = `https://robohash.org/${date.getTime()}`;
        $('#robot').attr("src", robourl);
    };

    var get_rover_data = function(rover) {
        var api_key = "DEMO_KEY";
        $.ajax({
            dataType: "json",
            //`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=DEMO_KEY`
            url: `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}/?api_key=${api_key}`,
            success: function(results) {
                console.log(results);
                manifest = results["photo_manifest"];
                $('#r_name').html(manifest["name"]);
                $('#r_launched').html(manifest["launch_date"]);
                $('#r_landed').html(manifest["landing_date"]);
                $('#r_status').html(manifest["status"]);
                $('#r_total_posted').html(manifest["total_photos"]);
                $('#r_latest_date').html(manifest["max_date"]);

                //get images to go on the left side of the page
                get_rover_images(manifest);
            },
            error: function(xhr,status,error) {
                console.log(error);
            }
        });
    };

    var get_rover_images = function(manifest) {
        var api_key = "DEMO_KEY";
        var rover = manifest["name"]
        var earth_date = manifest["max_date"]
        $.ajax({
            dataType: "json",
            //`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=DEMO_KEY`
            url: `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${earth_date}&api_key=${api_key}`,
            success: function(results) {
                console.log(results);
                photos = results["photos"]
                image = photos[photos.length-1]
                src = image["img_src"]
                $("#rover_img").attr("src", src);
            },
            error: function(xhr,status,error) {
                console.log(error);
            }
        });
    };

    // rover switcher wrapper functions
    var rover_c = function() {
        get_rover_data("curiosity");
    };

    var rover_o = function() {
        get_rover_data("opportunity");
    };

    var rover_s = function() {
        get_rover_data("spirit");
    };

    $("#robobutton").click(new_robot);
    $("#curiosity").click(rover_c);
    $("#spirit").click(rover_s);
    $("#opportunity").click(rover_o);
});