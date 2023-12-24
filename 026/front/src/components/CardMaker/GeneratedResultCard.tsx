import React from "react";
import { Card, Button } from "antd";

interface GeneratedResultCardProps {
  generatedImage: string;
  onDownloadImage: () => void;
}

export default function GeneratedResultCard({
  generatedImage,
  onDownloadImage,
}: GeneratedResultCardProps) {
  return (
    <Card title="생성된 카드 이미지">
      <div className="flex flex-col gap-2">
        <img
          src={generatedImage}
          alt="Generated Card"
          className="h-[300px] mb-4 bg-primary-50 shadow-md hover:shadow-xl cursor-pointer"
        />
        <Button type="primary" onClick={onDownloadImage}>
          저장
        </Button>
        <Button type="primary" onClick={onDownloadImage}>
          공유하기
        </Button>
      </div>
    </Card>
  );
}
