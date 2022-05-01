import Router from "@/components/Router";

export default function Card({ memo, dollars }) {
  // TODO 金額千分位

  return (
    <div className=" my-10 w-11/12 items-center space-x-5 rounded-lg bg-gray-100 py-10 pl-10 shadow-md">
      <span className="text-2xl">{memo}</span>
      <span className="text-lg">${dollars}</span>

      <div className="flex justify-center space-x-2">
        <Router href="/" svg="pencil" />
        <Router href="/about" svg="down" />
      </div>
    </div>
  );
}
