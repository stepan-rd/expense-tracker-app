import { useNavigate } from "react-router-dom";

type Props = {};

export function ErrorPage({}: Props) {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404 Page not found.</h1>
      <button onClick={() => navigate("/app/dashboard")}>Go back</button>
    </div>
  );
}
