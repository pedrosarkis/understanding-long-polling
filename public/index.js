
const messageElement = document.getElementById('message');
const textAreaElement = document.getElementById('pollingResult');

const sendNewMessage = async  () => {
    const valueToSend = messageElement.value;
    debugger;

    const settings = {
        method:'POST',
        body: JSON.stringify({valueToSend}),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }
    const response = await fetch('http://localhost:3000/receiveMessage', settings);
    const data = await response.text();
}

const longPolling = async (message) => {
    
    const response = await fetch('http://localhost:3000/getMessage');
    let lastMessage = '';
    if(response.status == 502) {
        await longPolling();
    } else if(response.status !== 200) {
        await longPolling();
    } else {
        const data = await response.text();
        debugger;
        const isAnyNewResponse = data != '' && message !== data;
        if(isAnyNewResponse) {
            lastMessage = data;
            textAreaElement.innerHTML = data;
        } else {
            lastMessage = message;
        }
        await longPolling(lastMessage);
    }
}

document.getElementById('sendMessage').addEventListener('click', sendNewMessage);

window.onload = async () => {
    await longPolling();
}




