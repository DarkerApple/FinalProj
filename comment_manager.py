import json
import os
from datetime import datetime

COMMENTS_FILE = 'comments.json'

def load_comments():
    if not os.path.exists(COMMENTS_FILE):
        return []
    with open(COMMENTS_FILE, 'r') as file:
        return json.load(file)

def save_comments(comments):
    with open(COMMENTS_FILE, 'w') as file:
        json.dump(comments, file, indent=2)

def add_comment(text):
    comments = load_comments()
    new_comment = {
        'id': len(comments) + 1,
        'text': text,
        'date': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        'likes': 0
    }
    comments.append(new_comment)
    save_comments(comments)
    return new_comment

def delete_comment(id):
    comments = load_comments()
    comments = [c for c in comments if c['id'] != id]
    save_comments(comments)

def like_comment(id):
    comments = load_comments()
    for comment in comments:
        if comment['id'] == id:
            comment['likes'] += 1
            break
    save_comments(comments)
    return next((c for c in comments if c['id'] == id), None)

# Initialize the comments file if it doesn't exist
if not os.path.exists(COMMENTS_FILE):
    save_comments([])