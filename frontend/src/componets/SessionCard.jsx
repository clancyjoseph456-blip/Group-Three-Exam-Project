import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function SessionCard({ session, showGroupName = false }) {
  const statusColors = {
    upcoming: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    completed: "bg-muted text-muted-foreground border-muted",
    cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  };

  let formattedDate = session.date;
  try {
    formattedDate = format(new Date(session.date), "EEE, MMM d, yyyy");
  } catch {}

  return (
    <div className="bg-card rounded-xl border border-border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-heading font-semibold text-sm text-foreground truncate">{session.title}</h4>
          {showGroupName && (
            <p className="text-xs text-muted-foreground mt-0.5">{session.group_name}</p>
          )}
        </div>
        <Badge variant="outline" className={`text-[10px] ${statusColors[session.status] || ""}`}>
          {session.status}
        </Badge>
      </div>

      {session.description && (
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{session.description}</p>
      )}

      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-primary" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-secondary" />
          <span>{session.time}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          <span className="truncate max-w-[150px]">{session.location}</span>
        </div>
      </div>
    </div>
  );
}