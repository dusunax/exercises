import NPM001 from "../components/NPM001";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col ">
      <div className="px-12 py-10 flex flex-col items-center justify-between gap-4">
        <h1 className="text-2xl">Packages</h1>

        <ul>
          <NPM001 />
        </ul>
      </div>
    </main>
  );
}
