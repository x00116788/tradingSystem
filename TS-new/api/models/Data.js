/**
 * Data.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    market: {model: 'market'},
    date: {type: 'date',
            // unique: true,
            required: true},
    open: {type: 'float'},
    high: {type: 'float'},
    low:  {type: 'float'},
    close:{type: 'float'},
    volume: {type: 'float'}
  }
};

