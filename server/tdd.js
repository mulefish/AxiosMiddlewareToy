const data = require('./database.js');

const verdict = ( msg, a, b  ) => {
    if ( JSON.stringify(a) === JSON.stringify(b) ) {
        console.log('PASS: ' + msg);
    }  else {
        console.log('FAIL: ' + msg);
    }
} 
////////////////////////////////////////////////////////////////////////////////
function filter_data_test() {
    let obj = data.filter(x => x.username == "Bewick" )[0] 
    console.log( obj['email'] )
    const actual = obj['email']
    const expected = 'bakedrasberry@company.com'
    verdict('filter_data_test ' + actual, actual, expected)
} 

const main=()=>{
    filter_data_test();
}
main()


