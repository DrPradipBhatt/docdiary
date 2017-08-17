/*!
 * JIC JavaScript Library v2.0.2
 * https://github.com/brunobar79/J-I-C/
 *
 * Copyright 2016, Bruno Barbieri
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Date: Tue Jul 11 13:13:03 2016 -0400
 */



/**
 * Create the jic object.
 * @constructor
 */
 const   jic = {
        /**
         * Receives an Image Object (can be JPG OR PNG) and returns a new Image Object compressed
         * @param {Image} source_img_obj The source Image Object
         * @param {Integer} quality The output quality of Image Object
         * @param {String} output format. Possible values are jpg and png
         * @return {Image} result_image_obj The compressed Image Object
         */

   compress :   (source_img_obj, quality, output_format)=> {
             
             var mime_type = "image/jpeg";
             if(typeof output_format !== "undefined" && output_format=="png"){
                mime_type = "image/png";
             }
             

             var cvs = document.createElement('canvas');
             cvs.width = source_img_obj.naturalWidth;
             cvs.height = source_img_obj.naturalHeight;
             var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0);
             var newImageData = cvs.toDataURL(mime_type, quality/100);
             var result_image_obj = new Image();
             result_image_obj.src = newImageData;
             return result_image_obj;
        } , 
 compressblob  :   (source_img_obj, quality, output_format)=> {
             
             var mime_type = "image/jpeg";
             if(typeof output_format !== "undefined" && output_format=="png"){
                mime_type = "image/png";
             }
           // console.log(source_img_obj.src) ;

             var cvs = document.createElement('canvas');
            //  var cvs  : any  = document.getElementById("mycanvas") ;
              cvs.width = source_img_obj.naturalWidth;
             cvs.height = source_img_obj.naturalHeight;
             var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0);
             var dataURL  = cvs.toDataURL(mime_type, quality/100);
               
             var  newImageData = dataURL.replace("data:image/jpeg;base64," , "");
             console.log("My data Length  " , mime_type ,  newImageData.length   ) ; 
             console.log("My data " ,  newImageData  ) ; 

              //  return "" ;           
               return jic.b64toBlob( newImageData , 'image/jpg' , 512)   ;
        } , 
     //   "data:image/jpeg;base64,"

b64toBlob : (b64Data, contentType, sliceSize) => {
        contentType = contentType || 'image/jpg';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
}

};
export default jic ; 