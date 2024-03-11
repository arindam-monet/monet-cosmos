'use client';

import { Toaster } from "@/components/ui/toaster";
import useCosmos from "./hooks/useCosmos";
import { Button } from "@/components/ui/button";


export default function Home() {
  const {chainId, connectKepler, walletAddress, walletBalance} = useCosmos();
  console.log({chainId, walletAddress, walletBalance}, 'cosmos');
  return (
    <main>
      <Toaster />
      <Button onClick={connectKepler}>Connect Wallet</Button>
      
    </main>
  );
}
