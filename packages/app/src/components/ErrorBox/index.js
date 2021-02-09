import { ArrowLeft } from "@styled-icons/material/ArrowLeft";
import { Error } from "@styled-icons/material/Error";
import { Heading } from "~/components";

export default function ErrorBox(props) {
  const { message, children } = props;
  return (
    <div
      style={{
        marginTop: "30px",
        height: "cacl(100vh - 80px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <a href="/">
          <Heading
            size={1}
            style={{
              textAlign: "center",
              color: "#423e42",
            }}
          >
            <span style={{}}>
              <Error size={32} />
            </span>{" "}
            <span
              style={{
                padding: "10px",
                position: "relative",
                top: "3px",
              }}
            >
              {message}
            </span>
          </Heading>
        </a>
      </div>
      <div>
        <div>{children}</div>
        <div
          style={{
            marginTop: "50px",
          }}
        >
          <a
            style={{
              fontSize: "24px",
            }}
            href="/"
          >
            <ArrowLeft size={40} />
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}
