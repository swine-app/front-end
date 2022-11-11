import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home () {
  // Navigate away from here to precommit
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/precommit")
  }, [navigate])

  return <div />
}
