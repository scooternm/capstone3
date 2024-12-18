"use strict";

const apiBaseURL = "http://localhost:5005";
// Online server:   "http://microbloglite.us-east-2.elasticbeanstalk.com"

// NOTE: API documentation is available at /docs 
// For example: http://localhost:5000/docs
// For example: https://microbloglite.us-east-2.elasticbeanstalk.com/docs

function getLoginData () {
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON) || {};
}
function isLoggedIn () {
    const loginData = getLoginData();
    return Boolean(loginData.token);
}
function login (loginData) {
    const options = { 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    };

    return fetch(apiBaseURL + "/auth/login", options)
        .then(response => response.json())
        .then(loginData => {
            if (loginData.message === "Invalid username or password") {
                console.error(loginData)
                return null
            }

            window.localStorage.setItem("login-data", JSON.stringify(loginData));
            window.location.assign("posts.html");

            return loginData;
        });
}
function logout () {
    const loginData = getLoginData();
    const options = { 
        method: "GET",
        headers: { 
            Authorization: `Bearer ${loginData.token}`,
        },
    };

    fetch(apiBaseURL + "/auth/logout", options)
        .then(response => response.json())
        .then(data => console.log(data))
        .finally(() => {
            window.localStorage.removeItem("login-data");
            window.location.assign("/");
        });
}
