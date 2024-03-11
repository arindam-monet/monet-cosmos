import useCosmos from "@/app/hooks/useCosmos";
import { Button } from "./ui/button";

const Navbar = () => {
  const { connectKepler } = useCosmos();
  return (
    <nav>
      <header className=" shadow-md sticky top-0 h-[80px] bg-white">
        <div className="flex justify-between items-center h-full container px-2">
          <h3 className="font-semibold text-lg">Monet Cosmos Dashboard</h3>
          <div className="flex gap-4 items-center">
            <Button onClick={connectKepler}>Connect Wallet</Button>
          </div>
        </div>
      </header>
    </nav>
  );
};

export default Navbar;
