import React, { useState } from "react";
import { Card, Input, Button } from "antd";
import { useTranslation } from "react-i18next";
import { getRandomMessage } from "@/constant/cardMessages"; // 랜덤 메시지를 가져옴

interface CardMessageInputProps {
  onMessageChange: (message: string) => void;
  onGenerateImage: () => void;
  generatedImageSrc: string;
}

export default function CardMessageInput({
  onMessageChange,
  onGenerateImage,
  generatedImageSrc,
}: CardMessageInputProps) {
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [onRandom, setOnRandom] = useState(false);

  // 메시지 변경 핸들러
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOnRandom(false);

    setMessage(e.target.value);
    onMessageChange(e.target.value);
  };

  // 랜덤 메시지 설정
  const setRandomMessage = () => {
    setOnRandom(true);

    const randomMessage = getRandomMessage();
    setMessage(randomMessage.ko); // 한글 메시지를 사용
    onMessageChange(randomMessage.ko);
  };

  return (
    <Card title={t("cardMessageInput.cardMessage")}>
      <form action="" className="flex flex-col gap-2">
        <Input placeholder="메시지 받을 사람" />
        <Input.TextArea
          value={message}
          onChange={(e) => handleMessageChange(e)}
          placeholder={t("cardMessageInput.placeholder")}
          className={`${onRandom ? "bg-primary-100" : ""}`}
          rows={4}
        />
        <Button type="primary" onClick={onGenerateImage}>
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
