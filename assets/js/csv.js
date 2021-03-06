(function(exports) {
  "use strict"; // Use ECMAScript 5 strict mode in browsers that support it
  // See http://en.wikipedia.org/wiki/Comma-separated_values

  var regexp = /"((?:[^"\\]|\\.)*)"|([^,\s]+)|,\s*(?=,|$)|^\s*,/g
  exports.calculate = function(original) {
    var lines = original.split(/\n+\s*/);
    var firstLine;

    for (var i in lines)
      if (lines[i].match(regexp)) {
        firstLine = i;
        var commonLength = lines[i].match(regexp).length;
        break;
      }

    var r = [];
    var removeQuotes = function(field) {
      var removecomma = field.replace(/,\s*$/, '');
      var remove1stquote = removecomma.replace(/^\s*"/, '');
      var removelastquote = remove1stquote.replace(/"\s*$/, '');
      var removeescapedquotes = removelastquote.replace(/\\"/, '"');
      return removeescapedquotes;
    };

    for (var t in lines) {
      var temp = lines[t];
      var m = temp.match(regexp);
      var result = [];
      var error = false;
      var first = false;

      // skip empty lines and comments
      if (temp.match(/(^\s*$)|(^#.*)/)) continue;
      if (m) {
        result = m.map(removeQuotes);
        error = (commonLength != m.length);
        first = (firstLine == t);
        var rowclass = error ? 'error' : '';
        rowclass = first ? 'first' : rowclass;
        r.push({
          value: result,
          rowClass: rowclass
        });
      } else {
        var errmsg = 'La fila "' + temp + '" no es un valor de CSV permitido.';
        r.push({
          value: errmsg.split("").splice(commonLength),
          rowClass: 'error'
        });
      }
    }
    return r;
  };
})(this);
