/**
 * Trade.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    market: {model: 'market'},
    cost: {type: 'float',
            required: true},
    volume:{type: 'float'},
    owner: {model:'customer',
            required: true},
    direction: { type: 'string',
                enum: ['Buy', 'Sell'],
                required: true}
  }
};

