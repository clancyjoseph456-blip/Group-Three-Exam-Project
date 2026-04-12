{
  "name": "StudyGroup",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "title": "Group Name"
    },
    "course_name": {
      "type": "string",
      "title": "Course Name"
    },
    "course_code": {
      "type": "string",
      "title": "Course Code"
    },
    "faculty": {
      "type": "string",
      "title": "Faculty",
      "enum": [
        "Engineering, Design and Technology",
        "Business and Administration",
        "Law",
        "Education and Arts",
        "Science",
        "Social Sciences",
        "Health Sciences",
        "Theology"
      ]
    },
    "description": {
      "type": "string",
      "title": "Description"
    },
    "meeting_location": {
      "type": "string",
      "title": "Meeting Location"
    },
    "meeting_type": {
      "type": "string",
      "title": "Meeting Type",
      "enum": [
        "physical",
        "online",
        "hybrid"
      ]
    },
    "leader_email": {
      "type": "string",
      "title": "Group Leader Email"
    },
    "leader_name": {
      "type": "string",
      "title": "Group Leader Name"
    },
    "member_count": {
      "type": "number",
      "title": "Member Count",
      "default": 1
    },
    "max_members": {
      "type": "number",
      "title": "Max Members",
      "default": 20
    },
    "status": {
      "type": "string",
      "title": "Status",
      "enum": [
        "active",
        "inactive",
        "archived"
      ],
      "default": "active"
    },
    "tags": {
      "type": "array",
      "title": "Tags",
      "items": {
        "type": "string"
      }
    }
  },
  "required": [
    "name",
    "course_name",
    "faculty",
    "description",
    "leader_email",
    "leader_name"
  ]
}