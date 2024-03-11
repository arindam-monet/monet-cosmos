"use client";

import { Toaster } from "@/components/ui/toaster";
import useCosmos from "./hooks/useCosmos";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { chainId, walletAddress, walletBalance } = useCosmos();
  console.log({ chainId, walletAddress, walletBalance }, "cosmos");
  return (
    <main>
      <Toaster />
      <Navbar />

      <section className="p-4">
        <div>
          Wallet Address: <p>{walletAddress}</p>
        </div>
        <div>
          Wallet Balance: <p>{walletBalance}</p>
        </div>
        <div>
          Chain Id: <p className="font-semibold">{chainId}</p>
        </div>

        {/* <Button>Disconnect Wallet</Button> */}
      </section>
    </main>
  );
}
