/**
 * TransactionController
 *
 * @description :: Server-side logic for managing transactions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    addCredit: function(req,res){
        if (req.headers.auth === undefined || req.headers.auth != Auth){res.send(401, 'NOt Authenticated')}

        try{
            req.allParams().auth = undefined;
            TransactionService.addCredit(req.allParams()).then((topup) => {
                res.send(topup)
            })
            .catch((non) => {
                res.send(403,{error: non})
                });
            
        }catch(e){res.send(e)}        
    },
	
};

