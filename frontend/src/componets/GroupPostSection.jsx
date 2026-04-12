import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const typeColors = {
  announcement: "bg-secondary/20 text-secondary-foreground",
  question: "bg-chart-5/10 text-chart-5",
  discussion: "bg-muted text-muted-foreground",
};

export default function GroupPostSection({ groupId, user }) {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [postType, setPostType] = useState("discussion");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadPosts();
  }, [groupId]);

  async function loadPosts() {
    const data = await base44.entities.GroupPost.filter({ group_id: groupId }, "-created_date", 50);
    setPosts(data);
  }

  async function handleSend() {
    if (!content.trim()) return;
    setSending(true);
    await base44.entities.GroupPost.create({
      group_id: groupId,
      author_email: user.email,
      author_name: user.full_name,
      content: content.trim(),
      type: postType,
    });
    setContent("");
    await loadPosts();
    setSending(false);
  }

  return (
    <div className="space-y-4">
      {/* Compose */}
      <div className="bg-card rounded-xl border border-border p-4 space-y-3">
        <Textarea
          rows={2}
          placeholder="Share an announcement, ask a question, or start a discussion..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="rounded-lg resize-none"
        />
        <div className="flex items-center justify-between">
          <Select value={postType} onValueChange={setPostType}>
            <SelectTrigger className="w-[140px] h-8 text-xs rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="discussion">Discussion</SelectItem>
              <SelectItem value="announcement">Announcement</SelectItem>
              <SelectItem value="question">Question</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" onClick={handleSend} disabled={sending || !content.trim()} className="rounded-lg gap-2">
            <Send className="h-3.5 w-3.5" />
            Post
          </Button>
        </div>
      </div>

      {/* Posts */}
      {posts.length > 0 ? (
        <div className="space-y-3">
          {posts.map((post) => {
            let timeStr = "";
            try {
              timeStr = format(new Date(post.created_date), "MMM d, h:mm a");
            } catch {}

            return (
              <div key={post.id} className="bg-card rounded-xl border border-border p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
                      {post.author_name?.charAt(0)}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground">{post.author_name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{timeStr}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className={`text-[10px] ${typeColors[post.type] || ""}`}>
                    {post.type}
                  </Badge>
                </div>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{post.content}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No posts yet. Start the conversation!</p>
        </div>
      )}
    </div>
  );
}