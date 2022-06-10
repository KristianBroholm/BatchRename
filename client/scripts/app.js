batchRename = {

    init: function() {

        const cs                        = new CSInterface();
        const extensionPath             = cs.getSystemPath(SystemPath.EXTENSION);
        const refreshBtn                = document.querySelector('.button--refresh');
        const executeBtn                = document.querySelector('.button--execute');
        const clearBtn                  = document.querySelector('.button--clear');
        const form                      = document.getElementById('batchRename');
        const components                = document.querySelectorAll('.field--component');
        const operationSelector         = document.querySelector('.input--operation');

        console.log('batchRename.init()');

        loadJSX('../host/PremierePro.jsx');
        matchPanelAppereanceToHostApplication();
        hideAllComponents();

        // JavaScript Event Listeners

        clearBtn.addEventListener('click', function(click){

            click.preventDefault();
            clear();
        }); // clearBtn.click();


        executeBtn.addEventListener('click', function(click){
            
            click.preventDefault();

            const rawData = new FormData(form);
            const processedData = {};

            for([key, value] of rawData) {

                processedData[key] = value;
            }

            if (processedData['operation']) {

                const json = JSON.stringify(processedData);
                execute(json);
            }
            
        }); // executeBtn.click();


        operationSelector.addEventListener('change', function(event) {

            clearComponents();

            const operation = parseInt(operationSelector.value);
            console.log(operation);
            let requiredComponents = false;

            switch(operation) {
                case 1:
                case 3:
                case 4:
                case 9:
                    requiredComponents = '.field--text';
                    break;
                case 2:
                    requiredComponents = ['.field--search','.field--replace'];
                    break;
                case 5:
                case 6:
                    requiredComponents = ['.field--digits', '.field--number'];
                    break;
                case 7:
                case 8:
                    requiredComponents = '.field--characters';
                    break;
            }
            
            if (requiredComponents) {

                requiredComponents = document.querySelectorAll(requiredComponents);

                for(const component of requiredComponents) {

                    component.classList.remove('hidden');
                }
            }
        })


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


        function clearComponents() {

            hideAllComponents();
            console.log('clearComponents()');
        }

        function execute(args) {

            console.log('evalScript(renameClips())');
            cs.evalScript('renameClips(' + args + ');', function(res){
                console.log(res);
                return res;
            });
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
            } // colorToRGB()
        } // matchPanelAppereanceToHostApplication()


        function hideAllComponents() {
            if (components) {

                components.forEach(function(component) {

                    component.classList.add('hidden');
                });
            }
        } // hideAllComponents()

    } // init()
} // batchRename {}

batchRename.init();