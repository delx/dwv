/** 
 * Application launcher.
 */

// check browser support
dwv.browser.check();

// launch when page is loaded
$(document).ready( function()
{
    // main application
    var myapp = new dwv.App();
    // initialise the application
    myapp.init({
        "containerDivId": "dwv",
        "fitToWindow": true,
        "tools": ["Scroll", "Window/Level", "Zoom/Pan", "Draw", "Livewire", "Filter"],
        "filters": ["Threshold", "Sharpen", "Sobel"],
        "shapes": ["Line", "Protractor", "Rectangle", "Roi", "Ellipse"],
        "gui": ["tool", "load", "help", "undo", "version", "tags"],
        "isMobile": true
    });
    
    var saveAnnotations = function (event) {


        var state = new dwv.State(myapp);
        var json = state.toJSON();

        var query = dwv.html.getUriParam(window.location.href);
        var saveUrl = query.saveUrl;

        $.ajax({
            type: 'POST',
            url: saveUrl,
            data: {annotations: json},
            success: function(data) {
            },
            error: function() {
                alert('Could not save annotations.');
            }
        });

    }
    myapp.addEventListener("draw-create", saveAnnotations);
    myapp.addEventListener("draw-move", saveAnnotations);
    myapp.addEventListener("draw-change", saveAnnotations);
    myapp.addEventListener("draw-delete", saveAnnotations);

    var size = dwv.gui.getWindowSize();
    $(".layerContainer").height(size.height);

});
