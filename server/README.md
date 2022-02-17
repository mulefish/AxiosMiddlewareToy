# Run the demo

cd AxiosMiddlewareToy/server
npm install

Open 3 terminals

terminal1: node ADFS_mock.js
terminal2: node AEM_mock.js
terminal3: node DSL_mock.js

OR

terminal1: nodemon ADFS_mock.js
terminal2: nodemon AEM_mock.js
terminal3: nodemon DSL_mock.js

'node' vs 'nodemon'?! node is quicker but nodemon will reflect your changes as you make them

browser to localhost:3000

# In the client : What is important to look at?

Two methods: step1_login() and then get_list_of_attention()... ...Everything else is mere noise and niceties.

First off: step1_logic():
let accessToken; # !!! Here is the magic! Part 0 ( a global accessToken that will get set in step1 and used in 'get_list_of_attention' ( in React this will be in Redux of something like that ))

function step1_login() {
const url = "http://localhost:4000/login"
axios({
method: 'post',
url: url,
data: {
username:username // Just a user name like 'Paul' or 'Able'...  
 }
}).then(function(response) {
document.getElementById("output").value = JSON.stringify(response.data, null, 2)
accessToken = response.data.accessToken # !!! Here is the magic! Part 1
refreshToken = response.data.refreshToken
document.getElementById("refreshToken").innerHTML = response.data.refreshToken;
document.getElementById("accessToken").innerHTML = response.data.accessToken;
}).catch(function(error) {
console.log(error.message);
}).then(function() {
// removed for concision
})
}

Second off: Using the accessToken that step1_login set up!

    function get_list_of_attention(){
    	const baseURL = 'http://localhost:3030/';
    	const axiosInstance = axios.create({
    		baseURL,
    		timeout: 0,
    		headers: {
    			'Authorization': `Bearer ${accessToken}`   # !!! Here is the magic! Part 2
    		},
    		data: JSON.stringify({ username:username})
    	})

    	axiosInstance('/get_list_of_attention').then(function(response){
    		const obj = JSON.parse(response.data)
    		document.getElementById("output").value = JSON.stringify( obj, null, 2 )
    		document.getElementById("refreshToken").innerHTML = "";
    		document.getElementById("accessToken").innerHTML = "";
    	}).catch(function(error){
    		alert(error.message)
    	}).then(function() {
            // removed for concision
    	})
    }
