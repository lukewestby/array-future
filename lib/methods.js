'use strict';

var utilities = require('./utilities');

module.exports = {

  average: function() {
    return this.sum() / this.length;
  },

  clear: function() {
    this.length = 0;
    return this;
  },

  clone: function() {
    return this.slice(0);
  },

  combination: function(size) {
    var mask;
    var index;
    var result;
    var results = [];
    var total = Math.pow(2, this.length);

    for (mask = 0; mask < total; mask++) {
      result = [];
      index = this.length - 1;
      do
        if ((mask & (1 << index)) !== 0) result.push(this[index]);
      while
        (index--);
      if (result.length >= size) results.push(result.reverse());
    }

    return results;
  },

  compact: function() {
    return this.filter(function(elem) {
      return (elem != null);
    });
  },

  difference: function(arr) {
    return this.filter(function(elem) {
      return !arr.includes(elem);
    });
  },

  first: function() {
    return this[0];
  },

  includes: function(elem, fromIndex) {
    var requireFromIndex = (typeof fromIndex === 'number') && fromIndex >= 0;

    if (isNaN(elem)) {
      return this.some(function(currentElem, index) {
        return isNaN(elem) && (!requireFromIndex || index >= fromIndex);
      });
    }

    var index = this.indexOf(elem);
    return requireFromIndex ? index >= fromIndex : index !== -1;
  },

  intersect: function(arr) {
    return this.filter(function(elem) {
      return arr.includes(elem);
    });
  },

  last: function() {
    return this[this.length - 1];
  },

  replace: function(oldElem, newElem) {
    return this.map(function(elem) {
      if (elem === oldElem) return newElem;
      return oldElem;
    });
  },

  remove: function(elem) {
    if (!elem) return this;
    var index = this.indexOf(elem);
    if (index == -1) return this;
    this.splice(index, 1);
    return this;
  },

  shuffle: function() {
    var currentIndex = this.length;
    var temporaryValue;
    var randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      --currentIndex;
      temporaryValue = this[currentIndex];
      this[currentIndex] = this[randomIndex];
      this[randomIndex] = temporaryValue;
    }

    return this;
  },

  sum: function() {
    return this.reduce(function(prev, current) {
      return prev += current;
    }, 0);
  },

  unique: function() {
    return this.reverse().filter(function(elem, index, arr) {
      return arr.indexOf(elem, index + 1) === -1;
    }).reverse();
  },

  zip: function(/*...args*/) {
    var args = Array.prototype.slice.call(arguments);
    var allArrays = [this].concat(args).filter(utilities.isArray);
    var allLengths = allArrays.map(function (array) { return array.length; });
    var highestLength = Math.max.apply(null, allLengths);
    var result = [];
    for(var i = 0; i < highestLength; i++) {
      result.push(allArrays.map(function (array) { return array[i] }));
    }
    return result;
  }
};
