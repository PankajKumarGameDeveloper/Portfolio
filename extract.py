import sys
from pypdf import PdfReader
import re

reader = PdfReader("PANKAJ KUMAR.pdf")
text = ""
for page in reader.pages:
    text += page.extract_text() + "\n"

# Clean up the spacing issues. The text has spaces between letters like "H o o d"
cleaned_text = re.sub(r'([a-zA-Z0-9\-])\s(?=[a-zA-Z0-9\-])', r'\1', text)

with open("resume_text.txt", "w", encoding="utf-8") as f:
    f.write(cleaned_text)
