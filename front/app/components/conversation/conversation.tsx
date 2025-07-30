import React from "react";
import { ScrollView } from "react-native";
import { useRouteParams } from "../../hooks/useNav";
import Message from "./message";
// TODO: FInish conversations
const messages = [
  {
    id: 1,
    sender: { id: 1, name: "Jonas" },
    message: "Hello Robertas!",
    timestamp: "2025-07-30T14:00:00Z",
  },
  {
    id: 2,
    sender: { id: 2, name: "Robertas" },
    message: "Hello Jonas!",
    timestamp: "2025-07-30T14:00:00Z",
  },
];
const Conversation = () => {
  const route = useRouteParams("Conversation");

  console.log(route.params.conversationId);
  const currentUserId = 2;

  return (
    <ScrollView>
      {messages.map((message) => (
        <Message key={message.id} />
      ))}
    </ScrollView>
  );
};

export default Conversation;
