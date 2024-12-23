import firebase_admin
from firebase_admin import credentials, storage
from flask import Flask, jsonify
#import numpy as np
#import cv2
#import module1

app = Flask(__name__)

# Initialize Firebase Admin SDK with service account credentials
cred = credentials.Certificate(r'D:\New folder (2)\4th yr\Qualisure\backend\firebasestoragekey\privatekey.json')
firebase_admin.initialize_app(cred
                             , {
    'storageBucket': 'qualisure-3edce.appspot.com'}
    )


# Route to check files from Firebase Storage
@app.route('/firebase/files')
def list_files():
    bucket = storage.bucket()
    blobs = bucket.list_blobs()    
    file_list = [blob.name for blob in blobs]
    return file_list

# @app.route('/showresult')
# def result():
#     quality = module1.quality()
#     return quality


if __name__ == '__main__':
    app.run(debug=True)