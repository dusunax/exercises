import React, { Dispatch, SetStateAction, useState } from "react";
import { Card, Input, Button } from "antd";
import { useTranslation } from "react-i18next";

import { getRandomMessage } from "@/constant/cardMessages";
import { Message } from "@/interface/card";

interface CardMessageInputProps {
  handleInputConfirm: (message: Message) => void;
  message: Message;
  setMessage: Dispatch<SetStateAction<Message>>;
}

export default function CardMessageInput({
  handleInputConfirm,
  message,
  setMessage,
}: CardMessageInputProps) {
  const { t } = useTranslation();
  const [onRandom, setOnRandom] = useState(false);

  // 메시지 변경 핸들러
  const handleMessageChange = (newMessage: Message) => {
    setOnRandom(false);

    setMessage(newMessage);
  };

  // 랜덤 메시지 설정
  const setRandomMessage = () => {
    setOnRandom(true);

    const randomMessage = getRandomMessage();
    setMessage({ ...message, text: randomMessage.ko }); // 한글 메시지!
  };

  return (
    <Card title={t("cardMessageInput.cardMessage")}>
      <form action="" className="flex flex-col gap-2">
        <Input
          placeholder="메시지 받을 사람"
          onChange={(e) =>
            handleMessageChange({ ...message, to: e.target.value })
          }
        />
        <Input.TextArea
          value={message.text}
          onChange={(e) =>
            handleMessageChange({ ...message, text: e.target.value })
          }
          placeholder={t("cardMessageInput.placeholder")}
          className={`${onRandom ? "bg-primary-100" : ""}`}
          rows={4}
        />
        <Button type="primary" onClick={() => handleInputConfirm(message)}>
          {t("cardMessageInput.generateImage")}
        </Button>
        <Button
          type="default"
          onClick={setRandomMessage} // 랜덤 메시지 설정 함수 호출
        >
          {t("cardMessageInput.randomMessage")}
        </Button>
      </form>
    </Card>
  );
}
