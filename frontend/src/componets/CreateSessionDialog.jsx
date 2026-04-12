import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function CreateSessionDialog({ groupId, groupName, userEmail, onClose, onCreated }) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    await base44.entities.StudySession.create({
      ...form,
      group_id: groupId,
      group_name: groupName,
      organizer_email: userEmail,
      status: "upcoming",
    });
    onCreated();
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Schedule Study Session</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Session Title *</Label>
            <Input
              required
              placeholder="e.g. Exam Review - Chapter 5"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              rows={2}
              placeholder="What will be covered?"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="rounded-lg resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Date *</Label>
              <Input
                required
                type="date"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label>Time *</Label>
              <Input
                required
                type="time"
                value={form.time}
                onChange={(e) => handleChange("time", e.target.value)}
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Location / Meeting Link *</Label>
            <Input
              required
              placeholder="e.g. Library Room 3 or Zoom link"
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="rounded-lg"
            />
          </div>
          <div className="flex justify-end gap-3 pt-1">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-lg">Cancel</Button>
            <Button type="submit" disabled={saving || !form.title || !form.date || !form.time || !form.location} className="rounded-lg gap-2">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Schedule
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}