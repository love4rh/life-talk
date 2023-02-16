# packages to be installed
axios
node-sass
@mui/material @emotion/react @emotion/styled
@mui/material @mui/styled-engine-sc styled-components
@mui/icons-material

yarn add axios node-sass @mui/material @emotion/react @emotion/styled @mui/styled-engine-sc styled-components

html-react-parser


// react animation library




// paste image from clipboard
https://jsfiddle.net/techiedelight/nj1vhs3b/

document.onpaste = function(pasteEvent) {
  var item = pasteEvent.clipboardData.items[0];

  if (item.type.indexOf("image") === 0) {
    var blob = item.getAsFile();
    
    console.log(blob);

    var reader = new FileReader();
    reader.onload = function(event) {
      console.log(event.target.result);
      document.getElementById("container").src = event.target.result;
    };

    reader.readAsDataURL(blob); // image blob to base64 encoded string
  }
}



// base64 to image
https://stackoverflow.com/questions/21227078/convert-base64-to-image-in-javascript-jquery




  fetchStat = (sDate, eDate, timeZone, cb) => {
    Proxy.fetch({
      path: '/get',
      waiting: false,
      timeout: 10000,
      data: { sDate, eDate, timeZone },
      success: (res) => {
        if( res && res.returnCode === 0 && res.response ) {
          this._resultStat = res.response;
          if( cb ) cb(true, this._resultStat);
        } else {
          // TODO
          if( cb ) cb(false, {});
        }
      },
      error: (err) => {
        if( cb ) cb(false, err);
      }
    });
  }

  download = (sDate, eDate, timeZone, cb) => {
    Proxy.download({
      path: '/download',
      waiting: false,
      timeout: 10000,
      data: { sDate, eDate, timeZone },
      success: (res) => {
          if( cb ) cb(true);
      },
      error: (err) => {
        if( cb ) cb(false);
      }
    });
  }
  