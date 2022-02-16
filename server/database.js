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


module.exports = get_user;