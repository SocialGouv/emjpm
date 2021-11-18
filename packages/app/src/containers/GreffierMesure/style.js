import mesure from "~public/images/mesure.svg";

const GreffierMesureStyle = {
  bg: "white",
  borderRadius: "6px",
  flexWrap: "wrap",
  overFlow: "hidden",
  position: "relative",
  width: "100%",
};

const GreffierMesureSideStyle = {
  background: `url(${mesure})`,
  backgroundSize: "cover",
  flexBasis: 380,
  flexGrow: 1,
  minHeight: "320px",
};

const GreffierMesureMainStyle = {
  flexBasis: 0,
  flexGrow: 99999,
  minWidth: 320,
  pt: 5,
  px: 4,
};

const GreffierMesureTitleStyle = {
  color: "textSecondary",
  fontFamily: "heading",
  fontSize: 0,
  mb: "4px",
};

const GreffierMesureContentStyle = {
  color: "text",
  fontFamily: "body",
  fontSize: 1,
  fontWeight: "600",
  mb: 4,
};

const GreffierMesureLinksStyle = {
  position: "absolute",
  right: 2,
  top: 2,
};

export {
  GreffierMesureStyle,
  GreffierMesureMainStyle,
  GreffierMesureSideStyle,
  GreffierMesureTitleStyle,
  GreffierMesureContentStyle,
  GreffierMesureLinksStyle,
};
