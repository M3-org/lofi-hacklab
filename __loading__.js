pc.script.createLoadingScreen(function (app) {
    app.qualitySettings = {
        preset: 'high'
    };

    if( app.touch ) {
        app.qualitySettings.preset = 'low';
    }

    /*app.assets.on('load', function (asset) {
        if( asset.type == 'material' ) {
            asset.resources[0].normalMap = null;
            asset.resources[0].diffuseMap = null;
            asset.resources[0].update();
        }
    });*/
    
    var showSplash = function () {
        // splash wrapper
        var wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);

        // splash
        var splash = document.createElement('div');
        splash.id = 'application-splash';
        wrapper.appendChild(splash);
        splash.style.display = 'none';

        var logo = document.createElement('img');
        logo.src = 'https://m3org.com/logo_big.png';
        splash.appendChild(logo);
        logo.onload = function () {
            splash.style.display = 'block';
        };

        var container = document.createElement('div');
        container.id = 'progress-bar-container';
        splash.appendChild(container);

        var bar = document.createElement('div');
        bar.id = 'progress-bar';
        container.appendChild(bar);

    };

    var hideSplash = function () {
        var splash = document.getElementById('application-splash-wrapper');
        splash.parentElement.removeChild(splash);


        /*if( app.qualitySettings.preset == 'low' ) {
            var assets = app.assets.filter(function (asset) {
                return asset.type == 'material';
            });

            for( var i = 0; i < assets.length; i++ ) {
                assets[i].normalMap = null;
                assets[i].diffuseMap = null;
                assets[i].update();
            }
        }*/
    };

    var setProgress = function (value) {
        var bar = document.getElementById('progress-bar');
        if(bar) {
            value = Math.min(1, Math.max(0, value));
            bar.style.width = value * 100 + '%';
        }
    };

    var createCss = function () {
        var css = [
            'body {',
            '    background-color: #222;',
				'background: #222;',
				'background: -moz-linear-gradient(-45deg,  #45484d 0%, #000000 100%);',
				'background: -webkit-linear-gradient(-45deg,  #45484d 0%,#000000 100%);',
				'background: linear-gradient(135deg,  #45484d 0%,#000000 100%);',
				'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#45484d", endColorstr="#000000",GradientType=1 );',
            '}',

            '#application-splash-wrapper {',
            '    position: absolute;',
            '    top: 0;',
            '    left: 0;',
            '    height: 100%;',
            '    width: 100%;',
            '    background-color: #222;',
				'background: #222;',
				'background: -moz-linear-gradient(-45deg,  #45484d 0%, #000000 100%);',
				'background: -webkit-linear-gradient(-45deg,  #45484d 0%,#000000 100%);',
				'background: linear-gradient(135deg,  #45484d 0%,#000000 100%);',
				'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#45484d", endColorstr="#000000",GradientType=1 );',
            '}',

            '#application-splash {',
            '    position: absolute;',
            '    top: calc(50% - 128px);',
            '    width: 200px;',
            '    left: calc(50% - 100px);',
            '}',

            '#application-splash img {',
            '    width: 100%;',
            '}',

            '#progress-bar-container {',
            '    margin: 20px auto 0 auto;',
            '    height: 2px;',
            '    width: 167px;',
            '    background-color: #1d292c;',
            '}',

            '#progress-bar {',
            '    width: 0%;',
            '    height: 100%;',
            '    background-color: #f60;',
            '}',
            '@media (max-width: 480px) {',
            '    #application-splash {',
            '        width: 170px;',
            '        left: calc(50% - 85px);',
            '    }',
            '}'
        ].join("\n");

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
          style.styleSheet.cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);
    };


    createCss();

    showSplash();
        
    app.on('preload:end', function () {
        app.off('preload:progress');
    });
    app.on('preload:progress', setProgress);
    app.on('start', hideSplash);

    /*
    app.qualitySettings = {
        preset: 'low'
    };

    if( app.qualitySettings.preset == 'low' ) {
        var assets = app.assets.filter(function (asset) {
            return asset.type == 'material';
        });

        for( var i = 0; i < assets.length; i++ ) {
            assets[i].normalMap = null;
            assets[i].diffuseMap = null;
        }
    }
    */
});