import React from "react";
import { Card, Button } from "antd";
import { StyleSelect } from "@/interface/card";

interface CardImageGeneratorProps {
  selectedStyles: Set<StyleSelect>;
  onImageGenerate: (styles: Set<StyleSelect>) => void;
}

export default function CardImageGenerator({
  selectedStyles,
  onImageGenerate,
}: CardImageGeneratorProps) {
  return (
    <Card title="카드 이미지 생성">
      <div className="flex flex-col justify-center gap-4">
        <div className="flex flex-wrap justify-center">
          {Array.from(selectedStyles).map((style) => (
            <Button
              key={style.en}
              type="primary"
              style={{ margin: "4px", fontSize: "xx-small" }}
              size="small"
              className="pointer-events-none"
            >
              {style.ko}
            </Button>
          ))}
        </div>
        <Button type="primary" onClick={() => onImageGenerate(selectedStyles)}>
          이미지 생성
        </Button>
      </div>
    </Card>
  );
}
