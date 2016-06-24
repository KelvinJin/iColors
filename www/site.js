/*! rgbHex - v1.1.2 - 2013-09-27 */
window.rgbHex = function() {
    function a(a) {
        return !isNaN(parseFloat(a)) && isFinite(a)
    }
    function b(a) {
        return a.replace(/^\s+|\s+$/g, "")
    }
    function c(c) {
        return c = b(c), a(c) && c >= 0 && 255 >= c
    }
    function d(a) {
        return /^[0-9a-f]{3}$|^[0-9a-f]{6}$/i.test(b(a))
    }
    function e(a) {
        return a = parseInt(a, 10).toString(16), 1 === a.length ? "0" + a : a
    }
    function f(a) {
        return parseInt(a, 16).toString()
    }
    function g(b) {
        return b = b.split(","), (3 === b.length || 4 === b.length) && c(b[0]) && c(b[1]) && c(b[2]) ? 4 !== b.length || a(b[3]) ? "#" + e(b[0]).toUpperCase() + e(b[1]).toUpperCase() + e(b[2]).toUpperCase() : null : null
    }
    function h(a) {
        return d(a) ? (3 === a.length && (a = a.charAt(0) + a.charAt(0) + a.charAt(1) + a.charAt(1) + a.charAt(2) + a.charAt(2)), "rgb(" + f(a.substr(0, 2)) + "," + f(a.substr(2, 2)) + "," + f(a.substr(4, 2)) + ")") : void 0
    }
    function i(a) {
        return a.replace(/\s/g, "")
    }
    return function(a) {
        if (!a)
            return null;
        var c = null, d = /^rgba?\((.*)\);?$/, e = /^#/;
        return a = b(a.toString()), "transparent" === a || "rgba(0,0,0,0)" === i(a) ? "transparent" : d.test(a) ? g(a.match(d)[1]) : e.test(a) ? h(a.split("#").reverse()[0]) : (c = a.split(","), 1 === c.length ? h(a) : 3 === c.length || 4 === c.length ? g(a) : void 0)
    }
}(), jQuery && jQuery.extend({
    rgbHex: function(a) {
        return window.rgbHex(a)
    }
});
/* colourBrightness.js by @jamiebrittain */
(function(e) {
    e.fn.colourBrightness = function() {
        var e, t, n, r, i = this.css("background-color");
        if (i.match(/^rgb/)) {
            i = i.match(/rgb\(([^)]+)\)/)[1];
            i = i.split(/ *, */).map(Number);
            e = i[0];
            t = i[1];
            n = i[2]
        } else if ("#" == i[0] && 7 == i.length) {
            e = parseInt(i.slice(1, 3), 16);
            t = parseInt(i.slice(3, 5), 16);
            n = parseInt(i.slice(5, 7), 16)
        } else if ("#" == i[0] && 4 == i.length) {
            e = parseInt(i[1] + i[1], 16);
            t = parseInt(i[2] + i[2], 16);
            n = parseInt(i[3] + i[3], 16)
        }
        r = (e * 299 + t * 587 + n * 114) / 1e3;
        r < 125 ? this.removeClass("light").addClass("dark") : this.removeClass("dark").addClass("light")
    }
})(jQuery);

Color = function (rgb) {
  var colorString = rgb;
  var colorsOnly = colorString.split(")");
  var colorsOnly = colorsOnly[0].split("(");
  var colorsOnly = colorsOnly[1].split(",");
  this.red = parseInt(colorsOnly[0]);
  this.green = parseInt(colorsOnly[1]);
  this.blue = parseInt(colorsOnly[2]);
  this.getRed = function () {
    return this.red;
  }
  this.getGreen = function () {
    return this.green;
  }
  this.getBlue = function () {
    return this.blue;
  }

  this.toBarTintColor = function (color) {
    return 'rgb(' + this.red.designValue() + ',' + this.green.designValue() + ',' + this.blue.designValue() + ')';
  };
};

Number.prototype.designValue = function () {
  var d = (this - 40.0) / (1 - 40 / 255)
  return Math.min(Math.max(Math.round(d), 0), 255)
}

$(window).load(function() {
    var $hex = $('#hex'),
    $barTintColor = $('#barTintColor'),
    $hex_val = $('#hex').val(),
    $barTintColor_val = $('#barTintColor').val();

    // $hex.focus();

    var updateBarTintColor = function (rgb) {
      var color = new Color(rgb);
      var barTintColor = color.toBarTintColor();
      var hex = $.rgbHex(barTintColor);
      $barTintColor.val(hex);
      $('#lower').css('background-color', hex);
      $('#lower').colourBrightness();
    };

    $hex.bind('blur keyup', function(e) {
        colour = $.rgbHex($('#hex').val());

        if (colour) {
            $('#upper').css('background-color', colour);
            $('#upper').colourBrightness();
            updateBarTintColor(colour);
        }
    });
});
