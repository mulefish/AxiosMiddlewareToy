const get_user = require('./database.js');

const verdict = ( msg, a, b  ) => {
    if ( JSON.stringify(a) === JSON.stringify(b) ) {
        console.log('PASS: ' + msg);
    }  else {
        console.log('FAIL: ' + msg);
    }
} 
////////////////////////////////////////////////////////////////////////////////
function get_named_user() {
    // let obj = data.filter(x => x.username == "Bewick" )[0] 
    let obj = get_user("Bewick")
    const actual = obj['email']
    const expected = 'bakedrasberry@company.com'
    verdict('get_named_user ' + actual, actual, expected)
} 

function get_unnamed_user() {
    // let obj = data.filter(x => x.username == "Bewick" )[0] 
    let obj = get_user('This is not a good username so return anon')
    const actual = obj['email']
    const expected = 'unknown'
    verdict('get_unnamed_user ' + actual, actual, expected)
}


const main=()=>{
    get_named_user();
    get_unnamed_user();
}
main()


