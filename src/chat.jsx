import { Button, Col, Form, Input, message, Row, Typography } from "antd";
import UserContext from "context/userContext";
import {
  child,
  Database,
  get,
  onChildAdded,
  push,
  ref,
  update,
} from "firebase/database";

import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

export default function Chat() {
  const [form] = Form.useForm();
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef();
  const { user } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const min = Math.min(id, user.id);
    const max = Math.max(id, user.id);
    const channelName = `${min}:${max}`;

    const fetch = async () => {
      try {
        let newItems = false;

        const db = Database;
        const dbRef = ref(db, "/");

        const userChannelsSnapshot = await get(
          child(dbRef, `/UserChannels/user1`)
        );

        const userChannels = userChannelsSnapshot.val();
        if (userChannelsSnapshot.exists() && userChannels[channelName]) {
          const channelDate = await get(
            child(dbRef, `/Channels/${channelName}/Messages`)
          );
          if (channelDate.exists()) {
            const newMessagesRef = ref(db, `/Channels/${channelName}/Messages`);

            onChildAdded(newMessagesRef, (snapshot) => {
              if (!newItems) return;
              const data = snapshot.val();
              setMessages((oldMessages) => [
                ...oldMessages,
                {
                  position: data["uid"] === user.id ? "right" : "left",
                  type: "text",
                  text: data["text"],
                  // date: moment(data["timestamp"]).format("hh:mm"),
                },
              ]);
            });

            ////
            const editedMessages = Object.values(channelDate.val()).map(
              (ele) => {
                return {
                  position: ele["uid"] === user.id ? "right" : "left",
                  type: "text",
                  text: ele["text"],
                  // date: moment(ele["timestamp"]).format("hh:mm"),
                };
              }
            );
            setMessages(editedMessages);
            setTimeout(() => {
              newItems = true;
            }, 1000);
          }
        } else {
          // create new channel
          const channelName = `${min}:${max}`;
          const db = Database;

          const newPath = `/UserChannels/${user.id}/${channelName}`;
          await update(ref(db), { [newPath]: true });

          const newPath2 = `/UserChannels/${id}/${channelName}`;
          await update(ref(db), { [newPath2]: true });

          const newPath3 = `/Channels/${channelName}/Messages`;
          await update(ref(db), { [newPath3]: "" });

          const newMessagesRef = ref(db, `/Channels/${channelName}/Messages`);
          onChildAdded(newMessagesRef, (snapshot) => {
            const data = snapshot.val();
            setMessages((oldMessages) => [
              ...oldMessages,
              {
                position: data["uid"] === user.id ? "right" : "left",
                text: data["text"],
              },
            ]);
          });
        }
      } catch (error) {
        message.error(error.message);
      }
    };
    fetch();
  }, [id, user.id]);

  const onFinish = async ({ newMessage }) => {
    try {
      if (newMessage) {
        const min = Math.min(id, user.id);
        const max = Math.max(id, user.id);
        const channelName = `${min}:${max}`;
        const db = Database;

        const newMessageKey = push(
          child(ref(db), `/Channels/${channelName}/Messages`)
        ).key;

        const messageData = {
          uid: user.id,
          text: newMessage,
          timestamp: new Date(),
        };
        const newPath = `/Channels/${channelName}/Messages/${newMessageKey}`;
        await update(ref(db), { [newPath]: messageData });

        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        form.resetFields();
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <main className="chat-main">
      <div style={{ overflowY: "scroll" }}>
        {messages.map((message, index) => (
          <Row
            key={index}
            justify={message.position === "right" ? "end" : "start"}
            style={{ margin: "1rem" }}
          >
            <Typography.Text
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                padding: "8px",
                fontWeight: "600",
              }}
            >
              {message.text}
            </Typography.Text>
            <div ref={messagesEndRef} />
          </Row>
        ))}
      </div>
      <Form form={form} onFinish={onFinish}>
        <Row align="middle" wrap={false}>
          <Col flex={1}>
            <Form.Item name="newMessage">
              <Input
                placeholder="Type your message 👨‍💻👩‍💻"
                onPressEnter={() =>
                  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
                }
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="ml-1">
                Send
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </main>
  );
}
