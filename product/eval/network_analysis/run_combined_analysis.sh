#!/bin/bash

# Combined AI Asset Detection - Test Run
# This script runs the combined analysis on your test data

echo "═══════════════════════════════════════════════════════════════════"
echo "🔍 Combined AI Asset Detection (Zscaler + DSPM)"
echo "═══════════════════════════════════════════════════════════════════"
echo ""

# Set paths
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ZSCALER_FILE="/tmp/ff/2025-11-26T06-18-37_UTC_web_log-redacted.csv"
DSPM_FILE="$SCRIPT_DIR/DSPM_list_of_apps_governance_2025-11-26.csv"
OUTPUT_FILE="$SCRIPT_DIR/combined_ai_assets_report_$(date +%Y%m%d_%H%M%S).xlsx"

# Check if files exist
if [ ! -f "$ZSCALER_FILE" ]; then
    echo "❌ Error: Zscaler file not found at $ZSCALER_FILE"
    echo "   Please update the path in this script"
    exit 1
fi

if [ ! -f "$DSPM_FILE" ]; then
    echo "❌ Error: DSPM file not found at $DSPM_FILE"
    echo "   Please update the path in this script"
    exit 1
fi

echo "📂 Input Files:"
echo "   Zscaler: $ZSCALER_FILE"
echo "   DSPM:    $DSPM_FILE"
echo ""
echo "📊 Output File:"
echo "   Report:  $OUTPUT_FILE"
echo ""
echo "🚀 Starting analysis..."
echo ""

# Run the combined detection script (v2 with enhanced normalization)
python3 "$SCRIPT_DIR/combined_ai_asset_detector_v2.py" \
    "$ZSCALER_FILE" \
    "$DSPM_FILE" \
    "$OUTPUT_FILE"

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    echo ""
    echo "═══════════════════════════════════════════════════════════════════"
    echo "✅ Analysis Complete!"
    echo "═══════════════════════════════════════════════════════════════════"
    echo ""
    echo "📄 Report saved to:"
    echo "   $OUTPUT_FILE"
    echo ""
    echo "📋 Next Steps:"
    echo "   1. Open the Excel report"
    echo "   2. Review 'Confirmed Assets' sheet (highest confidence)"
    echo "   3. Check 'Shadow AI Assets' sheet for unapproved tools"
    echo "   4. Take action on CRITICAL risk assets"
    echo ""
else
    echo ""
    echo "❌ Analysis failed with exit code $EXIT_CODE"
    echo "   Check the error messages above"
    exit $EXIT_CODE
fi
