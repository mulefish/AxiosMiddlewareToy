const { get_user, get_fake_article } = require('./database.js');

const verdict = ( msg, a, b  ) => {
    if ( JSON.stringify(a) === JSON.stringify(b) ) {
        console.log('PASS: ' + msg);
    }  else {
        console.log('FAIL: ' + msg);
    }
} 
////////////////////////////////////////////////////////////////////////////////
function test_get_named_user() {
    // let obj = data.filter(x => x.username == "Bewick" )[0] 
    let obj = get_user("Bewick")
    const actual = obj['email']
    const expected = 'bakedrasberry@company.com'
    verdict('get_named_user ' + actual, actual, expected)
} 

function test_get_unnamed_user() {
    // let obj = data.filter(x => x.username == "Bewick" )[0] 
    let obj = get_user('This is not a good username so return anon')
    const actual = obj['email']
    const expected = 'unknown'
    verdict('get_unnamed_user ' + actual, actual, expected)
}

function test_get_fake_article() { 
    const result = get_fake_article();
    const actual = result.length > 0;
    verdict("test_get_fake_article", actual, true );
}

const main=()=>{
    console.log("\n\n**********")
    test_get_named_user();
    test_get_unnamed_user();
    test_get_fake_article(); 
    console.log("\n\n")
}
main()


