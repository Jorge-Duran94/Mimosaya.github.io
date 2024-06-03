import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate } from 'react-router-dom';



function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qweryuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}




export default function VideoCallRoom({tiempo, id_telegram}) {

  const navigate = useNavigate()
  const roomID = getUrlParams().get('roomID') || randomID(5)+"t"+(tiempo || 5);
  let myMeeting = async (element) => {
    // generate Kit Token
    const appID = Number(import.meta.env.VITE_ZEGOCLOUD_APP_ID);
    const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SECRET_KEY;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));


    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement group calls, modify the parameter here to [ZegoUIKitPrebuilt.GroupCall].
      }
    });
    setTimeout(() => {
    fetch('https://api.telegram.org/bot6975965730:AAFDFC-cGpbaLW19IcaxQx2AQPnrURxVNL8/sendMessage?chat_id='+id_telegram+'&text='+window.location.host + window.location.pathname +'videocall/?roomID='+roomID)
  },2000)
  };
  


/* React.useEffect(() => {
  
  setPathVc(window.location.protocol +
    window.location.host + window.location.pathname +
    'videocall/?roomID=' +
    roomID)
    
setTimeout(() => {

},1000)
},[]) */

console.log(id_telegram)

React.useEffect(() => {
  var tempo = getUrlParams().get('roomID') || null

  if(tempo){
    console.log(tempo.split("t")[1])
    setTimeout(() => {
      navigate('/')
    },tempo.split("t")[1]*60*1000)
  }

},[])


  return (
    <>
    <div
      className="myCallContainer"
      ref={myMeeting}
    ></div>
    </>
  );
}