import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Card, Button } from "antd";
import { Message } from "@/interface/card";

interface GeneratedResultCardProps {
  generatedImage: string;
  onDownloadImage: () => void;
  imageRef: RefObject<HTMLDivElement>;
  message: Message;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function GeneratedResultCard({
  generatedImage,
  onDownloadImage,
  imageRef,
  message,
  loading,
  setLoading,
}: GeneratedResultCardProps) {
  const [loadedImage, setLoadedImage] = useState("");

  useEffect(() => {
    if (generatedImage) {
      // crossOrigin 이슈 해결을 위해 Next.js API 라우트를 통해 이미지를 요청합니다
      fetch(`/api/proxy?url=${encodeURIComponent(generatedImage)}`)
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setLoadedImage(url);
          setLoading(false);
        })
        .catch((error) => console.error("Error loading image:", error));
    }
  }, [generatedImage]);

  return (
    <Card title="생성된 카드 이미지">
      <div
        ref={imageRef}
        className={`h-[300px] mb-4 bg-primary-50 shadow-md hover:shadow-xl cursor-pointer rounded-md relative ${
          loading ? "animate-pulse" : ""
        }`}
      >
        <img
          src={loadedImage}
          alt="Generated Card"
          className="absolute w-full h-full object-contain left-0 top-0"
          crossOrigin="anonymous"
        />

        {message.text && <MessageTextBox message={message} />}
      </div>

      <div className="flex flex-col gap-2">
        <Button
          className="transition"
          type={loadedImage ? "primary" : "default"}
          onClick={onDownloadImage}
        >
          저장
        </Button>
        <Button
          type={loadedImage ? "primary" : "default"}
          onClick={onDownloadImage}
        >
          공유하기
        </Button>
      </div>
    </Card>
  );
}

const MessageTextBox = ({ message }: { message: Message }) => {
  return (
    <p
      className="flex flex-col w-3/4 bg-primary px-4 pr-10 py-2 absolute text-white bottom-4 left-1/2 -translate-x-1/2 font-semibold rounded-lg text-xs break-keep"
      style={{ background: "rgba(0,0,0,0.7)", color: "white" }}
    >
      {message.to && (
        <>
          to: {message.to}
          <div className="w-full border-dotted border-b-2 my-1 opacity-70" />
        </>
      )}

      {message.text}

      {message.from && (
        <>
          <div className="w-full border-dotted border-b-2 my-1 opacity-70" />
          <span className="text-right">from: {message.from}</span>
        </>
      )}
      {message.from && `from: ${message.from}`}
    </p>
  );
};
