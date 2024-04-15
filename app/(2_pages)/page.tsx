import { Catalogs, Address, Intro, Logos } from "@/app/3_widgets/home-page";

export default function Home() {
  return (
    <main className="">
      <Intro />
      <Logos />
      <Catalogs />
      <div className="mt-9 lg:mt-20">
        <Address />
      </div>
    </main>
  );
}
