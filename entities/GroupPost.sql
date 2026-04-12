{
  "name": "GroupPost",
  "type": "object",
  "properties": {
    "group_id": {
      "type": "string",
      "title": "Group ID"
    },
    "author_email": {
      "type": "string",
      "title": "Author Email"
    },
    "author_name": {
      "type": "string",
      "title": "Author Name"
    },
    "content": {
      "type": "string",
      "title": "Content"
    },
    "type": {
      "type": "string",
      "title": "Post Type",
      "enum": [
        "announcement",
        "question",
        "discussion"
      ],
      "default": "discussion"
    }
  },
  "required": [
    "group_id",
    "author_email",
    "author_name",
    "content"
  ]
}