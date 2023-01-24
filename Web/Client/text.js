var text_area = document.getElementsByClassName('chatfooter')[0];
var chat_logs = document.getElementsByClassName('chatlogs')[0];

// Create a new instance of the socket.io client
const socket = io();

// Connect to the server
socket.connect('http://localhost:3000');

// Listen for the 'connect' event
socket.on('connect', () => {
    console.log('Connected to server');

});


function createMessageDiv(toggle,data){       // s indicates sent message and r indicates received message. This is for placing chatboxes in a way
    let div1 =  document.createElement("div");
    div1.classList.add("timestamp");
    
    let div2 =  document.createElement("div");
    if(toggle=='s')
        div2.classList.add("msg-content","msg-s");
    else
        div2.classList.add("msg-content","msg-r");

    let div3 =  document.createElement("div");
    if(toggle=='s')
        div3.classList.add("msg","s");
    else
        div3.classList.add("msg","r");

    let sp_div =  document.createElement("div");
    sp_div.classList.add("sp");
    
    let span =  document.createElement("span");
    let time = new Date();
    let today=time.toLocaleString('en-US',{dateStyle:'medium'});
    today = today.replace(",", "");
    span.innerHTML=today+" ";

    span.innerHTML+=time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    
    let p =  document.createElement("p");
    p.innerHTML=data;                           //attach message to p tag
    
    div1.appendChild(span);
    div2.appendChild(p);
    div2.appendChild(div1);

    if(toggle=='s'){
        div3.appendChild(div2);
        div3.appendChild(sp_div);
    }
    else{
        div3.appendChild(sp_div);
        div3.appendChild(div2);
    }
    chat_logs.prepend(div3);  //attach message to DOM 
}





function onPressEnter() {
    let key = window.event.keyCode;
    
    // If the user has pressed enter in textarea in the footer send the message 
    if (key === 13) {
        window.event.preventDefault();

	
	socket.emit('query', text_area.firstElementChild.value);

	data=text_area.firstElementChild.value;
	data=data.replaceAll("<","&lt;");
	data=data.replaceAll(">","&gt;");
        createMessageDiv('s',data);
        text_area.firstElementChild.value='';
    }
    
}


socket.on('response', (data) => {
    console.log(data);
    data=data.replaceAll("<","&lt;");
    data=data.replaceAll(">","&gt;");
    createMessageDiv('r',data);
});
