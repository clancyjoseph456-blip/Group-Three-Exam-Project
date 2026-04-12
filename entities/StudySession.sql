{
  "name": "StudySession",
  "type": "object",
  "properties": {
    "group_id": {
      "type": "string",
      "title": "Group ID"
    },
    "group_name": {
      "type": "string",
      "title": "Group Name"
    },
    "title": {
      "type": "string",
      "title": "Session Title"
    },
    "description": {
      "type": "string",
      "title": "Description"
    },
    "date": {
      "type": "string",
      "title": "Date"
    },
    "time": {
      "type": "string",
      "title": "Time"
    },
    "location": {
      "type": "string",
      "title": "Location or Meeting Link"
    },
    "organizer_email": {
      "type": "string",
      "title": "Organizer Email"
    },
    "status": {
      "type": "string",
      "title": "Status",
      "enum": [
        "upcoming",
        "completed",
        "cancelled"
      ],
      "default": "upcoming"
    }
  },
  "required": [
    "group_id",
    "group_name",
    "title",
    "date",
    "time",
    "location"
  ]
}