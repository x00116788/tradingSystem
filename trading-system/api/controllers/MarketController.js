/**
 * MarketController
 *
 * @description :: Server-side logic for managing markets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    stock: function(req, res){
		try{
            MarketService.stock()
            .then((stock) =>{
                console.log('ctrler stock')
                res.json(201, JSON.parse(stock));
            })
            .catch((non) => {
            res.json(404,{error: ' does not exist'})
            });
		}catch(err){

			console.log('err' + err);
		}

	}
	
};

