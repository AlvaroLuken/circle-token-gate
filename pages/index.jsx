import { verifyMessage } from "ethers/lib/utils";
import { useRef, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";

import styles from "../styles/Home.module.css";

export default function Home() {
  const recoveredAddress = useRef();
  const [message] = useState(
    "Creating dApps with Create Web3 Dapp is easy af!"
  );
  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      const signerAddress = verifyMessage(variables.message, data);
      recoveredAddress.current = signerAddress;
      if (recoveredAddress.current == address) {
        checkIfUserHasPaid(recoveredAddress.current);
      } else {
        alert("signature verification failed!");
      }
    },
  });
  const { address, isConnected, isDisconnected } = useAccount();
  const [secretMessage, setSecretMessage] = useState(
    "You have to pay $10 USDC to see the secret! 👀"
  );

  async function checkIfUserHasPaid(verifiedAddress) {
    const data1 = {
      userAddress: verifiedAddress,
    };
    const response = await fetch("/api/authUser", {
      method: "POST",
      body: JSON.stringify(data1),
    });
    const messageResponse = await response.json();
    setSecretMessage(messageResponse.message);
  }
  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.message}>{secretMessage}</h1>
        <div>
          {!data ? (
            <button
              className={styles.button}
              onClick={() => signMessage({ message })}
            >
              <b>Verify Payment With Signature</b>
            </button>
          ) : (
            ""
          )}
          {error && <div>{error.message}</div>}
        </div>
      </main>
    </div>
  );
}
