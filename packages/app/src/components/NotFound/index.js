import ErrorBox from "~/components/ErrorBox";

export default function NotFound() {
  return (
    <ErrorBox message="Page Non Trouvée">
      <a href="/">
        <img
          src="/images/404.png"
          style={{
            maxWidth: "calc(100wh - 40px)",
            maxHeight: "calc(100vh - 40px)",
          }}
          alt=""
          aria-hidden="true"
        />
      </a>
      <br />
      <a
        href="https://freepik.com"
        target="_blank"
        style={{ float: "right", marginRight: "15px" }}
      >
        <img src="/images/404-credits.png" alt="required license attribution" />
      </a>
    </ErrorBox>
  );
}
