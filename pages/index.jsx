import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import styles from "../styles/Home.module.css";

export default function Home() {
  const { address, isConnected, isDisconnected } = useAccount();
  const [hasPaidUSDC, setHasPaidUSDC] = useState(false);
  const [secretMessage, setSecretMessage] = useState(
    "You have to pay $10 USDC to see the secret!"
  );
  const data = {
    userAddress: address,
  };
  useEffect(() => {
    console.log("i fire once");
    checkIfUserHasPaid();
  }, []);

  async function checkIfUserHasPaid() {
    const response = await fetch("/api/authUser", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const messageResponse = await response.json();
    setSecretMessage(messageResponse.message);
    setHasPaidUSDC(true);
  }
  return (
    <div>
      <main className={styles.main}>
        <Heading color="white">{secretMessage}</Heading>
      </main>
    </div>
  );
}
