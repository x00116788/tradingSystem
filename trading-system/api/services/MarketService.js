'use strict';
let http = require('http');
const alpha = require('alphavantage')({ key: 'ECWHNVZTYRSY11AK' });

module.exports = {

    stock: function(){ 
        let promise = new Promise( (fulfill, reject) => { 
            try{
                alpha.data.intraday(`aapl`).then(data => {
                    console.dir(data, {depth:null});
                    fulfill(data);
    
                })
            }             
            catch(err){ reject(err, 'endpoint error occured');           };
        
        // let promise = new Promise( (fulfill, reject) => {
            
        //     try{
        //         console.log('here 1');
        //         http.get('http://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=amzn&interval=1min&outputsize=full&apikey=ECWHNVZTYRSY11AK', (chunk) =>{
        //             console.dir(chunk, {depth:null});
        //             chunk.on('data', (jokeReturned) =>{
        //                 console.log('here:' + jokeReturned );
        //                 fulfill(JSON.parse(jokeReturned));
        //             })
        //         }) 
        //     }catch(err){
        //         reject(err, 'endpoint error occured');
        //     }
        // })
        })
        return promise;
        
    }
}