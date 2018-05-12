
const fnt = require('./index.js');

fnt.getStats("allanx", "pc", (err, result) => {
    if(err){
        console.log(err.message);
    }else{
        console.log(`name: ${result.accountName}`);
        console.log(`kd: result.kd`);
    }
});
