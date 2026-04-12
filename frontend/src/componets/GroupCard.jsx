import { Link } from "react-router-dom";
import { Users, MapPin, BookOpen, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function GroupCard({ group }) {
  const meetingTypeColors = {
    physical: "bg-chart-4/10 text-chart-4",
    online: "bg-chart-5/10 text-chart-5",
    hybrid: "bg-secondary/20 text-secondary-foreground",
  };

  return (
    <Link
      to={`/groups/${group.id}`}
      className="group block bg-card rounded-xl border border-border p-5 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {group.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{group.course_name}</span>
            {group.course_code && (
              <span className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">{group.course_code}</span>
            )}
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
        {group.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            <span>{group.member_count || 1} member{(group.member_count || 1) !== 1 && "s"}</span>
          </div>
          {group.meeting_location && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span className="truncate max-w-[120px]">{group.meeting_location}</span>
            </div>
          )}
        </div>
        {group.meeting_type && (
          <Badge variant="secondary" className={`text-xs ${meetingTypeColors[group.meeting_type] || ""}`}>
            {group.meeting_type}
          </Badge>
        )}
      </div>
    </Link>
  );
}