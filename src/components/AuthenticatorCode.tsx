"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

type Props = {
  uuid: string;
};

export default function AuthenticatorCode({ uuid }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/online/authenticator?uuid=${uuid}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.image === null) {
          setIsLoading(false);
          return;
        }
        setImage(res.image);
        setIsLoading(false);
      });
  }, [uuid]);

  return (
    <div className="modal">
      <div className="modal-content">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{
              textAlign: "center",
              display: "block",
              marginTop: "20px",
              marginBottom: "20px",
              color: "#d9d9d9",
            }}
          >
            Please validate the authentication request in your authenticator app
            with the following code
          </span>
          {isLoading ? (
            <Spinner
              customCss={{
                marginTop: "20px",
                marginBottom: "20px",
              }}
            />
          ) : (
            <Image
              style={{
                marginTop: "20px",
                filter: "invert(0.9)",
              }}
              width={60}
              height={60}
              src={`data:image/png;base64,${image}`}
              alt="authenticator"
            />
          )}
        </div>
      </div>
    </div>
  );
}
