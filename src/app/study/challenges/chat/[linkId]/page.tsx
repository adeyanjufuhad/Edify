import { redirect } from "next/navigation";

// Chats moved to their own section (/study/chats). Old links keep working.
export default async function OldChatPage({ params }: { params: Promise<{ linkId: string }> }) {
  const { linkId } = await params;
  redirect(`/study/chats/${encodeURIComponent(linkId)}`);
}
