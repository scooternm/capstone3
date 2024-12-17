const BASE_URL = "http://microbloglite.us-east-2.elasticbeanstalk.com";

const NO_AUTH_HEADERS = { 'accept': 'application/json', 'Content-Type': 'application/json' };
async function signUp(username, fullName, password) {
    const payload = JSON.stringify(
        { "username": username, "fullName": fullName, "password": password }
    );

    const response = await fetch(BASE_URL + "/api/users", {
        method: "POST",
        headers: NO_AUTH_HEADERS,
        body: payload
    }); //end fetch

    //TODO check for error response status codes
    if (response.status != 201) {
        console.log(response.status, response.statusText);
        return response.statusText;
    }
    const object = await response.json(); //COnvert body to object
    return object;
}

async function login(username, password) {
    const payload = JSON.stringify({ "username": username, "password": password });
    const response = await fetch(BASE_URL + "/auth/login", {
        method: "POST",
        headers: NO_AUTH_HEADERS,
        body: payload
    }); //end fetch

    //TODO check for error response status codes
    if (response.status != 200) {
        console.log(response.status, response.statusText);
        return response.statusText;
    }
    const object = await response.json(); //COnvert body to object
    localStorage.token = object.token;
    localStorage.username = object.username;
    return object;
}

// ALL THE OTHERS NEED A TOKEN IN THE HEADER
function headersWithAuth() {
    //SAME AS NO AUTH BUT WITH AUTH ADDED
    return { 
        ...NO_AUTH_HEADERS, 
        'Authorization': `Bearer ${localStorage.token}`,
    }
}
// get secure list of message using token
async function getMessageList() {
    const LIMIT_PER_PAGE = 1000;
    const OFFSET_PAGE = 0;
    const queryString = `?limit=${LIMIT_PER_PAGE}&offset=${OFFSET_PAGE}`;

    const response = await fetch(
        BASE_URL + "/api/posts" + queryString, {
        method: "GET",
        headers: headersWithAuth(),
    });
    const object = await response.json();
    return object;
}

async function sendText(text){
    const response = await fetch(
        BASE_URL + "/api/posts", { // endpoint for messages/posts
        method: "POST", //CREATE
        headers: headersWithAuth(),
        body: `{"text":"${text}"}` //make json string by hand instead of stringify
    });
    const object = await response.json();
    return object;
}