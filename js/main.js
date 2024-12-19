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
    });
    if (response.status != 201) {
        console.log(response.status, response.statusText);
        return response.statusText;
    }
    const object = await response.json();
    return object;
}

async function login(username, password) {
    const payload = JSON.stringify({ "username": username, "password": password });
    const response = await fetch(BASE_URL + "/auth/login", {
        method: "POST",
        headers: NO_AUTH_HEADERS,
        body: payload
    });
    if (response.status != 200) {
        console.log(response.status, response.statusText);
        return response.statusText;
    }
    const object = await response.json();
    localStorage.token = object.token;
    localStorage.username = object.username;
    return object;
}
function headersWithAuth() {
    return { 
        ...NO_AUTH_HEADERS, 
        'Authorization': `Bearer ${localStorage.token}`,
    }
}
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
        BASE_URL + "/api/posts", {
        method: "POST",
        headers: headersWithAuth(),
        body: `{"text":"${text}"}`
    });
    const object = await response.json();
    return object;
}