'use strict';
let http = require('http');

module.exports = {
    topup: function (params){
        let topupPromise = new Promise((fulfil, reject) => {
            if (params.amount < 5) {reject('low credit amount')}
            let balance = params.customer.balance,
                new_cust_balance = balance + params.amount;
            Transaction.create({
                transaction_ref : "Top-up " + customer.id + ' ' + new Date().toISOString(),
                description : 'add balance',
                direction : 'IN',
                status : 'Approved',
                transaction_amount : params.amount,
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
                    customer.balance += Number(params.amount);
                    card.save();
                    let success = {
                    'reference': trans.transaction_ref,
                    'message': 'success',
                    'topup amount': params.amount,
                    'previous balance': balance,
                    'new balance': customer.balance
                    }
                    fulfill (success); 
                    console.log(trans);
                }                        
            })
            .catch((non) => {
				reject (non)
			});
        })
        return topupPromise;
    }

};