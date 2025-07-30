import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Message from "./conversation";
import LastMessage from "./last-message";

type Props = {};

const conversations = [
  {
    id: 1,
    users: [
      {
        id: 1,
        name: "Jonas",
      },
      {
        id: 2,
        name: "Robertas",
      },
    ],
    last_message: {
      id: 2,
      sender: { id: 2, name: "Robertas" },
      message: "Hello Jonas!",
      timestamp: "2025-07-30T14:00:00Z",
    },
  },
  {
    id: 2,
    users: [
      {
        id: 1,
        name: "Jonas",
      },
      {
        id: 2,
        name: "Robertas",
      },
    ],
    last_message: {
      id: 1,
      sender: { id: 1, name: "Jonas" },
      message: "Hello Robertas!",
      timestamp: "2025-07-30T14:00:00Z",
    },
  },
];
const Conversations = (props: Props) => {
  return (
    <ScrollView>
      {conversations.map((item) => (
        <LastMessage key={item.id} />
      ))}
    </ScrollView>
  );
};

export default Conversations;

const styles = StyleSheet.create({});
