(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"d:\\Github\\ThinDOM\\src\\ThinDOM.coffee":[function(require,module,exports){
(function (global){
var ThinDOM, _, jQuery, removeMethod, thisGlobal;

_ = (typeof window !== "undefined" ? window['_'] : typeof global !== "undefined" ? global['_'] : null);

jQuery = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);


/*
Capture the global object in order of: global, window, this
 */

thisGlobal = (typeof global !== 'undefined' && global ? global : (typeof window !== 'undefined' ? window : this));


/*
Capture the correct remove method for use when dropping nodes
 */

removeMethod = (function() {
  var el;
  if (typeof document !== 'undefined') {
    el = document.body;
    if (el.remove) {
      return 'remove';
    } else if (el.removeNode) {
      return 'removeNode';
    } else {
      return 'valueOf';
    }
  }
})();


/*
A little thin DOM wrapper with chaining
 */

ThinDOM = (function() {
  function ThinDOM(tag, attributes, el1) {
    this.tag = tag;
    this.el = el1 != null ? el1 : null;
    if (this.el == null) {
      this.el = document.createElement(this.tag);
    }
    if (attributes) {
      this.attr(attributes);
    }
  }

  ThinDOM.prototype.THINDOM = 'THINDOM';


  /*
  Convenience method for adding props to objects
   */

  ThinDOM.prototype.add = function(name, val) {
    this[name] = val;
    return this;
  };

  ThinDOM.prototype._append = function(other) {
    this.el.appendChild(other);
    return this.el;
  };


  /*
  Append one node to another
   */

  ThinDOM.prototype.append = function(other) {
    var ret;
    ret = this;
    if (other.THINDOM) {
      this._append(other.get());
    } else if (_.isElement(other)) {
      this._append(other);
    } else if (other instanceof jQuery) {
      if (other.length > 1) {
        _.forEach(other, (function(_this) {
          return function(i, otherEl) {
            _this._append(otherEl);
          };
        })(this));
      } else {
        this._append(other[0]);
      }
    }
    return ret;
  };

  ThinDOM.prototype._prepend = function(other) {
    this.el.insertBefore(other, this.el.firstChild);
    return this.el;
  };


  /*
  Prepend one node to the first child node position of another
   */

  ThinDOM.prototype.prepend = function(other) {
    var ret;
    ret = this;
    if (other.THINDOM) {
      this._prepend(other.get());
    } else if (_.isElement(other)) {
      this._prepend(other);
    } else if (other instanceof jQuery) {
      if (other.length > 1) {
        _.forEach(other, (function(_this) {
          return function(i, otherEl) {
            _this._prepend(otherEl);
          };
        })(this));
      } else {
        this._prepend(other[0]);
      }
    }
    return ret;
  };


  /*
  Drop a node
   */

  ThinDOM.prototype.remove = function() {
    this.el[removeMethod]();
  };


  /*
  Set the element's style attributes
   */

  ThinDOM.prototype.css = function(properties, value) {
    var ret;
    ret = this;
    if (_.isString(properties)) {
      if (value) {
        this.el.style[properties] = value;
      } else {
        ret = this.el.style[properties];
      }
    } else if (_.isPlainObject(properties)) {
      _.forOwn(properties, (function(_this) {
        return function(val, key) {
          if (val !== '') {
            _this.el.style[key] = val;
          }
        };
      })(this));
    }
    return ret;
  };


  /*
  Set the inner HTML (slow)
   */

  ThinDOM.prototype.html = function(html) {
    var ret;
    ret = this;
    if (html == null) {
      ret = this.el.innerHTML;
    } else {
      this.el.innerHTML = html;
    }
    return ret;
  };


  /*
  Add text node (fast)
   */

  ThinDOM.prototype.text = function(str) {
    var ret, t;
    ret = this;
    if (!str) {
      ret = self.el.innerHTML;
    } else {
      t = document.createTextNode(str);
      this.el.appendChild(t);
    }
    return ret;
  };


  /*
  Set props on the node
   */

  ThinDOM.prototype.attr = function(properties, value) {
    var ret;
    ret = this;
    if (_.isString(properties)) {
      if (value) {
        this.el.setAttribute(properties, value);
      } else {
        ret = this.el.getAttribute(properties);
      }
    } else if (_.isObject(properties)) {
      _.forOwn(properties, (function(_this) {
        return function(val, key) {
          if (val !== '') {
            _this.el.setAttribute(key, val);
          }
        };
      })(this));
    }
    return ret;
  };


  /*
  Add data props
  per: http://jsperf.com/data-dataset/9
  setAttribute is fastest
   */

  ThinDOM.prototype.data = function(properties, value) {
    var ret;
    ret = this;
    if (_.isString(properties)) {
      if (false === (properties.indexOf('data-') === 0)) {
        properties = 'data-' + properties;
      }
      ret = this.attr(properties, value);
    } else if (_.isPlainObject(properties)) {
      _.forOwn(properties, (function(_this) {
        return function(val, key) {
          if (false === (key.indexOf('data-') === 0)) {
            key = 'data-' + key;
          }
          ret = _this.attr(key, value);
        };
      })(this));
    }
    return ret;
  };


  /*
  Get the HTML Element
   */

  ThinDOM.prototype.get = function() {
    return this.el;
  };

  return ThinDOM;

})();

thisGlobal.ThinDOM = ThinDOM;

module.exports = ThinDOM;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},["d:\\Github\\ThinDOM\\src\\ThinDOM.coffee"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHNyY1xcVGhpbkRPTS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUEsSUFBQTs7QUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLFFBQVI7O0FBQ0osTUFBQSxHQUFTLE9BQUEsQ0FBUSxRQUFSOzs7QUFFVDs7OztBQUdBLFVBQUEsR0FBYSxDQUFJLE9BQU8sTUFBUCxLQUFtQixXQUFuQixJQUFtQyxNQUF0QyxHQUFrRCxNQUFsRCxHQUErRCxDQUFJLE9BQU8sTUFBUCxLQUFtQixXQUF0QixHQUF1QyxNQUF2QyxHQUFtRCxJQUFwRCxDQUFoRTs7O0FBRWI7Ozs7QUFHQSxZQUFBLEdBQWUsQ0FBQyxTQUFBO0FBQ2QsTUFBQTtFQUFBLElBQUcsT0FBTyxRQUFQLEtBQXFCLFdBQXhCO0lBQ0UsRUFBQSxHQUFLLFFBQVEsQ0FBQztJQUNkLElBQUcsRUFBRSxDQUFDLE1BQU47YUFDRSxTQURGO0tBQUEsTUFFSyxJQUFHLEVBQUUsQ0FBQyxVQUFOO2FBQ0gsYUFERztLQUFBLE1BQUE7YUFHSCxVQUhHO0tBSlA7O0FBRGMsQ0FBRCxDQUFBLENBQUE7OztBQVdmOzs7O0FBR007RUFFUyxpQkFBQyxHQUFELEVBQU8sVUFBUCxFQUFtQixHQUFuQjtJQUFDLElBQUMsQ0FBQSxNQUFEO0lBQWtCLElBQUMsQ0FBQSxtQkFBRCxNQUFNOztNQUNwQyxJQUFDLENBQUEsS0FBTSxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUFDLENBQUEsR0FBeEI7O0lBQ1AsSUFBRyxVQUFIO01BQW1CLElBQUMsQ0FBQSxJQUFELENBQU0sVUFBTixFQUFuQjs7RUFGVzs7b0JBSWIsT0FBQSxHQUFTOzs7QUFFVDs7OztvQkFHQSxHQUFBLEdBQUssU0FBQyxJQUFELEVBQU8sR0FBUDtJQUNILElBQUUsQ0FBQSxJQUFBLENBQUYsR0FBVTtXQUNWO0VBRkc7O29CQUlMLE9BQUEsR0FBUyxTQUFDLEtB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QUFBLElBQUEsQ0FBckIsRUFERzs7V0FLTDtFQVpJOzs7QUFjTjs7Ozs7O29CQUtBLElBQUEsR0FBTSxTQUFDLFVBQUQsRUFBYSxLQUFiO0FBQ0osUUFBQTtJQUFBLEdBQUEsR0FBTTtJQUNOLElBQUcsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxVQUFYLENBQUg7TUFDRSxJQUFHLEtBQUEsS0FBUyxDQUFDLFVBQVUsQ0FBQyxPQUFYLENBQW1CLE9BQW5CLENBQUEsS0FBK0IsQ0FBaEMsQ0FBWjtRQUNFLFVBQUEsR0FBYSxPQUFBLEdBQVUsV0FEekI7O01BRUEsR0FBQSxHQUFNLElBQUMsQ0FBQSxJQUFELENBQU0sVUFBTixFQUFrQixLQUFsQixFQUhSO0tBQUEsTUFJSyxJQUFHLENBQUMsQ0FBQyxhQUFGLENBQWdCLFVBQWhCLENBQUg7TUFDSCxDQUFDLENBQUMsTUFBRixDQUFTLFVBQVQsRUFBcUIsQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFDLEdBQUQsRUFBTSxHQUFOO1VBQ25CLElBQUcsS0FBQSxLQUFTLENBQUMsR0FBRyxDQUFDLE9BQUosQ0FBWSxPQUFaLENBQUEsS0FBd0IsQ0FBekIsQ0FBWjtZQUNFLEdBQUEsR0FBTSxPQUFBLEdBQVUsSUFEbEI7O1VBRUEsR0FBQSxHQUFNLEtBQUMsQ0FBQSxJQUFELENBQU0sR0FBTixFQUFXLEtBQVg7UUFIYTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBckIsRUFERzs7V0FNTDtFQVpJOzs7QUFjTjs7OztvQkFHQSxHQUFBLEdBQUssU0FBQTtXQUNILElBQUMsQ0FBQTtFQURFOzs7Ozs7QUFJUCxVQUFVLENBQUMsT0FBWCxHQUFxQjs7QUFFckIsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXyA9IHJlcXVpcmUgJ2xvZGFzaCdcclxualF1ZXJ5ID0gcmVxdWlyZSAnanF1ZXJ5J1xyXG5cclxuIyMjXHJcbkNhcHR1cmUgdGhlIGdsb2JhbCBvYmplY3QgaW4gb3JkZXIgb2Y6IGdsb2JhbCwgd2luZG93LCB0aGlzXHJcbiMjI1xyXG50aGlzR2xvYmFsID0gKGlmIHR5cGVvZiBnbG9iYWwgaXNudCAndW5kZWZpbmVkJyBhbmQgZ2xvYmFsIHRoZW4gZ2xvYmFsIGVsc2UgKChpZiB0eXBlb2Ygd2luZG93IGlzbnQgJ3VuZGVmaW5lZCcgdGhlbiB3aW5kb3cgZWxzZSB0aGlzKSkpXHJcblxyXG4jIyNcclxuQ2FwdHVyZSB0aGUgY29ycmVjdCByZW1vdmUgbWV0aG9kIGZvciB1c2Ugd2hlbiBkcm9wcGluZyBub2Rlc1xyXG4jIyNcclxucmVtb3ZlTWV0aG9kID0gKC0+XHJcbiAgaWYgdHlwZW9mIGRvY3VtZW50IGlzbnQgJ3VuZGVmaW5lZCdcclxuICAgIGVsID0gZG9jdW1lbnQuYm9keVxyXG4gICAgaWYgZWwucmVtb3ZlXHJcbiAgICAgICdyZW1vdmUnXHJcbiAgICBlbHNlIGlmIGVsLnJlbW92ZU5vZGVcclxuICAgICAgJ3JlbW92ZU5vZGUnXHJcbiAgICBlbHNlICNrbHVkZ2UgZm9yIGFuIGVkZ2UgY2FzZSB0aGF0IHByb2JhYmx5IGRvZXNuJ3QgZXhpc3RcclxuICAgICAgJ3ZhbHVlT2YnXHJcbikoKVxyXG5cclxuIyMjXHJcbkEgbGl0dGxlIHRoaW4gRE9NIHdyYXBwZXIgd2l0aCBjaGFpbmluZ1xyXG4jIyNcclxuY2xhc3MgVGhpbkRPTVxyXG5cclxuICBjb25zdHJ1Y3RvcjogKEB0YWcsIGF0dHJpYnV0ZXMsIEBlbCA9IG51bGwpIC0+XHJcbiAgICBAZWwgPz0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBAdGFnXHJcbiAgICBpZiBhdHRyaWJ1dGVzIHRoZW4gQGF0dHIgYXR0cmlidXRlc1xyXG5cclxuICBUSElORE9NOiAnVEhJTkRPTSdcclxuXHJcbiAgIyMjXHJcbiAgQ29udmVuaWVuY2UgbWV0aG9kIGZvciBhZGRpbmcgcHJvcHMgdG8gb2JqZWN0c1xyXG4gICMjI1xyXG4gIGFkZDogKG5hbWUsIHZhbCkgLT5cclxuICAgIEBbbmFtZV0gPSB2YWxcclxuICAgIEBcclxuXHJcbiAgX2FwcGVuZDogKG90aGVyKSAtPlxyXG4gICAgQGVsLmFwcGVuZENoaWxkIG90aGVyXHJcbiAgICBAZWxcclxuXHJcbiAgIyMjXHJcbiAgQXBwZW5kIG9uZSBub2RlIHRvIGFub3RoZXJcclxuICAjIyNcclxuICBhcHBlbmQ6IChvdGhlcikgLT5cclxuICAgIHJldCA9IEBcclxuICAgIGlmIG90aGVyLlRISU5ET01cclxuICAgICAgQF9hcHBlbmQgb3RoZXIuZ2V0KClcclxuICAgIGVsc2UgaWYgXy5pc0VsZW1lbnQgb3RoZXJcclxuICAgICAgQF9hcHBlbmQgb3RoZXJcclxuICAgIGVsc2UgaWYgb3RoZXIgaW5zdGFuY2VvZiBqUXVlcnlcclxuICAgICAgaWYgb3RoZXIubGVuZ3RoID4gMVxyXG4gICAgICAgIF8uZm9yRWFjaCBvdGhlciwgKGksIG90aGVyRWwpID0+XHJcbiAgICAgICAgICBAX2FwcGVuZCBvdGhlckVsXHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgZWxzZVxyXG4gICAgICAgIEBfYXBwZW5kIG90aGVyWzBdXHJcbiAgICByZXRcclxuXHJcbiAgX3ByZXBlbmQ6IChvdGhlcikgLT5cclxuICAgIEBlbC5pbnNlcnRCZWZvcmUgb3RoZXIsIEBlbC5maXJzdENoaWxkXHJcbiAgICBAZWxcclxuXHJcbiAgIyMjXHJcbiAgUHJlcGVuZCBvbmUgbm9kZSB0byB0aGUgZmlyc3QgY2hpbGQgbm9kZSBwb3NpdGlvbiBvZiBhbm90aGVyXHJcbiAgIyMjXHJcbiAgcHJlcGVuZDogKG90aGVyKSAtPlxyXG4gICAgcmV0ID0gQFxyXG4gICAgaWYgb3RoZXIuVEhJTkRPTVxyXG4gICAgICBAX3ByZXBlbmQgb3RoZXIuZ2V0KClcclxuICAgIGVsc2UgaWYgXy5pc0VsZW1lbnQgb3RoZXJcclxuICAgICAgQF9wcmVwZW5kIG90aGVyXHJcbiAgICBlbHNlIGlmIG90aGVyIGluc3RhbmNlb2YgalF1ZXJ5XHJcbiAgICAgIGlmIG90aGVyLmxlbmd0aCA+IDFcclxuICAgICAgICBfLmZvckVhY2ggb3RoZXIsIChpLCBvdGhlckVsKSA9PlxyXG4gICAgICAgICAgQF9wcmVwZW5kIG90aGVyRWxcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICBlbHNlXHJcbiAgICAgICAgQF9wcmVwZW5kIG90aGVyWzBdXHJcbiAgICByZXRcclxuXHJcbiAgIyMjXHJcbiAgRHJvcCBhIG5vZGVcclxuICAjIyNcclxuICByZW1vdmU6IC0+XHJcbiAgICBAZWxbcmVtb3ZlTWV0aG9kXSgpXHJcbiAgICByZXR1cm5cclxuXHJcbiAgIyMjXHJcbiAgU2V0IHRoZSBlbGVtZW50J3Mgc3R5bGUgYXR0cmlidXRlc1xyXG4gICMjI1xyXG4gIGNzczogKHByb3BlcnRpZXMsIHZhbHVlKSAtPlxyXG4gICAgcmV0ID0gQFxyXG4gICAgaWYgXy5pc1N0cmluZyBwcm9wZXJ0aWVzXHJcbiAgICAgIGlmIHZhbHVlXHJcbiAgICAgICAgQGVsLnN0eWxlW3Byb3BlcnRpZXNdID0gdmFsdWVcclxuICAgICAgZWxzZVxyXG4gICAgICAgIHJldCA9IEBlbC5zdHlsZVtwcm9wZXJ0aWVzXVxyXG4gICAgZWxzZSBpZiBfLmlzUGxhaW5PYmplY3QgcHJvcGVydGllc1xyXG4gICAgICBfLmZvck93biBwcm9wZXJ0aWVzLCAodmFsLCBrZXkpID0+XHJcbiAgICAgICAgaWYgdmFsIGlzbnQgJydcclxuICAgICAgICAgIEBlbC5zdHlsZVtrZXldID0gdmFsXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICByZXRcclxuXHJcbiAgIyMjXHJcbiAgU2V0IHRoZSBpbm5lciBIVE1MIChzbG93KVxyXG4gICMjI1xyXG4gIGh0bWw6IChodG1sKSAtPlxyXG4gICAgcmV0ID0gQFxyXG4gICAgdW5sZXNzIGh0bWw/XHJcbiAgICAgIHJldCA9IEBlbC5pbm5lckhUTUxcclxuICAgIGVsc2VcclxuICAgICAgQGVsLmlubmVySFRNTCA9IGh0bWxcclxuICAgIHJldFxyXG5cclxuICAjIyNcclxuICBBZGQgdGV4dCBub2RlIChmYXN0KVxyXG4gICMjI1xyXG4gIHRleHQ6IChzdHIpIC0+XHJcbiAgICByZXQgPSBAXHJcbiAgICB1bmxlc3Mgc3RyXHJcbiAgICAgIHJldCA9IHNlbGYuZWwuaW5uZXJIVE1MXHJcbiAgICBlbHNlXHJcbiAgICAgIHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSBzdHJcclxuICAgICAgQGVsLmFwcGVuZENoaWxkIHRcclxuICAgIHJldFxyXG5cclxuICAjIyNcclxuICBTZXQgcHJvcHMgb24gdGhlIG5vZGVcclxuICAjIyNcclxuICBhdHRyOiAocHJvcGVydGllcywgdmFsdWUpIC0+XHJcbiAgICByZXQgPSBAXHJcbiAgICBpZiBfLmlzU3RyaW5nKHByb3BlcnRpZXMpXHJcbiAgICAgIGlmIHZhbHVlXHJcbiAgICAgICAgQGVsLnNldEF0dHJpYnV0ZSBwcm9wZXJ0aWVzLCB2YWx1ZVxyXG4gICAgICBlbHNlXHJcbiAgICAgICAgcmV0ID0gQGVsLmdldEF0dHJpYnV0ZSBwcm9wZXJ0aWVzXHJcbiAgICBlbHNlIGlmIF8uaXNPYmplY3QocHJvcGVydGllcylcclxuICAgICAgXy5mb3JPd24gcHJvcGVydGllcywgKHZhbCwga2V5KSA9PlxyXG4gICAgICAgIGlmIHZhbCBpc250ICcnXHJcbiAgICAgICAgICBAZWwuc2V0QXR0cmlidXRlIGtleSwgdmFsXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICByZXRcclxuXHJcbiAgIyMjXHJcbiAgQWRkIGRhdGEgcHJvcHNcclxuICBwZXI6IGh0dHA6Ly9qc3BlcmYuY29tL2RhdGEtZGF0YXNldC85XHJcbiAgc2V0QXR0cmlidXRlIGlzIGZhc3Rlc3RcclxuICAjIyNcclxuICBkYXRhOiAocHJvcGVydGllcywgdmFsdWUpIC0+XHJcbiAgICByZXQgPSBAXHJcbiAgICBpZiBfLmlzU3RyaW5nIHByb3BlcnRpZXNcclxuICAgICAgaWYgZmFsc2UgaXMgKHByb3BlcnRpZXMuaW5kZXhPZignZGF0YS0nKSBpcyAwKVxyXG4gICAgICAgIHByb3BlcnRpZXMgPSAnZGF0YS0nICsgcHJvcGVydGllc1xyXG4gICAgICByZXQgPSBAYXR0ciBwcm9wZXJ0aWVzLCB2YWx1ZVxyXG4gICAgZWxzZSBpZiBfLmlzUGxhaW5PYmplY3QgcHJvcGVydGllc1xyXG4gICAgICBfLmZvck93biBwcm9wZXJ0aWVzLCAodmFsLCBrZXkpID0+XHJcbiAgICAgICAgaWYgZmFsc2UgaXMgKGtleS5pbmRleE9mKCdkYXRhLScpIGlzIDApXHJcbiAgICAgICAgICBrZXkgPSAnZGF0YS0nICsga2V5XHJcbiAgICAgICAgcmV0ID0gQGF0dHIga2V5LCB2YWx1ZVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgcmV0XHJcblxyXG4gICMjI1xyXG4gIEdldCB0aGUgSFRNTCBFbGVtZW50XHJcbiAgIyMjXHJcbiAgZ2V0OiAtPlxyXG4gICAgQGVsXHJcblxyXG4jIGV4cG9ydCBUaGluRG9tIHRvIHRoZSBnbG9iYWwgb2JqZWN0XHJcbnRoaXNHbG9iYWwuVGhpbkRPTSA9IFRoaW5ET01cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVGhpbkRPTVxyXG4iXX0=
