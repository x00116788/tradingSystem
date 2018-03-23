'use strict';
let http = require('http'),
    charges = 5,
    miniumum = 50;// to maintain an account

module.exports = {

    buyStock: function(params){ 
        let promise = new Promise( (fulfill, reject) => {
            try{
                if (param.amount > (param.customer.balance + charges + minimum )){
                    reject('insufficient funds');
                }
                Market.findOne(param.market)
                .exec(function(err, market) {
                    let vol = param.amount / market.current;
                    if (err) {reject(err)}
                    Trade.create({
                        market: market,
                        cost: param.amount,
                        volume: vol,
                        owner: param.customer,
                        direction: 'Buy'
                    }).exec( function (err, trade){
                        if (err){reject(err)}
                        if (!trade){ 
                            reject ('error occured')
                        }
                        Transaction.create({
                            transaction_ref : "buy_" + customer.id + ' ' + new Date().toISOString(),
                            description : 'buy share',
                            direction : 'OUT',
                            status : 'Approved',
                            transaction_amount : param.amount,
                            customer_ID : params.customer,
                            date: new Date().toISOString(),
                            old_balance : balance,
                            new_balance : new_cust_balance 
                        }).exec( function (err, trans){
                            if (err){reject(err)}
                            else if (!trans){ 
                                reject ('error occured')
                            }
                            else{                            
                                customer.balance -= Number(params.amount + charges);// full charge on buying
                                customer.save();
                                shareService.add({customer:param.customer, market: market, volume:vol});
                                var success = {
                                'market': market,
                                'message': 'success',
                                'volume': vol,
                                'charges': '$'+charges,
                                'total': '$'+(param.amount + charges)
                                }
                            }                        
                        }) 
                    });                    
                })
                fulfill(success);    
            }             
            catch(err){ reject(err, 'endpoint error occured');           };
        })
        return promise;        
    },

    sellStock: function(params){ 
        let promise = new Promise( (fulfill, reject) => {
            try{
                Market.findOne(param.market)
                .exec(function(err, market) {
                    let amount = param.volume * market.current;
                    if (err) {reject(err)}
                    Trade.create({
                        market: market,
                        cost: amount,
                        volume: param.volume,
                        owner: param.customer,
                        direction: 'Sell'
                    }).exec( function (err, trade){
                        if (err){reject(err)}
                        if (!trade){ 
                            reject ('error occured')
                        }
                        Transaction.create({
                            transaction_ref : "sell_" + customer.id + ' ' + new Date().toISOString(),
                            description : 'sell share',
                            direction : 'IN',
                            status : 'Approved',
                            transaction_amount : param.amount - charges/2,
                            customer_ID : params.customer,
                            date: new Date().toISOString(),
                            old_balance : customer.balance,
                            new_balance : customer.balance + Number(params.amount- (charges/2))
                        }).exec( function (err, trans){
                            if (err){reject(err)}
                            else if (!trans){ 
                                reject ('error occured')
                            }
                            else{                            
                                customer.balance += Number(params.amount- (charges/2)); //half charge on selling
                                customer.save();
                                shareService.deduct({customer:param.customer, market: market, volume:vol});
                                var success = {
                                'market': market,
                                'message': 'success',
                                'volume': vol,
                                'charges': '$'+ charges/2,
                                'total': '$'+(param.amount + charges/2)
                                }
                            }                        
                        })
                    });                    
                })
                fulfill(success);    
            }             
            catch(err){ reject(err, 'endpoint error occured');           };
        })
        return promise;        
    }
}