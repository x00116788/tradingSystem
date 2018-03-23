/**
 * TradeController
 *
 * @description :: Server-side logic for managing trades
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';
module.exports = {
    buy: (req, res) => {
        let param = req.param.all();
        try{
            Customer.findOne({id: param.id})
        .exec(function(err, customer) {
            if (err) {res.send(err)}
            if (!customer) {res.send(400,"Invalid Credentials")}
            console.log(customer)
            param.customer = customer;
            tradeService.buyStock(param).then((trade) => {
                res.send(200, trade);
            })
        })            
		}catch(err){
            console.log('err' + err);
            res.send(400, 'client error occurred');
		}
        
    },

    sell: (req, res) => {
        let param = req.param.all();
        try{
            Customer.findOne({id: param.id})
        .exec(function(err, customer) {
            if (err) {res.send(err)}
            if (!customer) {res.send(400,"Invalid Credentials")}
            param.customer = customer;
            tradeService.sellStock(param).then((trade) => {
                res.send(200, trade);
            })
        })            
		}catch(err){
            console.log('err' + err);
            res.send(400, 'client error occurred');
		}
        
    },

};

