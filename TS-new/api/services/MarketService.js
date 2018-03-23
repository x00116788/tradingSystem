'use strict';
let http = require('http');
const alpha = require('alphavantage')({ key: 'ECWHNVZTYRSY11AK' });

module.exports = {

    retrieveStock: function(marketCode){ 
        let promise = new Promise( (fulfill, reject) => { 
            try{
                console.log('****' + marketCode);
                console.log(' ');
                alpha.data.intraday(marketCode).then(data => {
                    console.log('meta  >>>>>>>>>>>>>  ' + data["Meta Data"]["2. Symbol"]);
                    fulfill(data);    
                })
            }             
            catch(err){ reject(err, 'endpoint error occured');           };
        })
        return promise;
        
    },

    addStock: function () {
        try{
            Market.find().then((markets) =>{
                for(var i in markets){
                console.log('markets >>> ' + markets[i].code);
                let id =  markets[i].id;
                    this.retrieveStock(markets[i].code).then((stocks) =>{   
                        for (var p in stocks["Time Series (1min)"]){
                            Data.findOrCreate({
                                market: id,
                                date: p,
                                open: stocks["Time Series (1min)"][p]["1. open"],
                                high: stocks["Time Series (1min)"][p]["2. high"],
                                low: stocks["Time Series (1min)"][p]["3. low"],
                                close: stocks["Time Series (1min)"][p]["4. close"],
                                volume: stocks["Time Series (1min)"][p]["5. volume"]
                            }).exec(function createFindCB(err, createdOrFoundRecords){
                                if (err){console.log('err:  ' +err)}
                                if (!createdOrFoundRecords){console.log('not:  ' + !createdOrFoundRecords)}
                                // console.dir(createdOrFoundRecords, {depth:null});
                            })
                            
                        }//end for stocks
                        console.log('added stock')
                    })                    
                }//end for markets
            })
        }catch(err){

            console.log('err' + err);
        }
    }
}