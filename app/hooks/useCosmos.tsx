"use client";

import { useToast } from "@/components/ui/use-toast";
import { SigningStargateClient, StargateClient } from "@cosmjs/stargate";
import { useEffect, useState } from "react";
import { getTestnetChainInfo } from "./testChainInfo";
import { AccountData, OfflineSigner } from "@cosmjs/proto-signing"

const RPC_URL = "https://rpc.sentry-01.theta-testnet.polypore.xyz";
const denom = 'uatom';

const useCosmos = (rpcUrl: string = RPC_URL) => {
  const [chainId, setChainId] = useState("");
  const [walletBalance, setWalletBalance] = useState<string>();
  const [walletAddress, setWalletAddress] = useState<string>('');

  const { toast } = useToast();
  useEffect(() => {
    const getChainId = async (client: StargateClient) => {
      const c = await client.getChainId();
      setChainId(c);
    };
    const init = async () => {
      getChainId(await StargateClient.connect(rpcUrl));
    };

    const timeout = setTimeout(() => init(), 500);

    return () => clearTimeout(timeout);
  }, [rpcUrl]);

  const connectKepler = async () => {
    const { keplr } = window as any;
    if (!keplr) {
      toast({
        title: "Keplr not found",
        description: "Please install Kepler!",
      });
      return;
    }

    try {
      await keplr.experimentalSuggestChain(getTestnetChainInfo());
      console.log("Wallet connected!");
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("Unexpected error", err);
      }
    }

     // Create the signing client
     const offlineSigner: OfflineSigner =
     (window as any).getOfflineSigner!(chainId)
     const signingClient = await SigningStargateClient.connectWithSigner(
         rpcUrl,
         offlineSigner,
     )

     // Get the address and balance of your user
     const account: AccountData = (await offlineSigner.getAccounts())[0];
     setWalletAddress(account.address);
     const balance = (await signingClient.getBalance(account.address, "uatom")).amount;
     setWalletBalance(balance)
  };

  return { chainId, walletAddress, walletBalance, connectKepler };
};

export default useCosmos;
