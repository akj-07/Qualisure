import cv2
from PIL import Image
#import pytesseract
#import requests

import app




# Define a function to check image quality
def check_image_quality(image_path):
    # Read the image
    image = cv2.imread(image_path)

    # Convert the image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Calculate image sharpness using Laplacian operator
    sharpness = cv2.Laplacian(gray, cv2.CV_64F).var()

    # Calculate image contrast
    mean, stddev = cv2.meanStdDev(image)
    contrast = stddev[0] / mean[0]
    
    # Calculate image height, width
    height, width = image.shape[:2]

    # Determine image quality based on sharpness,contrast,height and width
    if sharpness > 1000 and contrast > 30:
        return "High Quality"
    elif width > 1000 and height > 1000:
        return "High Quality"
    else:
        return "Low Quality"



file_paths = app.list_files()
for blob in file_paths:
    # check_image_quality(blob)
    print(blob)

# # Specify the path to your image
image_path ="files/3fbabe70-2486-4ad0-9ed7-fc47c8845228.jpg"  # Replace with the path to your image


# # Check the image quality
def quality():
    quality = check_image_quality(image_path.replace("files/", ""))
    return print(f"Image Quality: {quality}")

# # List of image paths
# image_paths = ["",""]

# # Calculate quality metrics for each image
# quality_metrics = []
# for path in image_paths:
#     quality = check_image_quality(path)
#     quality_metrics.append(quality)

# # Calculate fluctuation in quality metrics
# unique_qualities = set(quality_metrics)
# total_images = len(image_paths)
# fluctuation_percentage = (len(unique_qualities) / total_images) * 100

# print(f"Fluctuation in image quality: {fluctuation_percentage:.2f}%")

# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# def calculate_text_quality(image_path):
#     # Read the image using OpenCV
#     img = cv2.imread(image_path)

#     # Convert the image to grayscale
#     gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

#     # Using pytesseract to perform OCR on the image
#     custom_config = r'--oem 3 --psm 12'  
#     extracted_text = pytesseract.image_to_string(Image.fromarray(gray), config=custom_config)

#     # Calculate mean pixel intensity of the text and the background
#     text_mean_intensity = gray.mean()
#     _, binary_threshold = cv2.threshold(gray, text_mean_intensity, 255, cv2.THRESH_BINARY)
#     background_mean_intensity = binary_threshold.mean()

#     # Calculate contrast ratio
#     contrast_ratio = text_mean_intensity / (background_mean_intensity + 1e-6)  

#     # Assessing text completeness 
#     completeness = 0.8  
#     return extracted_text, contrast_ratio, completeness

# # Path to the image file
# image_path = ""  # Replace with the path to your image

# # Assessing image text quality
# text, contrast_ratio, completeness = calculate_text_quality(image_path)

# # Determine text quality based on contrast ratio and completeness
# if contrast_ratio > 1.5 and completeness > 0.8:  
#     print("Text quality is good")
# else:
#     print("Text quality might be lower")

# # Print the extracted text
# print("Extracted Text:", text)
