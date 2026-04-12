{
  "name": "GroupMembership",
  "type": "object",
  "properties": {
    "group_id": {
      "type": "string",
      "title": "Group ID"
    },
    "user_email": {
      "type": "string",
      "title": "User Email"
    },
    "user_name": {
      "type": "string",
      "title": "User Name"
    },
    "role": {
      "type": "string",
      "title": "Role",
      "enum": [
        "leader",
        "member"
      ],
      "default": "member"
    },
    "status": {
      "type": "string",
      "title": "Status",
      "enum": [
        "active",
        "pending",
        "removed"
      ],
      "default": "active"
    }
  },
  "required": [
    "group_id",
    "user_email",
    "user_name",
    "role"
  ]
}