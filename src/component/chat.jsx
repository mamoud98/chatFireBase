// import React, { useEffect } from "react";
// import {
//   child,
//   Database,
//   get,
//   onChildAdded,
//   push,
//   ref,
//   set,
//   update,
// } from "firebase/database";

// const addUser = (userID, name) => {
//   const db = Database;
//   const reference = ref(db, "/UserChannels" + userID);
//   set(reference, {
//     name,
//   });
// };

// useEffect(() => {
//   const fetch = async () => {
//     try {
//       let newItems = false;

//       const db = Database;
//       const dbRef = ref(db, "/");

//       const userChannelsSnapshot = await get(
//         child(dbRef, `/UserChannels/${user.id}`)
//       );

//       const userChannels = userChannelsSnapshot.val();
//       if (userChannelsSnapshot.exists() && userChannels[channelName]) {
//         const channelDate = await get(
//           child(dbRef, `/Channels/${channelName}/Messages`)
//         );
//         if (channelDate.exists()) {
//           const newMessagesRef = ref(db, `/Channels/${channelName}/Messages`);

//           onChildAdded(newMessagesRef, (snapshot) => {
//             if (!newItems) return;
//             const data = snapshot.val();
//             setMessages((oldMessages) => [
//               ...oldMessages,
//               {
//                 position: data["uid"] === user.id ? "right" : "left",
//                 type: "text",
//                 text: data["text"],
//                 // date: moment(data["timestamp"]).format("hh:mm"),
//               },
//             ]);
//           });

//           ////
//           const editedMessages = Object.values(channelDate.val()).map((ele) => {
//             return {
//               position: ele["uid"] === user.id ? "right" : "left",
//               type: "text",
//               text: ele["text"],
//               // date: moment(ele["timestamp"]).format("hh:mm"),
//             };
//           });
//           setMessages(editedMessages);
//           setTimeout(() => {
//             newItems = true;
//           }, 1000);
//         }
//       } else {
//         // create new channel
//         const channelName = `${min}:${max}`;
//         const db = Database;

//         const newPath = `/UserChannels/${user.id}/${channelName}`;
//         await update(ref(db), { [newPath]: true });

//         const newPath2 = `/UserChannels/${id}/${channelName}`;
//         await update(ref(db), { [newPath2]: true });

//         const newPath3 = `/Channels/${channelName}/Messages`;
//         await update(ref(db), { [newPath3]: "" });

//         const newMessagesRef = ref(db, `/Channels/${channelName}/Messages`);
//         onChildAdded(newMessagesRef, (snapshot) => {
//           const data = snapshot.val();
//           setMessages((oldMessages) => [
//             ...oldMessages,
//             {
//               position: data["uid"] === user.id ? "right" : "left",
//               text: data["text"],
//             },
//           ]);
//         });
//       }
//     } catch (error) {
//       message.error(error.message);
//     }
//   };
//   fetch();
// }, [id, user.id]);

// function Chat() {
//   return <div>C</div>;
// }

// export default Chat;
