import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import HasNotPaid from "../components/HasNotPaid";
import HasPaid from "../components/HasPaid";

import styles from "../styles/Home.module.css";

export default function Home({ message }) {
  const { address, isConnected, isDisconnected } = useAccount();
  const [hasPaidUSDC, setHasPaidUSDC] = useState(false);
  const data = {
    userAddress: address,
  };
  useEffect(() => {
    console.log("i fire once");
    checkIfUserHasPaid();
  }, []);

  return (
    <div>
      <main className={styles.main}>
        {hasPaidUSDC ? <HasPaid /> : <HasNotPaid />}
      </main>
    </div>
  );
}

export async function getServerSideProps({ message }) {
  try {
    const response = await fetch("/api/authUser", {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log(response);
  } catch (e) {
    console.log(e);
    console.log("You have to pay x $USDC to see the content!");
  }
  return {
    props: {
      data: result,
    },
  };
}
