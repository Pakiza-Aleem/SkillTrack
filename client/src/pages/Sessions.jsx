import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchSessions,
  addSession
} from "../features/sessions/sessionsSlice";

import SessionCard from "../components/SessionCard";

function Sessions() {
  const dispatch = useDispatch();

  const { items, status, error } = useSelector(
    (state) => state.sessions
  );

  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("React");
  const [hours, setHours] = useState(1);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSessions());
    }
  }, [status, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addSession({
        title,
        topic,
        hours: Number(hours)
      })
    );

    setTitle("");
    setTopic("React");
    setHours(1);
  };

  const titleIsValid = title.trim().length >= 3;

  return (
    <main>
      <h1>My Learning Sessions</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Session title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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

        <button type="submit" disabled={!titleIsValid}>
          Add Session
        </button>
      </form>

      {status === "loading" && <p>Loading...</p>}

      {status === "failed" && <p>{error}</p>}

      {status === "succeeded" && (
        <section>
          {items.map((session) => (
            <SessionCard
              key={session._id}
              session={session}
            />
          ))}
        </section>
      )}
    </main>
  );
}

export default Sessions;