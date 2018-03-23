'use strict';
let http = require('http');
module.exports = {
    add: function(param){
        Share.findOne({customer: param.customer, market: param.market})
        .exec(function(err, share) {
            if (err) {console.log(err)}
            else if (!share) {
                Share.create({
                    market: param.market,
                    customer: param.customer,
                    volume: param.volume
                })
            }
            else{
                share.volume += param.volume;
                share.save();
            }
            
        })
    },

    deduct: function(param){
        Share.findOne({customer: param.customer, market: param.market})
        .exec(function(err, share) {
            if (err) {res.send(err)}
            else if (!share) {
                console.log('No share')
            }
            else{
                if (share.volume < param.volume){console.log('not enough share')}
                else{
                    share.volume -= param.volume;
                    share.save();
                }
            }
                
        })
    }
}