batchRename = {

    init: function() {

        const cs                        = new CSInterface();
        const extensionPath             = cs.getSystemPath(SystemPath.EXTENSION);
        const refreshBtn                = document.querySelector('.button--refresh');
        const executeBtn                = document.querySelector('.button--execute');
        const clearBtn                  = document.querySelector('.button--clear');

        console.log('batchRename.init()');

        loadJSX('../host/PremierePro.jsx');
        matchPanelAppereanceToHostApplication();


        // JavaScript Event Listeners

        clearBtn.addEventListener('click', function(click){

            click.preventDefault();
            clear();
        }); // clearBtn.click();


        executeBtn.addEventListener('click', function(click){
            
            click.preventDefault();
            execute();
            clear();
        }); // executeBtn.click();


        refreshBtn.addEventListener('click', function(click){

            click.preventDefault();
            location.reload();
            console.log('Panel reloaded!');
        }); // refreshBtn.click();

        

        // ExtendScript Event Listeners


        // Functions

        function clear() {

            console.log('Script cleared!');

        } // clear()


        function execute() {

            console.log('Script executed');
        } // execute()


        function loadJSX(file) {

            path        = extensionPath;
            pathToFile  = path + '/host/' + file;

            return cs.evalScript('$.evalFile("' + pathToFile + '");', function(){
                console.log(pathToFile + ' was loaded succesfully.');
            });   
        } // loadJSX()


        function matchPanelAppereanceToHostApplication() {

            host                        = cs.hostEnvironment.appSkinInfo;
            const body                  = document.querySelector('body');
            body.style.fontSize         = host.baseFontSize + 'px';
            body.style.fontFamily       = host.baseFontFamily + ', sans-serif';
            body.style.backgroundColor  = colorToRGB(host.panelBackgroundColorSRGB.color);
            body.style.color            = 'lightgray';
        
            function colorToRGB(color) {

                r = Math.floor(color.red);
                g = Math.floor(color.green);
                b = Math.floor(color.blue);
                return 'rgb(' + r + ',' + g + ',' + b + ')';
            }
        } // matchPanelAppereanceToHostApplication()
    } // init()
} // batchRename {}

batchRename.init();