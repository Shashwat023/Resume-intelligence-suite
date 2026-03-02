"""
Resume and JD Parser Module
"""

import PyPDF2
import docx2txt
import os


class ResumeJDParser:
    def __init__(self):
        self.supported_formats = ['.pdf', '.docx', '.txt']
    
    def parse_file(self, file_path):
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File not found: {file_path}")
        
        file_ext = os.path.splitext(file_path)[1].lower()
        
        if file_ext == '.pdf':
            return self._parse_pdf(file_path)
        elif file_ext == '.docx':
            return self._parse_docx(file_path)
        elif file_ext == '.txt':
            return self._parse_txt(file_path)
        else:
            raise ValueError(f"Unsupported file format: {file_ext}")
    
    def _parse_pdf(self, file_path):
        text = ""
        with open(file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page in pdf_reader.pages:
                text += page.extract_text()
        return text.strip()
    
    def _parse_docx(self, file_path):
        text = docx2txt.process(file_path)
        return text.strip()
    
    def _parse_txt(self, file_path):
        with open(file_path, 'r', encoding='utf-8') as file:
            text = file.read()
        return text.strip()
    
    def parse_resume_and_jd(self, resume_path, jd_path):
        resume_text = self.parse_file(resume_path)
        jd_text = self.parse_file(jd_path)
        return resume_text, jd_text
