module.exports =
{

  seoifyURL: function(text) {
      var characters = [' ', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '_', '{', '}', '[', ']', '|', '/', '<', '>', ',', '.', '?', '--'];
      for (var i = 0; i < characters.length; i++) {
          var char = String(characters[i]);
          text = text.replace(new RegExp("\\" + char, "g"), '-');
      }
      text = text.toLowerCase();
      return text;
  },
  readMore: function(text) {
    if (text.length && text.length > 1000)
        return text.substring(0,999) + "...";
      else {
        return text;
      }
  }
}
