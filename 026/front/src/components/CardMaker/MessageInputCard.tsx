import React, { Dispatch, SetStateAction, useState } from "react";
import { Card, Input, Button } from "antd";
import { useTranslation } from "react-i18next";

import { getRandomMessage } from "@/constant/cardMessages";
import { Message } from "@/interface/card";

interface CardMessageInputProps {
  message: Message;
  setMessage: Dispatch<SetStateAction<Message>>;
}

export default function CardMessageInput({
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
  const handleRandomMessage = () => {
    setOnRandom(true);
    const randomMessage = getRandomMessage();
    setMessage({ ...message, text: randomMessage.ko }); // 한글 메시지!
  };

  return (
    <Card title={t("cardMessageInput.cardMessage")} className="w-full">
      <form action="" className="flex flex-col gap-2">
        <Input
          placeholder="메시지 받을 사람"
          onChange={(e) =>
            handleMessageChange({ ...message, to: e.target.value })
          }
        />
        <Input
          placeholder="메시지 보내는 사람"
          onChange={(e) =>
            handleMessageChange({ ...message, from: e.target.value })
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
        <Button
          type="default"
          onClick={handleRandomMessage} // 랜덤 메시지 설정 함수 호출
        >
          {t("cardMessageInput.randomMessage")}
        </Button>
      </form>
    </Card>
  );
}
