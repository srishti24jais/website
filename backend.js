from flask import Flask, request, jsonify
import base64

app = Flask(_name_)

@app.route('/bfhl', methods=['POST'])
def handle_post():
    data = request.json.get('data', [])
    file_b64 = request.json.get('file_b64', '')

    numbers = [x for x in data if x.isdigit()]
    alphabets = [x for x in data if x.isalpha()]
    highest_lowercase_alphabet = [max([x for x in alphabets if x.islower()], default='')]

    file_valid = False
    file_mime_type = ''
    file_size_kb = 0

    if file_b64:
        try:
            file_data = base64.b64decode(file_b64)
            file_size_kb = len(file_data) / 1024
            file_mime_type = 'application/octet-stream'  # Simplified for example
            file_valid = True
        except Exception as e:
            file_valid = False

    response = {
        "is_success": True,
        "user_id": "john_doe_17091999",
        "email": "john@xyz.com",
        "roll_number": "ABCD123",
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": highest_lowercase_alphabet,
        "file_valid": file_valid,
        "file_mime_type": file_mime_type,
        "file_size_kb": file_size_kb
    }

    return jsonify(response)

@app.route('/bfhl', methods=['GET'])
def handle_get():
    return jsonify({"operation_code": 1})

if _name_ == '_main_':
    app.run(debug=True)