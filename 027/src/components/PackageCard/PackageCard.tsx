"use client";
import { PackageMetadata } from "../../interface/PackageMetatdata";

interface PackageCardProps {
  packageData: PackageMetadata | null;
  url: string;
}

export default function PackageCard({
  packageData: packageMetadata,
  url,
}: PackageCardProps) {
  if (!packageMetadata) return null;
  const { author, name, description, keywords } = packageMetadata;
  console.log(packageMetadata);

  return (
    <section className="w-full flex">
      <a href={url} target="_blank">
        <h2 className="w-[200px] py-2 text-2xl break-keep px-4 hover:text-gray-600">
          {name}
        </h2>
      </a>

      <div className="border-l px-4 py-2">
        <a href={url} target="_blank">
          <p>
            <span className="underline">{description}</span>
            <span className="mx-2 px-1 border text-xs rounded-lg bg-black text-white ">
              {packageMetadata["dist-tags"]?.latest}
            </span>
          </p>
          <ul className="flex gap-2 py-1 justify-end text-right">
            {keywords.map((keyword) => (
              <li className="text-xs text-gray-500">{keyword.toLowerCase()}</li>
            ))}
          </ul>
        </a>
        <hr className="my-1" />
        <p className="text-xs flex gap-2">
          <span className="font-bold">{author?.name}</span>
          <span>{author?.email}</span>
        </p>
        {author?.url && (
          <a
            href={author.url}
            className="text-xs text-blue-400 underline hover:text-blue-500"
          >
            {author.url}
          </a>
        )}
      </div>
    </section>
  );
}
