"use client";
import { useRef, useState } from "react";

import StyleSelectModal from "../modals/StyleSelectModal";
import StyleSelectCard from "./StyleSelectCard";
import MessageInputCard from "./MessageInputCard";
import ImageGenerateCard from "./ImageGenerateCard";
import GeneratedResultCard from "./GeneratedResultCard";

import { StyleSelect } from "@/interface/card";
import useCardMaker from "./hooks/useCardMaker";

export default function CardMaker() {
  const [selectedStyles, setSelectedStyles] = useState<Set<StyleSelect>>(
    new Set()
  );
  const imageRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState({
    to: "",
    from: "",
    text: "",
  });

  const {
    handleGenerateImage,
    handleInputConfirm,
    handleDownloadImage,
    generatedImage,
    loading,
    setLoading,
  } = useCardMaker({ selectedStyles, imageRef });

  return (
    <div className="w-full max-w-[360px] mx-auto flex flex-col gap-2">
      <h1 className="text-2xl mt-4">신년 카드 메이커</h1>

      <StyleSelectModal />
      <StyleSelectCard
        selectedStyles={selectedStyles}
        setSelectedStyles={setSelectedStyles}
        onSelectStyles={(selectedStyleArray) => console.log(selectedStyleArray)}
      />
      <ImageGenerateCard
        selectedStyles={selectedStyles}
        onImageGenerate={handleGenerateImage}
      />
      <MessageInputCard
        message={message}
        setMessage={setMessage}
        handleInputConfirm={handleInputConfirm}
      />
      <GeneratedResultCard
        imageRef={imageRef}
        message={message}
        generatedImage={generatedImage}
        onDownloadImage={handleDownloadImage}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}
