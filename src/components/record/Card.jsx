import { toCurrency } from "@/utils/helper";
import RouterLink from "@/components/RouterLink";

export default function Card({ memo, dollars }) {
  return (
    <div className="my-10 w-11/12 items-center space-x-5 rounded-lg bg-gray-100 py-10 pl-10 shadow-md">
      <span className="text-2xl">{memo}</span>

      <div className="flex justify-center space-x-2">
        <RouterLink href="/" svg="pencil" />
        <RouterLink href="/about" svg="down" />
      </div>
    </div>
  );
}
