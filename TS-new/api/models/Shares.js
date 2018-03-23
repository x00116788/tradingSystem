/**
 * Shares.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
        market: {model: 'market'},
        owner:{model:'customer'},
        volume: {type: 'float',
                defaultsTo: 0
              },
        autoTrade:{type: 'string',
                  enum: ['Sentiment', 'candles', 'Non'],
                defaultsTo: 'Non'}
  }
};

