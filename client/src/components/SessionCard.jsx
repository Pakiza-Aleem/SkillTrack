import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteSession } from "../features/sessions/sessionsSlice";

function SessionCard({ session }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteSession(session._id));
  };

  return (
    <article>
      <h2>{session.title}</h2>

      <p>Topic: {session.topic}</p>

      <p>Hours: {session.hours}</p>

      <p>
        {session.completed ? "Completed" : "Not completed"}
      </p>

      <Link to={`/sessions/${session._id}/edit`}>
        Edit
      </Link>

      <button onClick={handleDelete}>
        Delete
      </button>
    </article>
  );
}

export default SessionCard;