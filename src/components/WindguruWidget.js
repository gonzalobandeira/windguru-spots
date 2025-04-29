import React, { useEffect } from 'react';
import { View, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { styles } from '../styles/WindguruWidget.styles';
import { DEFAULT_WINDGURU_PARAMS } from '../constants/Models';

const WindguruWidget = ({ spotId, modelId, params }) => {
  // Default parameters if not provided
  const spot = spotId || '48743';
  const model = modelId || '100';
  const uid = `wg_fwdg_${spot}_${model}_${Date.now()}`;
  const parameters = params || DEFAULT_WINDGURU_PARAMS;

  // Create the HTML content with the Windguru widget
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>
          body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            overflow-x: hidden;
          }
          .widget-container {
            width: 100%;
            height: 100%;
            overflow-x: auto;
          }
        </style>
      </head>
      <body>
        <div class="widget-container">
          <script id="${uid}">
            (function (window, document) {
              var loader = function () {
                var arg = [
                  "s=${spot}",
                  "m=${model}",
                  "uid=${uid}",
                  "wj=knots",
                  "tj=c",
                  "waj=m",
                  "tij=cm",
                  "odh=0",
                  "doh=24",
                  "fhours=240",
                  "hrsm=2",
                  "vt=forecasts",
                  "lng=en",
                  "idbs=1",
                  "p=${parameters}"
                ];
                var script = document.createElement("script");
                var tag = document.getElementsByTagName("script")[0];
                script.src = "https://www.windguru.cz/js/widget.php?" + (arg.join("&"));
                tag.parentNode.insertBefore(script, tag);
              };
              window.addEventListener ? window.addEventListener("load", loader, false) : window.attachEvent("onload", loader);
            })(window, document);
          </script>
        </div>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: htmlContent }}
        style={styles.webview}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        scrollEnabled={true}
        bounces={false}
      />
    </View>
  );
};

export default WindguruWidget;
