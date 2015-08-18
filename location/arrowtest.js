function $(el) {
    return document.getElementById(el);
}


function deviceOrientationHandler(g, b, a, c, ca) {
    $("g").innerHTML = g;
    $("b").innerHTML = b;
    $("a").innerHTML = a;
    $("c").innerHTML = c;
    $("ca").innerHTML = ca;
    $("holder").style.webkitTransform = "rotate3d(1,0,0, " + (b * -1) + "deg)";
    $("arrow").style.webkitTransform = "rotate(" + -c + "deg)";
}

(function() {
    if (window.DeviceOrientationEvent) {
        $("e").innerHTML = "DeviceOrientationEvent";
        window.addEventListener('deviceorientation', function(e) {
            // y-axis - yaw
            var g = e.gamma || 0;
            // x-axis - tilt
            var b = e.beta || 0;
            // z=axis - swivel
            var a = e.alpha || 0;
            // degree north
            var c = e.compassHeading || e.webkitCompassHeading || 0;
            // accuracy in deg
            var accuracy = e.compassAccuracy || e.webkitCompassAccuracy || 0;
            deviceOrientationHandler(g, b, a, c, accuracy);
        }, false);
    } else {
        $("e").innerHTML = "NOT SUPPORTED #FAIL";
    }
})();
