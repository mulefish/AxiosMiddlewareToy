const crypto = require('crypto');


//// This is all the code for the DB_mock.js file.
const data = [{
    email: 'ashymud@company.com',
    username: 'Able',
    color: 'Blue',
    pet: 'dog',
    drink: 'water',
    location: 'Oregon',
    attention:['news', 'fastcars', 'weather', 'stock'],
},
{
    email: 'bakedrasberry@company.com',
    username: 'Bewick',
    color: 'Red',
    pet: undefined,
    drink: 'coffee',
    location: 'California',
    attention:['news', 'human interest', 'animals', 'pollution', 'marketing','electric', 'toyta', 'tesla'],

},
{
    email: 'charredpie@company.com',
    username: 'Cardinal',
    color: 'Green',
    pet: 'cat',
    location: 'Japan',
    attention:['sports', 'stock']

},
{
    email: 'dunkedfish@company.com',
    username: 'Dingo',
    color: 'Green',
    pet: 'fish',
    location: 'China',
    attention:['event calendar', 'pto calculator', '401k status']

},
{
    email: 'emurific@aothercompany',
    username: 'Emu',
    color: 'Orange',
    pet: 'emu',
    drink: 'tea',
    location: 'India', 
    attention:[ 'childcare', 'carpool-in-my-city', 'stock', 'event calendar', 'pto calculator', '401k status']

}, 
{
    email: 'foxygrass@aothercompany',
    username: 'Fox',
    color: 'Tawny',
    pet: 'worm',
    drink: 'sparkly water',
    location: 'Brazil', 
    attention:[ 'insurance', 'event calendar', 'pto calculator', '401k status']

}

]

const anonymous = {
    email: 'unknown',
    username: 'anon',
    color: 'unknown',
    pet: 'unknown',
    drink: 'unknown',
    location: 'unknown', 
    attention:[ 'childcare', 'carpool-in-my-city', 'insurance','stock', 'event calendar', 'pto calculator', 'sports', 'news', 'human interest', 'animals', 'pollution', 'marketing','electric', 'toyta', 'tesla', 'fastcars', 'weather']
}


function get_user(username) {
    const obj = data.filter(x => x.username == username )[0] // Return the first element in the array.
    if ( obj !== undefined ) {
        return obj; 
    }
    return anonymous;
}

function get_fake_article() { 
    const words = ["warm", "ocean", "sea", "wheel", "earth", "company", "hot!", "tasty", "elephant", "weasel", "otter", "Jupiter", "mud", "sky", "dirt", "wall", "foot", "moon", "ring", "car", "solid" ] 
    const random_word1 = words[Math.floor(Math.random() * words.length)]
    const random_word2 = words[Math.floor(Math.random() * words.length)]
    const random_word3 = words[Math.floor(Math.random() * words.length)]
    const random_word4 = words[Math.floor(Math.random() * words.length)]
    const result = `${random_word1} ${random_word2} ${random_word3} ${random_word4}`
    return result;
}

const algorithm = 'aes-256-cbc';
// Defining key
const key = crypto.randomBytes(32);
// Defining iv
const iv = crypto.randomBytes(16); 
// NOTE! Since node 16 the EXTERNAL crypto module has been deprecated - It is now a built in module.
//https://www.geeksforgeeks.org/node-js-crypto-createcipheriv-method/
// An encrypt function
function encrypt(text) {
    // Creating Cipheriv with its parameter
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    // Updating text
    let encrypted = cipher.update(text);
    // Using concatenation
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    // Returning iv and encrypted data
    return { iv: iv.toString('hex'),encryptedData: encrypted.toString('hex') };
}
function decrypt(encoding) {

    var decipher = crypto.createDecipheriv(cipher_alg, key, iv);

    encoding = encoding || "binary";

    var result = decipher.update(text, encoding);
    result += decipher.final();

    return result;
}
 




module.exports = { get_user, get_fake_article, encrypt } ;