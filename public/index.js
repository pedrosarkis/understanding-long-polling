
const messageElement = document.getElementById('message');
const textAreaElement = document.getElementById('pollingResult');

const sendNewMessage = async  () => {
    const valueToSend = messageElement.value;

    const settings = {
        method:'POST',
        body: JSON.stringify({valueToSend})
    }
    const response = await fetch('http://localhost:3000/receiveMessage', settings);
    const data = await response.json();
}

const longPolling = async  () => {
    let hasAppended = false;
    const response = await fetch('http://localhost:3000/getMessage');

    if(response.status == 502) {
        await longPolling();
    } else if( response.status !== 200) {
        console.log('Houve algum erro nessa bosta');
        await longPolling();
    } else {
        const data = await response.text();
        if(data) {
            textAreaElement.value += data;
            hasAppended = true;
        } else {
            hasAppended = false;
        }
        
        await longPolling();
    }
}

document.getElementById('sendMessage').addEventListener('click', sendNewMessage);

window.onload = async () => {
    console.log('eoi');
    alert('oi');
    await longPolling();
}




