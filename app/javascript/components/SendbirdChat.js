import { useState } from "react";
import h from "./htm_create_element";
// import {
//   SendBirdProvider,
//   Channel,
//   ChannelList
// } from "@sendbird/uikit-react";

function SendBirdChat({
  data,
}) {
  const {
    access_token,
    app_id,
    channel_url,
    user_id
  } = data;

  const [messages, setMessages] = useState("test3--");


  return h`
    <span>${messages}</span>
  `;
}

export default SendBirdChat;