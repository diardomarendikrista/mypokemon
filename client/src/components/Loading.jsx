import Loader from "react-loader-spinner";

export default function Loading () {
  return (
    <Loader
      type="Puff"
      color="#FEEC15"
      height={100}
      width={100}
      timeout={15000} //15 secs
    />
  );
}