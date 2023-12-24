import { useTranslation } from "react-i18next";
import React, { Dispatch, SetStateAction } from "react";
import { Card, Button, message } from "antd";

import { CARD_STYLES } from "@/constant/cardMessages";
import { StyleSelect } from "./CardMaker";

interface StyleSelectCardProps {
  onSelectStyles: (selectedStyles: StyleSelect[]) => void;
  selectedStyles: Set<StyleSelect>;
  setSelectedStyles: Dispatch<SetStateAction<Set<StyleSelect>>>;
}

export default function StyleSelectCard({
  onSelectStyles,
  selectedStyles,
  setSelectedStyles,
}: StyleSelectCardProps) {
  const { t } = useTranslation();

  const handleStyleSelect = (style: StyleSelect) => {
    const updatedStyles = new Set(selectedStyles);
    if (updatedStyles.has(style)) {
      updatedStyles.delete(style);
    } else {
      updatedStyles.add(style);
    }

    if (updatedStyles.size <= 5) {
      setSelectedStyles(updatedStyles);
    } else {
      message.error([
        "5개 이상의 스타일을 선택할 수 없습니다. 5개 이하의 스타일을 선택해주세요.",
      ]);
    }
  };

  const handleConfirm = () => {
    const selectedStyleArray = Array.from(selectedStyles).map((style) => ({
      ko: style.ko,
      en: CARD_STYLES.find((s) => s.ko === style.ko)?.en || "",
    }));
    onSelectStyles(selectedStyleArray);
  };

  return (
    <Card title={t("cardStyles.cardStyleSelection")}>
      <div className="flex flex-col gap-2">
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {CARD_STYLES.map((style) => (
            <Button
              key={style.ko}
              type={selectedStyles.has(style) ? "primary" : "default"}
              size="small"
              style={{ margin: "4px", fontSize: "x-small" }}
              onClick={() => handleStyleSelect(style)}
            >
              {style.ko}
            </Button>
          ))}
        </div>
        <Button
          type="primary"
          onClick={handleConfirm}
          disabled={selectedStyles.size !== 5}
          style={{ marginTop: "10px" }}
        >
          {t("cardStyles.confirmSelection")}
        </Button>
      </div>
    </Card>
  );
}
