import { ArrowLeft } from "@styled-icons/material/ArrowLeft";
import { Error } from "@styled-icons/material/Error";
import { Heading1 } from "~/ui";

export default function NotFound() {
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
          <Heading1
            style={{
              textAlign: "center",
              color: "#423e42",
            }}
          >
            <Error size={32} /> Page Non Trouvée
          </Heading1>
        </a>
      </div>
      <div>
        <a href="/">
          <img
            src="/images/404.png"
            style={{
              maxWidth: "calc(100wh - 40px)",
              maxHeight: "calc(100vh - 40px)",
            }}
            alt="404"
          />
        </a>
        <br />
        <a
          href="https://freepik.com"
          target="_blank"
          style={{ float: "right", marginRight: "15px" }}
        >
          <img
            src="/images/404-credits.png"
            alt="required license attribution"
          />
        </a>
        <a
          style={{
            float: "left",
            color: "#423e42",
          }}
          href="/"
        >
          <ArrowLeft size={24} />
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}
