import Talk from "talkjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useStore from "@/store";

export default function Home() {
  const [talkLoaded, markTalkLoaded] = useState(false);
  const [roomDetail, setRoomDetail] = useState(null);
  const router = useRouter();
  // const fetchData = async () => {
  //   try {
  //     const data = await fetch("/api/getdata");
  //     // return data
  //     const jsonData = await data.json();
  //     return jsonData;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchTripDetail = useStore((state) => state.fetchTripDetail);

  useEffect(() => {
    // let id =  router.query.id
    Talk.ready.then(() => markTalkLoaded(true));
    if (talkLoaded) {
      Talk.ready.then(async () => {
        // console.log(id,"DDD");
        // console.log(router.query,">>>>");
        const data = await fetchTripDetail(router.query.id);
        // console.log(data,"<<<<");
        setRoomDetail(data?.[0]?.participants);
     

        // // contoh aja
        // // ganti dengan id login di local storage
        const idLogin = localStorage.getItem("id");
        console.log(idLogin);

        const loggedInUser = data?.[0]?.participants.find((user) => user._id === idLogin);
        // console.log(loggedInUser);

        const me = new Talk.User({
          id: idLogin,
          name: loggedInUser?.name,
          welcomeMessage: "Ayok main!",
          role: "Room master",
        });

        const otherUsers = data?.[0]?.participants
          .filter((user) => user._id !== idLogin)
          .map((user) => {
            return new Talk.User({
              id: user._id,
              name: user.name,
              welcomeMessage: "selamat pagi dunia!",
              role: "default",
            });
          });

        console.log(otherUsers);  
        
        const session = new Talk.Session({
          appId: "t9284pmO",
          me: me,
        });
        // console.log(member[0]);
        const conversationId = router.query.id
        const conversation = session.getOrCreateConversation(conversationId);

        conversation.setParticipant(me);
        otherUsers.forEach((element) => {
          conversation.setParticipant(element);
        });

        conversation.setAttributes({
          photoUrl: "https://i.ytimg.com/vi/kwV3czvhzCI/maxresdefault.jpg",
          subject: `${data[0].tripName}`,
        });

        const chatbox = session.createChatbox();
        chatbox.select(conversation);
        chatbox.mount(document.getElementById("talkjs-container"));

        return () => session.destroy();
      });
    }
  }, [talkLoaded]);

  return (
    <div className="bg-red-300">
      {/* <pre>{JSON.stringify(roomDetail, null, 2)}</pre> */}
      <button
        onClick={() => router.push(`/listrooms/${router.query.id}`)}
        aria-label=""
        className="inline-flex items-center justify-center w-36 h-10 px-6 mt-5 mx-5 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-red-accent-400 hover:bg-red-accent-700 focus:shadow-outline focus:outline-none"
      >
        Go Back
      </button>
      <div id="talkjs-container" className=" h-screen p-5"></div>
    </div>
  );
}
