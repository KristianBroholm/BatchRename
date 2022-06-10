#include "./../lib/json2.js";

function renameClips(options) {

    var selectedClips = app.getCurrentProjectViewSelection();
    
    if (selectedClips) {

        var operation   = options['operation'];
        var text        = options['text'];
        var search      = options['search'];
        var replace     = options['replace'];
        var digits      = options['digits'];
        var number      = options['number'];
        var trim        = options['trim'];

        for(index = 0; index < selectedClips.length; index++) {

            var clip = selectedClips[index];

            if (clip.type = 'CLIP') {
                
                // Remove Text
                if (operation == 1) {
                    clip.name = clip.name.replace(text, '');
                }

                // Search & Replace Text
                if (operation == 2) {
                    clip.name = clip.name.replace(search, replace);
                }

                // Prepend Text
                if (operation == 3) {
                    clip.name = text + clip.name;
                }

                // Append Text
                if (operation == 4) {
                    clip.name = clip.name + text;
                }

                //  Prepend or Append Increment
                if (operation == 5 || operation == 6) {
                    increment = number;

                    for(counter = increment.length; increment.length < digits; counter++) {
                        
                        increment = '0' + increment;
                    }

                    // Append Increment
                    if (operation == 5) {
                        clip.name = increment + clip.name;
                    }

                    // Prepend Increment
                    if (operation == 6) {
                        clip.name = clip.name + increment;
                    }

                    number++;
                }

                // Trim Characters from Beginning
                if (operation == 7) {
                    var indexStart  = trim;
                    var indexEnd    = clip.name.length;
                    clip.name = clip.name.substr(indexStart, indexEnd);
                }

                // Trim Characters from End
                if (operation == 8) {
                    var indexStart  = 0;
                    var indexEnd    = clip.name.length - trim;
                    clip.name = clip.name.substr(indexStart, indexEnd);
                }

                // Override with Text
                if (operation == 9) {
                    clip.name = text;
                }
            }
        }
        return true;
    }
    return false;
}