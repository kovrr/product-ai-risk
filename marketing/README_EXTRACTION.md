# Marketing PDF Extraction & Gap Analysis

## Purpose

This script extracts text from marketing PDFs and analyzes them to identify capability gaps between what's marketed and what's implemented.

## Quick Start

### Step 1: Install Dependencies

```bash
cd /Users/liransorani/CascadeProjects/aikovrr/marketing
pip install -r requirements.txt
```

Or install manually:
```bash
pip install PyPDF2 pdfplumber
```

### Step 2: Run the Extraction Script

```bash
python extract_and_analyze.py
```

## What It Does

1. **Finds all PDFs** in the marketing folder
2. **Extracts text** from each PDF
3. **Saves text files** to `marketing/extracted_text/` folder
4. **Identifies capabilities** mentioned in the marketing materials
5. **Creates a summary** in JSON format
6. **Generates a gap analysis report** in Markdown

## Output Files

After running, you'll get:

```
marketing/
├── extracted_text/
│   ├── AI Asset Visibility - LP.txt
│   ├── AI Compliance Readiness - LP (General).txt
│   ├── AI Risk Quantification (ARQ) - LP (General).txt
│   ├── AI Third Party Risk Management - LP.txt
│   ├── AI Risk Acceptance -Exception Request V1.0 - blank.txt
│   ├── Updated_New AI Governance Page - LP.txt
│   ├── extraction_summary.json
│   └── DETAILED_GAP_ANALYSIS.md
```

## Next Steps

1. **Review extracted text files** - Check if extraction quality is good
2. **Read the gap analysis report** - See what capabilities are mentioned
3. **Compare with actual platform** - Map to implemented features
4. **Update CAPABILITY_GAP_ANALYSIS.md** - Add specific marketing claims

## Troubleshooting

### If you get "Module not found" error:

```bash
# Try installing with pip3
pip3 install PyPDF2 pdfplumber

# Or use a virtual environment
python3 -m venv venv
source venv/bin/activate  # On Mac/Linux
pip install -r requirements.txt
```

### If extraction quality is poor:

The script tries two libraries:
1. PyPDF2 (faster, sometimes less accurate)
2. pdfplumber (slower, usually better quality)

If one doesn't work well, the script automatically tries the other.

## Manual Review Required

After extraction, you'll need to:
1. Read the extracted text to understand marketing claims
2. Map each claim to actual platform capabilities
3. Identify gaps where marketing promises exceed implementation
4. Update the main gap analysis document

## Example Usage

```bash
# Navigate to marketing folder
cd /Users/liransorani/CascadeProjects/aikovrr/marketing

# Install dependencies (one time)
pip install PyPDF2 pdfplumber

# Run extraction
python extract_and_analyze.py

# View results
ls -la extracted_text/
cat extracted_text/extraction_summary.json
open extracted_text/DETAILED_GAP_ANALYSIS.md
```

## Notes

- PDFs must be in the `/marketing` folder
- Script creates `extracted_text/` subfolder automatically
- Existing text files will be overwritten
- JSON summary includes first 50 capabilities per PDF
- Full capabilities are in individual text files
