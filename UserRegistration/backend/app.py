from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
from PIL import Image
import io
import re

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        image = Image.open(io.BytesIO(file.read()))
        text = pytesseract.image_to_string(image)
        extracted_data = parse_text(text)
        return jsonify(extracted_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def parse_text(text):
    lines = text.split('\n')
    name = ''
    id_number = ''

    # Regular expressions to match typical ID card patterns
    id_number_pattern = re.compile(r'\b\d{12}\b')
    name_pattern = re.compile(r'Name\s*:\s*([A-Z\s]+)')

    for line in lines:
        id_match = id_number_pattern.search(line)
        if id_match:
            id_number = id_match.group()

        name_match = name_pattern.search(line)
        if name_match:
            name = name_match.group(1).strip()

    return {'name': name, 'idNumber': id_number}

if __name__ == '__main__':
    app.run(debug=True)
