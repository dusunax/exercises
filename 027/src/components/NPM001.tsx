"use client";
import { useEffect, useState } from "react";
import PackageCard from "./PackageCard/PackageCard";
import { PackageMetadata } from "../interface/PackageMetatdata";
import helloEmoji from "hello-emoji";

import axios from "axios";
import Link from "next/link";

export default function NPM001() {
  const [packageData, setPackageData] = useState<PackageMetadata | null>(null);
  const URL = "https://registry.npmjs.com/hello-emoji";

  const heart = helloEmoji.heart();
  const check = helloEmoji.check();
  const fire = helloEmoji.fire();

  useEffect(() => {
    const fetchPackageMetadata = async () => {
      try {
        const response = await axios.get(URL);
        const data = response.data;

        setPackageData(data);
      } catch (error) {
        console.error("패키지 metadata를 가져오는 도중 오류 발생:", error);
      }
    };

    fetchPackageMetadata();
  }, []);

  return (
    <li className="border p-4 shadow-md rounded-lg hover:shadow-xl transition">
      <PackageCard packageData={packageData} url={URL} />

      <div className="border-t py-2">
        <h2 className="text-gray-500 text-xs mb-1">package detail:</h2>
        <div className="text-sm">
          heart: {heart}, check: {check}, fire: {fire}
        </div>
      </div>
    </li>
  );
}
