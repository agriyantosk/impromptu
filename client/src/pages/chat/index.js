import Talk from 'talkjs'
import { useEffect, useState } from 'react'


export default function Home() {
  const [talkLoaded,markTalkLoaded] = useState(false)

  const fetchData = async ()=>{
    try {
      const data = await fetch("/api/getdata")
      // return data
      const jsonData = await data.json()
      return jsonData
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    Talk.ready.then(()=>markTalkLoaded(true))
    if(talkLoaded){
      Talk.ready.then(async ()=>{
        const data = await fetchData()
        const room = data.rooms
        const user = data.users
        
        const member = room.map((room)=>{
          return {
            id:room._id,
            name:room.tripName,
            masterId:room.tripMaster,
            participant:room.tripParticipant
          }
        })

        // contoh aja
        const idLogin = "647b89f5d5ee5e54fde6b01b"

        const loggedInUser = user.find((user) => user._id === idLogin )

        const me = new Talk.User({
          id: loggedInUser._id,
          name: loggedInUser.name,
          welcomeMessage: 'Hi kalian!',
          role: 'default',
        })
        
      
        const otherUsers = member[0].participant.map((member)=>{
          // console.log(member);
          return new Talk.User({
            id: member.id,
            name: member.name,
            welcomeMessage: 'selamat pagi dunia!',
            role:"default"
          })
        })

        const session = new Talk.Session({
          appId:"t9284pmO",
          me:me
        })
        console.log(member[0]);
        const conversationId = member[0].id
        const conversation = session.getOrCreateConversation(conversationId)

        conversation.setParticipant(me)
        otherUsers.forEach(element => {
          conversation.setParticipant(element)
        });

        conversation.setAttributes({
          photoUrl: 'https://i.ytimg.com/vi/kwV3czvhzCI/maxresdefault.jpg',
          subject: `${member[0].name}`,
        });

        const chatbox = session.createChatbox();
        chatbox.select(conversation);
        chatbox.mount(document.getElementById('talkjs-container'));

        return ()=> session.destroy()
      })

    }

  },[talkLoaded])


  return (
    <>
      <h1>ini adalah chat</h1>
      <div id='talkjs-container' style={{height:"70vh"}}></div>
    
    </>
  )
}
