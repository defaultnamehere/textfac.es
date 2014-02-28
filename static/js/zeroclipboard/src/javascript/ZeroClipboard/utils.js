/*
 * Private function _getStyle is used to try and guess the element style; If
 * if we're looking for cursor, then we make a guess for <a>.
 *
 * returns the computed style
 */
var _getStyle = function (el, prop) {
  var y = el.style[prop];

  if (el.currentStyle)
    y = el.currentStyle[prop];
  else if (window.getComputedStyle)
    y = document.defaultView.getComputedStyle(el, null).getPropertyValue(prop);

  if (y == "auto" && prop == "cursor") {
    var possiblePointers = ["a"];
    for (var i = 0; i < possiblePointers.length; i++) {
      if (el.tagName.toLowerCase() == possiblePointers[i]) {
        return "pointer";
      }
    }
  }

  return y;
};

/*
 * The private mouseOver function for an element
 *
 * returns nothing
 */
var _elementMouseOver = function (event) {

  // If the singleton doesn't exist return
  if (!ZeroClipboard.prototype._singleton) return;

  // IE won't have event
  if (!event) {
    event = window.event;
  }

  var target;
  // in IE7 this === window
  if (this !== window) {
    target = this;
  } else if (event.target) {
    target = event.target;
  } else if (event.srcElement) {
    target = event.srcElement;
  }
  ZeroClipboard.prototype._singleton.setCurrent(target);
};

// private function for adding events to the dom, IE before 9 is suckage
var _addEventHandler = function (element, method, func) {
  if (element.addEventListener) { // all browsers except IE before version 9
    element.addEventListener(method, func, false);
  } else if (element.attachEvent) { // IE before version 9
    element.attachEvent("on" + method, func);
  }
};

// private function for removing events from the dom, IE before 9 is suckage
var _removeEventHandler = function (element, method, func) {
  if (element.removeEventListener) { // all browsers except IE before version 9
    element.removeEventListener(method, func, false);
  } else if (element.detachEvent) { // IE before version 9
    element.detachEvent("on" + method, func);
  }
};

/*
 * This private function adds a class to the passed in element.
 * paired down version of addClass from jQuery https://github.com/jquery/jquery/blob/master/speed/jquery-basis.js#L1227
 *
 * returns the element with a new class
 */
var _addClass = function (element, value) {

  // If the element has addClass already
  if (element.addClass) {
    element.addClass(value);
    return element;
  }

  if (value && typeof value === "string") {
    var classNames = (value || "").split(/\s+/);

    if (element.nodeType === 1) {
      if (!element.className) {
        element.className = value;
      } else {
        var className = " " + element.className + " ", setClass = element.className;
        for (var c = 0, cl = classNames.length; c < cl; c++) {
          if (className.indexOf(" " + classNames[c] + " ") < 0) {
            setClass += " " + classNames[c];
          }
        }
        // jank trim
        element.className = setClass.replace(/^\s+|\s+$/g, '');
      }
    }

  }

  return element;
};

/*
 * This private function removes a class from the provided elment
 * paired down version of removeClass from jQuery https://github.com/jquery/jquery/blob/master/speed/jquery-basis.js#L1261
 *
 * returns the element without the class
 */
var _removeClass = function (element, value) {

  // If the element has removeClass already
  if (element.removeClass) {
    element.removeClass(value);
    return element;
  }

  if ((value && typeof value === "string") || value === undefined) {
    var classNames = (value || "").split(/\s+/);

    if (element.nodeType === 1 && element.className) {
      if (value) {
        var className = (" " + element.className + " ").replace(/[\n\t]/g, " ");
        for (var c = 0, cl = classNames.length; c < cl; c++) {
          className = className.replace(" " + classNames[c] + " ", " ");
        }
        // jank trim
        element.className = className.replace(/^\s+|\s+$/g, '');

      } else {
        element.className = "";
      }
    }

  }

  return element;
};

/*
 * private get the dom position of an object.
 *
 * returns json of objects position, height, width, and zindex
 */
var _getDOMObjectPosition = function (obj) {
  // get absolute coordinates for dom element
  var info = {
    left:   0,
    top:    0,
    width:  obj.width  || obj.offsetWidth  || 0,
    height: obj.height || obj.offsetHeight || 0,
    zIndex: 9999
  };


  var zi = _getStyle(obj, "zIndex");
  // float just above object, or default zIndex if dom element isn't set
  if (zi && zi != "auto") {
    info.zIndex = parseInt(zi, 10);
  }

  while (obj) {

    var borderLeftWidth = parseInt(_getStyle(obj, "borderLeftWidth"), 10);
    var borderTopWidth  = parseInt(_getStyle(obj, "borderTopWidth"), 10);

    info.left += isNaN(obj.offsetLeft)  ? 0 : obj.offsetLeft;
    info.left += isNaN(borderLeftWidth) ? 0 : borderLeftWidth;
    info.top += isNaN(obj.offsetTop)    ? 0 : obj.offsetTop;
    info.top += isNaN(borderTopWidth)   ? 0 : borderTopWidth;

    obj = obj.offsetParent;
  }

  return info;
};

/*
 * private _noCache function.
 * Will look at a path, and will append ?nocache=date or &nocache=date to path.
 * because externalenterface craps out when flash is cached. (IE)
 *
 * returns path with noncache param added
 */
var _noCache = function (path) {
  return ((path.indexOf("?") >= 0) ? "&" : "?") + "nocache=" + (new Date().getTime());
};

/*
 * private _vars function.
 * creates a query string for the flasvars
 *
 * returns flashvars separated by &
 */
var _vars = function (options) {
  var str = [];

  // if trusted domain is set
  if (options.trustedDomains) {
    if (typeof options.trustedDomains === "string") {
      str.push("trustedDomain=" + options.trustedDomains);
    } else {
      str.push("trustedDomain=" + options.trustedDomains.join(","));
    }
  }

  // join the str by &
  return str.join("&");
};

/*
 * private _inArray function.
 * gets the index of an elem in an array
 *
 * returns the index of an element in the array, -1 if not found
 */
var _inArray = function (elem, array) {
  if (array.indexOf) {
    return array.indexOf(elem);
  }

  for (var i = 0, length = array.length; i < length; i++) {
    if (array[i] === elem) {
      return i;
    }
  }

  return -1;
};

/*
 * private _prepGlue function.
 * prepares the elements for gluing/ungluing
 *
 * returns the elements
 */
var _prepGlue = function (elements) {

  // if elements is a string
  if (typeof elements === "string") throw new TypeError("ZeroClipboard doesn't accept query strings.");

  // if the elements isn't an array
  if (!elements.length) return [elements];

  return elements;
};
