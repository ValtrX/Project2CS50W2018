
document.addEventListener('DOMContentLoaded', () => {

    // Connect to websocket
    const socket = io();

    socket.on('message', msg => {


        const li = document.createElement('li');
        li.innerHTML = `message: ${msg}`;
        document.getElementById("messages").append(li);

    });

    

    document.getElementById("send").onclick=function(){
        
       
        socket.send(document.getElementById("myMessage").value);

        document.getElementById("myMessage").value = '';
    };
    
    
});