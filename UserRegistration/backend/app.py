from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from PIL import Image
import os

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg'}

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

@app.route('/signup', methods=['POST'])
def signup():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"})
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"})
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # Assuming the ID card contains name and ID number
        # Implement logic to extract name and ID number from the image
        # For simplicity, we're using dummy data here
        name = "John Doe"
        id_number = "123456789"
        
        return jsonify({"name": name, "id_number": id_number})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    id_number = data.get("id_number")
    # Implement actual login logic here
    # For simplicity, assuming any ID number is valid
    if id_number:
        return jsonify({"message": "Login successful"})
    else:
        return jsonify({"error": "Invalid ID number"}), 401

if __name__ == '__main__':
    app.run(debug=True)
