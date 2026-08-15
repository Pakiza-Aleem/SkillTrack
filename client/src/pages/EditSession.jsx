import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { updateSession } from "../features/sessions/sessionsSlice";

function EditSession() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const session = useSelector((state) =>
    state.sessions.items.find((item) => item._id === id)
  );

  const [title, setTitle] = useState(session?.title || "");
  const [topic, setTopic] = useState(session?.topic || "React");
  const [hours, setHours] = useState(session?.hours || 1);
  const [completed, setCompleted] = useState(
    session?.completed || false
  );

  if (!session) {
    return <p>Session not found.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateSession({
        id,
        session: {
          title,
          topic,
          hours: Number(hours),
          completed
        }
      })
    );

    navigate("/sessions");
  };

  return (
    <main>
      <h1>Edit Session</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        >
          <option value="React">React</option>
          <option value="Node">Node</option>
          <option value="Database">Database</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="number"
          min="1"
          max="24"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />

        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Completed
        </label>

        <button type="submit" disabled={title.trim().length < 3}>
          Save Changes
        </button>
      </form>
    </main>
  );
}

export default EditSession;