
document.addEventListener('DOMContentLoaded', () => {

    // Connect to websocket
    const socket = io();

    // Default room
    let room = "room1"
    joinRoom("room1");

    // Get username and save it on localstorage
    
    var userDisplay = document.querySelector("#show_username").textContent

    //document.querySelector("#set-username").onclick=function(){
    //    myUsername = document.querySelector("#myUsername").value
    //    localStorage.setItem('username', myUsername);
    //    var username = localStorage.getItem('username');
    //    document.querySelector("#show_username").append(username);
    //};
    //var username = localStorage.getItem('username');
    //document.querySelector("#show_username").append(username);
    //console.log(username);

    var username = localStorage.getItem('username');
    document.querySelector("#show_username").classList.add('d-none');

    if (username == null){
        document.querySelector("#set-username").onclick=function(){
            myUsername = document.querySelector("#myUsername").value
            localStorage.setItem('username', myUsername);
            var username = localStorage.getItem('username');
            document.querySelector("#show_username").append(username);
            document.querySelector("#show_username").classList.remove('d-none');
            document.querySelector("#user_display").classList.add('d-none');
        
        };
    }
    else{
        var username = localStorage.getItem('username');
        document.querySelector("#show_username").append(username);
        document.querySelector("#show_username").classList.remove('d-none');
        document.querySelector("#user_display").classList.add('d-none');
    }
    

    // Display incoming messages
    socket.on('message', data => {

        const li = document.createElement('li');
        li.innerHTML = `${data.msg}`;
        document.querySelector("#messages").append(li);
    });

    // Sending a message
    document.querySelector("#send").onclick=function(){
        socket.emit('message', {'msg': document.querySelector("#myMessage").value, 'room': room});
        document.querySelector("#myMessage").value = '';
    };
    
    // Room selection
    document.querySelectorAll('.select-room').forEach(li => {
        li.onclick = () => {
            let newRoom = li.innerHTML;

            if (newRoom == room){
                msg = `You are already in ${room}`;
                printSysMsg(msg);
            }else{
                leaveRoom(room);
                joinRoom(newRoom);
                room = newRoom;
            }
             
        };
    });

    // Leave room
    function leaveRoom(room){
        socket.emit('leave', {'room': room});
    }

    // Join room
    function joinRoom(room){
        socket.emit('join', {'room': room});
        document.querySelector('#messages').innerHTML = ''
    }

    // Get data from the setnewRoom input id

    document.querySelector("#set_newRoom").onclick=function(){
        const rName = document.querySelector("#setnewRoom").value.trim();
        if(rName === ""){
            alert('channel name is empty');
        }
        else{
            socket.emit('new_room', {'new_room_name': rName});

            // add new room to the room <li>
           
            const li = document.createElement('li');
            li.setAttribute('class','select-room');
            //console.log(li.innerHTML = rName);
             
            document.querySelector("#rooms").append(li);
        }
        
        
    };

    



    // Print system message
    function printSysMsg(msg){
      
        const li = document.createElement('li');
        li.innerHTML = msg;
        document.querySelector("#messages").append(li);
    }

});