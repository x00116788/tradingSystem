/**
 * Market.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
        name: {type: 'string',
                required: true},
        code: {type: 'string',
                alphanumeric: true,
                required: true},
        bull_streaks: {type: 'float',
                defaultsTo: 0},
        bear_streaks: {type: 'float',
                defaultsTo: 0},
        current:{type: 'float'},
        opening: {type: 'float'},
        closing: {type: 'float'},
        high: {type: 'float'},
        low:  {type: 'float'},
        prices: {collecction: 'data',
                'via': 'market'},
        trades: {collecction: 'trade',
                'via': 'market'}
  }
};

