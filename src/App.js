import "./styles/styles.css";
import "./styles/tailwind.css";
import {
  useHMSActions,
  useHMSStore,
  selectIsConnectedToRoom
} from "@100mslive/hms-video-react";
import Preview from "./components/Preview";
import Room from "./components/Room";

const endPoint = "https://prod-in.100ms.live/hmsapi/anyvideo.app.100ms.live/";

const getToken = async (user_id) => {
  const response = await fetch(`${endPoint}api/token`, {
    method: "POST",
    body: JSON.stringify({
      user_id,
      role: "host",
      type: "app",
      room_id: "62a9c7372630221c75a47107"
    })
  });
  const { token } = await response.json();
  return token;
};

const App = () => {
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const handleSubmit = async (userName) => {
    const token = await getToken(userName);
    hmsActions.join({ authToken: token, userName });
  };

  return (
    <>{isConnected ? <Room /> : <Preview handleSubmit={handleSubmit} />}</>
  );
};

export default App;
