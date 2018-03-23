/**
 * MarketController
 *
 * @description :: Server-side logic for managing markets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var dataAdded = [], count = 0;

module.exports = {

    stock: function(req, res){
		try{
            Market.find().then((markets) =>{
                for(var i in markets){
                console.log('markets >>> ' + markets[i].code);
                let id =  markets[i].id;
                    MarketService.stock(markets[i].code).then((stocks) =>{
                        // console.dir(stocks, {depth:null});
                        for ( p in stocks["Time Series (1min)"]){
                            // console.dir(p, {depth:null});
                            Data.create({
                                market: id,
                                date: p,
                                open: stocks["Time Series (1min)"][p]["1. open"],
                                high: stocks["Time Series (1min)"][p]["2. high"],
                                low: stocks["Time Series (1min)"][p]["3. low"],
                                close: stocks["Time Series (1min)"][p]["4. close"],
                                volume: stocks["Time Series (1min)"][p]["5. volume"]
                            }).exec(function(err, data) {
                                if (err){
                                    console.log(err);
                                    return;
                                }
                                if(!data){
                                    console.log('not data');
                                    return;
                                }
                                                           });
                        }//end for stocks
                        console.log('ctrler stock' + count)
                    }) 
                    count++;
                    dataAdded.push(markets[i].code);
                    
                }//end for markets
            })
            res.send(201, "market data added for " + dataAdded);
            // res.send(201, 'market data added');
		}catch(err){

			console.log('err' + err);
		}

	}
	
};

