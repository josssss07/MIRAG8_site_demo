function storeAccessToken(token) {
    localStorage.setItem('access_token', token);
}

function getAccessToken() {
    return localStorage.getItem('access_token');
}

// client ID and API key from the Developer Console
const GMAIL_CLIENT_ID = '164591602827-6j5tqneks8tblu0nr55648lfhjqo4rfg.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCcQQ7bjdH-p-KVgYoBcNxKw2woN4HhOLQ';

// Discovery doc URL for API
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://mail.google.com';

let tokenClient = getAccessToken();
let gapiInited = false; // is API initiated
let gisInited = false; // is Google Identity services initiated

// document.getElementById('authorize_button').style.visibility = 'hidden';
document.getElementById('signout_button').style.visibility = 'hidden';
const mail_list = document.getElementById('mail_list');

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    
    maybeEnableButtons();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: GMAIL_CLIENT_ID,
        scope: SCOPES,
        callback: '', // defined later
    });
    gisInited = true;

    maybeEnableButtons();

}

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
    if (gapiInited && gisInited) {
        document.getElementById('authorize_button').style.visibility = 'visible';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
    if(gapiInited && gisInited){
        console.log("hello");
        tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
                throw (resp);
            }
            document.getElementById('signout_button').style.visibility = 'visible';
            document.getElementById('authorize_button').innerText = 'Refresh';
            await listMessages();
        };
    
        if (gapi.client.getToken() === null || getAccessToken === null) {
            // Prompt the user to select a Google Account and ask for consent to share their data
            // when establishing a new session.
            tokenClient.requestAccessToken({ prompt: 'consent' });
        } else {
            // Skip display of account chooser and consent dialog for an existing session.
            tokenClient.requestAccessToken({ prompt: '' });
        }
    }
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        document.getElementById('content').innerText = '';
        document.getElementById('authorize_button').innerText = 'Authorize';
        document.getElementById('signout_button').style.visibility = 'hidden';
    }
}

/**
 * Print all messages in the user's inbox.
 */
async function listMessages() {
    let response;
    try {
        response = await gapi.client.gmail.users.messages.list({
            'userId': 'me',
        });
    } catch (err) {
        document.getElementById('content').innerText = err.message;
        return;
    }
    const messages = response.result.messages;
    if (!messages || messages.length == 0) {
        document.getElementById('content').innerText = 'No messages found.';
        return;
    }

    console.log(messages);

    messages.forEach(function(message){
        getMessage(message.id);
    });
}

function getMessage(messageId) {
    gapi.client.gmail.users.messages.get({
        'userId': 'me',
        'id': messageId
    }).then(function(response) {
        var message = response.result;
        // Extract the email content and display it
        var payload = message.payload;
        var headers = payload.headers;
        var body = payload.body.data;

        var contentType = getHeaderValue(headers, 'Content-Type');
        var contentTransferEncoding = getHeaderValue(headers, 'Content-Transfer-Encoding');

        var subject = getHeaderValue(headers, 'Subject');
        var sender = getHeaderValue(headers, 'From');
        var decodedBody;

        if (contentTransferEncoding === 'base64') {
            decodedBody = atob(body);
        // } else if (contentTransferEncoding === 'quoted-printable') {
        //     var decodedBody = decodeQuotedPrintable(body);
        }
        else {
            decodedBody = "";
        }

        createMail(subject, sender, decodedBody);
    });
}

function getHeaderValue(headers, name) {
    for (var i = 0; i < headers.length; i++) {
        if (headers[i].name === name) {
            return headers[i].value;
        }
    }
    return '';
}

function createMail(subject, sender, body){
    const li = document.createElement('li');
    li.classList.add('mail');

    const subjectEl = document.createElement('p');
    subjectEl.classList.add('subject');
    subjectEl.innerText = subject;

    const senderEL = document.createElement('p');
    senderEL.classList.add('sender');
    senderEL.innerText = sender;

    li.appendChild(subjectEl);
    li.appendChild(senderEL);

    mail_list.appendChild(li);
}

