module.exports =
{

  seoifyURL: function(url) {
    // make the url lowercase
     var encodedUrl = url.toString().toLowerCase();

     // remove invalid characters
     encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("-");

     // remove duplicates
     encodedUrl = encodedUrl.split(/-+/).join("-");

     // trim leading & trailing characters
     encodedUrl =  encodedUrl.replace(/^\-+|\-+$/g,'')

     return encodedUrl;
  },
  readMore: function(text,length) {
    if (text.length && text.length > length)
        return text.substring(0,length -1) + "...";
      else {
        return text;
      }
  }
}
