"use client";
import { useState } from "react";

import StyleSelectModal from "../modals/StyleSelectModal";
import StyleSelectCard from "./StyleSelectCard";
import MessageInputCard from "./MessageInputCard";
import ImageGenerateCard from "./ImageGenerateCard";
import GeneratedResultCard from "./GeneratedResultCard";

export type StyleSelect = { en: string; ko: string };

export default function CardMaker() {
  const [selectedStyles, setSelectedStyles] = useState<Set<StyleSelect>>(
    new Set()
  );
  const [generatedImage, setGeneratedImage] = useState(""); // 생성된 이미지 URL

  const handleGenerateImage = (styles: Set<StyleSelect>) => {
    // OpenAI API
    // styles를 사용하여 이미지를 생성하고 이미지 URL을 설정

    const imageUrl = "https://example.com/generated-image.png";
    setGeneratedImage(imageUrl);
  };

  const handleDownloadImage = () => {
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = "generated-card.png";
    link.click();
  };

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
        onMessageChange={(e) => console.log(e)}
        generatedImageSrc={generatedImage}
        onGenerateImage={() => console.log("d")}
      />
      <GeneratedResultCard
        generatedImage={generatedImage}
        onDownloadImage={handleDownloadImage}
      />
    </div>
  );
}
