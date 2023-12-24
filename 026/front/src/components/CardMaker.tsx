"use client";
import { Input } from "antd";
import StyleSelectModal from "./modals/StyleSelectModal";

export default function CardMaker() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl">신년 카드 메이커</h1>

      <StyleSelectModal />
      <Input
        placeholder="이름을 입력하세요"
        style={{ width: "200px", marginTop: "10px" }}
      />
    </div>
  );
}
