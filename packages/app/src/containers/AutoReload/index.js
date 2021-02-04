import { useRef, useState, useCallback, useEffect } from "react";

const { location } = window;
function reloadApp(e) {
  location.reload(true);
  e.preventDefault();
}

function getPageState() {
  const { protocol, host } = location;
  const url = protocol + "//" + host;
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const etag = this.getResponseHeader("etag");
      if (etag) {
        res({ etag });
      }
      const lastModified = this.getResponseHeader("Last-Modified");
      if (lastModified) {
        res({ lastModified });
      }
    };
    xhr.onerror = (e) => {
      rej(e);
    };
    xhr.open("HEAD", url + "?t=" + new Date().getTime(), true);
    xhr.setRequestHeader("pragma", "no-cache");
    xhr.send();
  });
}

export default function AutoReload({
  checkDelay = 3600, // 1h
}) {
  const interval = useRef(null);
  const [codeHasChanged, seCodeHasChanged] = useState(false);

  useEffect(() => {
    (async function () {
      const current = await getPageState();
      interval.current = setInterval(async () => {
        const { etag, lastModified } = await getPageState();
        if (
          (current.etag && current.etag !== etag) ||
          (current.lastModified && current.lastModified < lastModified)
        ) {
          seCodeHasChanged(true);
        }
      }, checkDelay * 1000);
    })();
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [checkDelay]);

  if (!codeHasChanged) return null;
  const style = {
    position: "absolute",
    top: 10,
    left: "35%",
    padding: "1em",
    zIndex: 1050,
    backgroundColor: "white",
    borderColor: "#007AD9",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    textAlign: "center",
  };
  return (
    <div style={style}>
      <button onClick={reloadApp}>
        Un nouvelle version de l'application est disponible, veuillez cliquez
        ici pour rechager la page.
      </button>
    </div>
  );
}
