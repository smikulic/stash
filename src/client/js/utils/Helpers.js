'use strict';


export default {

  formatValues (value) {
    let valueToString = value.toString();
    let valueToStringLength = value.toString().length;
    let result = valueToString.slice(0, valueToStringLength - 2) + "." + valueToString.slice(valueToStringLength - 2);
    return result;
  }
};
