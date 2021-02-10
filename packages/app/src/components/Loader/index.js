import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ReactLoader from "react-loader-spinner";
export default function Loader(props) {
  return (
    <ReactLoader
      type="Rings"
      color="#007AD9"
      height={64}
      width={64}
      {...props}
    />
  );
}
