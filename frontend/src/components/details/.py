import csv

# Input and output file paths
input_file = 'data.txt'
output_file = 'data.csv'

# Read the text file and convert it to CSV
with open(input_file, 'r') as text_file, open(output_file, 'w', newline='') as csv_file:
    # Define a CSV writer
    csv_writer = csv.writer(csv_file)

    # Read each line from the text file and split it into a list
    for line in text_file:
        line = line.strip()  # Remove any leading/trailing whitespace
        row = line.split(', ')  # Split the line by the comma and space
        csv_writer.writerow(row)

print(f"Conversion from {input_file} to {output_file} complete.")
