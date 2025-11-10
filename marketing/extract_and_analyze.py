#!/usr/bin/env python3
"""
PDF Marketing Material Analyzer
Extracts text from marketing PDFs and compares against actual platform capabilities
"""

import os
import json
from pathlib import Path

def extract_pdf_text(pdf_path):
    """Extract text from PDF using PyPDF2"""
    try:
        import PyPDF2
        
        text_content = []
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            num_pages = len(pdf_reader.pages)
            
            for page_num in range(num_pages):
                page = pdf_reader.pages[page_num]
                text = page.extract_text()
                text_content.append(f"\n--- Page {page_num + 1} ---\n{text}")
        
        return "\n".join(text_content)
    
    except ImportError:
        print("PyPDF2 not installed. Trying pdfplumber...")
        return extract_pdf_text_pdfplumber(pdf_path)
    except Exception as e:
        print(f"Error extracting {pdf_path}: {e}")
        return None


def extract_pdf_text_pdfplumber(pdf_path):
    """Fallback: Extract text from PDF using pdfplumber"""
    try:
        import pdfplumber
        
        text_content = []
        with pdfplumber.open(pdf_path) as pdf:
            for page_num, page in enumerate(pdf.pages):
                text = page.extract_text()
                if text:
                    text_content.append(f"\n--- Page {page_num + 1} ---\n{text}")
        
        return "\n".join(text_content)
    
    except ImportError:
        print("ERROR: Neither PyPDF2 nor pdfplumber is installed.")
        print("Please install one of them:")
        print("  pip install PyPDF2")
        print("  or")
        print("  pip install pdfplumber")
        return None
    except Exception as e:
        print(f"Error extracting {pdf_path}: {e}")
        return None


def save_extracted_text(pdf_path, output_dir):
    """Extract PDF and save as text file"""
    pdf_name = Path(pdf_path).stem
    output_path = output_dir / f"{pdf_name}.txt"
    
    print(f"Extracting: {pdf_name}...")
    text = extract_pdf_text(pdf_path)
    
    if text:
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"  ✅ Saved to: {output_path}")
        return output_path
    else:
        print(f"  ❌ Failed to extract text")
        return None


def extract_capabilities_from_text(text, pdf_name):
    """Extract capability claims from marketing text"""
    capabilities = []
    
    # Common capability keywords to look for
    keywords = [
        'feature', 'capability', 'function', 'benefit',
        'automated', 'automatic', 'real-time', 'monitor',
        'track', 'manage', 'assess', 'analyze', 'report',
        'integrate', 'discover', 'identify', 'calculate',
        'visualize', 'dashboard', 'alert', 'notification'
    ]
    
    lines = text.split('\n')
    for i, line in enumerate(lines):
        line_lower = line.lower()
        
        # Look for bullet points or numbered lists
        if any(line.strip().startswith(marker) for marker in ['•', '-', '✓', '✔', '*', '→']):
            capabilities.append({
                'text': line.strip(),
                'type': 'bullet',
                'context': lines[max(0, i-1):min(len(lines), i+2)]
            })
        
        # Look for lines with capability keywords
        elif any(keyword in line_lower for keyword in keywords):
            if len(line.strip()) > 10 and len(line.strip()) < 200:
                capabilities.append({
                    'text': line.strip(),
                    'type': 'keyword',
                    'context': lines[max(0, i-1):min(len(lines), i+2)]
                })
    
    return capabilities


def analyze_all_pdfs(marketing_dir):
    """Main function to process all PDFs"""
    marketing_path = Path(marketing_dir)
    output_dir = marketing_path / "extracted_text"
    output_dir.mkdir(exist_ok=True)
    
    # Find all PDFs
    pdf_files = list(marketing_path.glob("*.pdf"))
    
    if not pdf_files:
        print("No PDF files found in marketing directory")
        return
    
    print(f"\n📄 Found {len(pdf_files)} PDF files\n")
    
    all_extracts = {}
    
    # Extract each PDF
    for pdf_file in pdf_files:
        output_path = save_extracted_text(pdf_file, output_dir)
        if output_path:
            # Read the extracted text
            with open(output_path, 'r', encoding='utf-8') as f:
                text = f.read()
            
            # Extract capabilities
            capabilities = extract_capabilities_from_text(text, pdf_file.stem)
            
            all_extracts[pdf_file.stem] = {
                'pdf_path': str(pdf_file),
                'text_path': str(output_path),
                'text_length': len(text),
                'capabilities_found': len(capabilities),
                'capabilities': capabilities[:50]  # Limit to first 50
            }
    
    # Save summary
    summary_path = output_dir / "extraction_summary.json"
    with open(summary_path, 'w', encoding='utf-8') as f:
        json.dump(all_extracts, f, indent=2)
    
    print(f"\n✅ Extraction complete!")
    print(f"📁 Text files saved to: {output_dir}")
    print(f"📊 Summary saved to: {summary_path}")
    
    # Print summary
    print("\n" + "="*80)
    print("EXTRACTION SUMMARY")
    print("="*80)
    
    for pdf_name, data in all_extracts.items():
        print(f"\n📄 {pdf_name}")
        print(f"   Text length: {data['text_length']:,} characters")
        print(f"   Capabilities found: {data['capabilities_found']}")
        print(f"   Output: {data['text_path']}")
    
    return all_extracts


def create_gap_analysis_report(extracts, output_path):
    """Create a detailed gap analysis report"""
    
    report = []
    report.append("# DETAILED GAP ANALYSIS - Based on Marketing PDFs\n")
    report.append(f"**Generated**: {Path(__file__).name}\n")
    report.append(f"**Date**: November 9, 2025\n\n")
    report.append("---\n\n")
    
    for pdf_name, data in extracts.items():
        report.append(f"## {pdf_name}\n\n")
        report.append(f"**Source**: `{Path(data['pdf_path']).name}`\n")
        report.append(f"**Extracted Text**: `{Path(data['text_path']).name}`\n")
        report.append(f"**Capabilities Found**: {data['capabilities_found']}\n\n")
        
        if data['capabilities']:
            report.append("### Key Capabilities Mentioned:\n\n")
            for i, cap in enumerate(data['capabilities'][:20], 1):
                report.append(f"{i}. {cap['text']}\n")
            report.append("\n")
        
        report.append("---\n\n")
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.writelines(report)
    
    print(f"\n📝 Gap analysis report created: {output_path}")


if __name__ == "__main__":
    # Get the marketing directory
    script_dir = Path(__file__).parent
    marketing_dir = script_dir
    
    print("="*80)
    print("PDF MARKETING MATERIAL ANALYZER")
    print("="*80)
    print(f"\nMarketing directory: {marketing_dir}\n")
    
    # Extract and analyze all PDFs
    extracts = analyze_all_pdfs(marketing_dir)
    
    if extracts:
        # Create gap analysis report
        report_path = marketing_dir / "extracted_text" / "DETAILED_GAP_ANALYSIS.md"
        create_gap_analysis_report(extracts, report_path)
        
        print("\n" + "="*80)
        print("✅ COMPLETE!")
        print("="*80)
        print("\nNext steps:")
        print("1. Review extracted text files in: marketing/extracted_text/")
        print("2. Review the gap analysis report")
        print("3. Compare against actual platform capabilities")
    else:
        print("\n❌ No PDFs were successfully extracted")
