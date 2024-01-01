import { RefObject, useState } from "react";
import { OpenAI } from "openai";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

import { OPENAI_API_KEY } from "@/config/environment";
import { Message, StyleSelect } from "@/interface/card";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

interface UseCardMaker {
  selectedStyles: Set<StyleSelect>;
  imageRef: RefObject<HTMLDivElement>;
}

export default function useCardMaker({
  selectedStyles,
  imageRef,
}: UseCardMaker) {
  const [generatedImage, setGeneratedImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateImage = async (styles: Set<StyleSelect>) => {
    if (selectedStyles.size === 0) return console.log("no selected styles");
    setLoading(true);

    try {
      const prompt = `2024 new years, text "2024", a asian dragon, confetti, ${Array.from(
        selectedStyles
      ).map((e) => e.en)}`;

      const response = await openai.images.generate({
        model: "dall-e-2",
        prompt,
        n: 1,
        quality: "standard",
      });
      const imageUrl = response.data[0].url;

      setGeneratedImage(imageUrl ?? "");
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputConfirm = (message: Message) => {
    console.log(message);
  };

  const handleDownloadImage = () => {
    if (imageRef.current && generatedImage) {
      html2canvas(imageRef.current).then((canvas) => {
        canvas.toBlob((blob) => {
          if (blob) saveAs(blob, "message-image.png");
        });
      });
    }
  };

  return {
    handleGenerateImage,
    handleInputConfirm,
    handleDownloadImage,
    generatedImage,
    loading,
    setLoading,
  };
}
