const renderHtml = (body) => {


    let html =
        `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <style>
            img {
                width: 100% !important; 
                height: 100% !important;
                padding:0 !important;
                margin:0 !important;
                margin-bottom:-4px !important;
            }
            body:{
                background-color:red;
            }
        </style>
    </head>
    <body style="padding: 0; margin: 0;">
    <script>
        var height = 0;
        window.location.hash = '#' + document.body.clientHeight;
        function changeHeight() {
            if (document.body.scrollHeight != height) {
            height = document.body.scrollHeight;
            window.ReactNativeWebView.postMessage(height);
            }
        }
        var flag =  setInterval(changeHeight, 500);

        window.onload=function(){
                height=document.body.scrollHeight;
                window.ReactNativeWebView.postMessage(height);
                clearInterval(flag);
        }
    </script>
    <div>

    ${body}
    <br />
    <br />
    </div>
    </body>
    </html>

    `
    return html
}


export default renderHtml