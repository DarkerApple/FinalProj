from flask import Flask, request, jsonify
from comment_manager import load_comments, add_comment, delete_comment, like_comment

app = Flask(__name__)

@app.route('/get_comments')
def get_comments():
    return jsonify(load_comments())

@app.route('/add_comment', methods=['POST'])
def add_new_comment():
    data = request.json
    new_comment = add_comment(data['text'])
    return jsonify(new_comment)

@app.route('/delete_comment/<int:id>', methods=['DELETE'])
def remove_comment(id):
    delete_comment(id)
    return '', 204

@app.route('/like_comment/<int:id>', methods=['POST'])
def increment_like(id):
    updated_comment = like_comment(id)
    return jsonify(updated_comment)

if __name__ == '__main__':
    app.run(debug=True)