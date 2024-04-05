import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import user from './gallery/user.png';
import people from './gallery/people.png';
import updates from './gallery/updates.png';
import chatbubble from './gallery/chat-bubble.png';
import chatlogo from './gallery/chat.png';
import dots from './gallery/dots.png';
import searchlens from './gallery/search.png';
import menu from './gallery/menu.png';
import singletick from './gallery/singletick.png';
import desktop from './gallery/desktop.png';
import camera from './gallery/video-camera.png';
import smile from './gallery/smile.png';
import plus from './gallery/plus.png';
import record from './gallery/record.png';
import send from './gallery/send.png';
import dot from './gallery/dot.png';
import './Home.css';
import { useRef } from 'react';

export default function Home() {
  const chatContainerRef = useRef(null);

  const [profilePic, setProfilePic] = useState(user);
  const [sender, setSender] = useState('you');
  const [tick, setTick] = useState(singletick);
  const [chat, setChat] = useState('def');
  const [chatContent, setChatContent] = useState();
  const [sendPic, setSendPic] = useState(record);
  const [messageData, setMessageData] = useState([])
  const [messageEntered, setMessageEntered] = useState('');
  const [lastMessage, setLastMessage] = useState();

const handleInputChange = (event) => {
  const value = event.target.value;
  setMessageEntered(value);
  };

useEffect(() => {  
  if (messageEntered.length > 0) {
    setSendPic(send);
  } else {
    setSendPic(record);
  }
}, [messageEntered]); 



const fetchMessageData = async () => {
  try {
      const response = await Axios.get('http://localhost:5001/messagedata');
      setMessageData(response.data);
     
  } catch (error) {
      console.error('Error fetching message data:', error);
  }
};

const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    fetchMessageData();
    sendMessage(); 
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    setTimeout(() => {
      scrolldown();
    }, 50);
    
  }
};
function scrolldown(){
  chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;

}
useEffect(() => {
  if (messageData.length > 0) {
    const last = messageData[messageData.length - 1].sender;
    setLastMessage(messageData[messageData.length - 1].msg)
    if(last === 'Harpreet'){
      setSender("you");
    }else{
      setSender("Priyansh");

    }
    
  }
}, [messageData]);

const sendMessage = async () =>{
 if(sendPic === send){
  try{
    await Axios.post('http://localhost:5001/sendMessage',{
      messageEntered
    });
    setMessageEntered('');
    fetchMessageData('');
  }catch(error){
  }
  
 }
};

const getMessageStyle = (sender) => {
  const styleMap = {
    you: {
      
      messageParent: {
          alignItems: 'flex-start', 
      },
      childMessage: {
          backgroundColor: 'white',
          borderTopLeftRadius: '0px',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px', 
        borderTopRightRadius: '10px',
       }
  },
    Harpreet: {
      messageParent: {
        alignItems: 'flex-end', 
    },
    childMessage: {
        backgroundColor: '#d9fdd3 ', 
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px', 
        borderTopRightRadius: '0px',
    }
    },
};

return styleMap[sender] || {};
};

useEffect(() => {
  setTimeout(() => {
    fetchMessageData();
  }, 1000);
  
}, [fetchMessageData]);

useEffect(() => {
  
  console.log(messageData)
  
  console.log("Chat container ref:", chatContainerRef.current);
  setTimeout(() => {

    document.querySelectorAll('.childMessage').forEach(element => {
      element.style.marginRight = '0';
    });
  }, 50);
  
}, [messageData, chatContainerRef]);


  useEffect(() => {
    switch (chat) {
      case 'Harpreet':
        setChatContent(
          <div className="chatParent">
            <div className="rightNavbar">
              <div className="rightNavbarleft">
                <div className="profile">
                  <img id='profileImg' src={profilePic} alt="" />
                </div>
                <p className="username">Harpreet</p>
              </div>
              <div className="rightNavbarRight">
                  <img id='camera' src={camera} alt="" />
                  <img id='len' src={searchlens} alt="" />
                  <img id='dot' src={dots} alt="" />
              </div>
            </div>
            <div className="chatContainer">
            {!messageData || messageData.length === 0 ? (
    <></>
) : (
    <div className='chatContainerChild' ref={chatContainerRef}>
        {messageData.map((item, index) =>(
          
          <div  className='messageParent' style={getMessageStyle(item.sender).messageParent}  key={index}>
          <div className="childMessage" style={getMessageStyle(item.sender).childMessage}>
              <p id='message'>{item.msg}</p>
              <p id='time'>{item.time}</p>
          </div>
          </div>
        ))}
    </div>
)}
  </div>
           
          </div>
        );
        break;
      case 'def':
        setChatContent(<div className='defaultparent'>
          <div className="default">
            <img id='desktopPic' src={desktop} alt="" />
            <p id='download'>Download WhatsApp for Windows</p>
            <p id='subContent'>Make calls, share your screen and get a faster experience when you download the Windows app.</p>
            <button id='get'>Get from Microsoft Store</button>
          </div>
        </div>);
        break;
      default:
        return;
    }

  }, [profilePic, chat, sendPic,messageData]);
  return (

    <div className='container'>
      <div className="leftContainer">
        <div className="leftNavbar">
          <div className="profile">
            <img id='profileImg' src={profilePic} alt="" />
          </div>
          <div className="leftNavbarRight">
            <img id='navIcon1' src={people} alt="" />
            <img id='navIcon2' src={updates} alt="" />
            <img id='navIcon3' src={chatbubble} alt="" />
            <img id='navIcon4' src={chatlogo} alt="" />
            <img id='navIcon5' src={dots} alt="" />
          </div>
        </div>
        <div className="search">
          <div className="searchlen">
            <img id='searchlen' src={searchlens} alt="" />
          </div>
          <input id='searchbar' type="text" placeholder="Search" />
          <img id='menupic' src={menu} alt="" />
        </div>
        <div className="user" onClick={() => setChat('Harpreet')}>
          <div className="userPic">
            <img id='dp' src={profilePic} alt="" />
          </div>
          <div className="nameChat">
            <p id='senderName'>Harpreet</p>
            <p id='sendMsg'><img id='tick' src={sender === 'Priyansh' ? dot :tick} alt="" />{sender}: {lastMessage}</p>
          </div>
        </div>
      </div>
      <div className="rightContainer">
        {chatContent}
        <div className="chatType">
              <img id='smile' src={smile} alt="" />
              <img id='plus' src={plus} alt="" />
              <input id='messagebar' onKeyDown={handleKeyDown} type="text" value={messageEntered} onChange={handleInputChange} placeholder="Enter something" />    
              <img id='record' onClick={sendMessage} src={sendPic} alt="" />
            </div>
      </div>
    </div>
  )
}
