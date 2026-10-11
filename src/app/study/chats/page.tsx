import Mascot from "@/components/mascot";

// Nothing open yet (on a phone this pane is hidden and the list fills the screen).
export default function ChatsHome() {
  return (
    <div className="chat-welcome">
      <Mascot pose="wave" className="chat-welcome-mascot" />
      <h2>Your chats</h2>
      <p>Pick a classmate on the left to start chatting. Keep it friendly and about school; your parents can read your chats.</p>
    </div>
  );
}
