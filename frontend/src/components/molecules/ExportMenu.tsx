import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, ChevronDown } from 'lucide-react';
import type { RiskScenario } from '../../data/mock-risks';
import { exportToCSV, exportToPDF } from '../../utils/exportUtils';
import { useNotification } from '../../contexts/NotificationContext';

interface ExportMenuProps {
  risks: RiskScenario[];
  className?: string;
}

export const ExportMenu: React.FC<ExportMenuProps> = ({ risks, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { showNotification } = useNotification();

  const handleExportCSV = () => {
    try {
      exportToCSV(risks);
      showNotification({
        type: 'success',
        title: 'Export Successful',
        message: `Exported ${risks.length} risk scenarios to CSV.`,
      });
    } catch (error) {
      showNotification({
        type: 'error',
        title: 'Export Failed',
        message: 'Failed to export risks to CSV. Please try again.',
      });
    }
    setIsOpen(false);
  };

  const handleExportPDF = () => {
    try {
      exportToPDF(risks);
      showNotification({
        type: 'success',
        title: 'Export Successful',
        message: `Exported ${risks.length} risk scenarios to PDF.`,
      });
    } catch (error) {
      showNotification({
        type: 'error',
        title: 'Export Failed',
        message: 'Failed to export risks to PDF. Please try again.',
      });
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-secondary flex items-center gap-2"
      >
        <Download size={18} />
        Export
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-56 bg-white border border-stroke-base-secondary rounded-lg shadow-lg z-20">
            <div className="p-2">
              <button
                onClick={handleExportCSV}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text-base-primary hover:bg-fill-base-secondary rounded-md transition-colors"
              >
                <FileSpreadsheet size={18} className="text-green-600" />
                <div className="text-left flex-1">
                  <div className="font-medium">Export to CSV</div>
                  <div className="text-xs text-text-base-tertiary">
                    Download as spreadsheet
                  </div>
                </div>
              </button>

              <button
                onClick={handleExportPDF}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text-base-primary hover:bg-fill-base-secondary rounded-md transition-colors"
              >
                <FileText size={18} className="text-red-600" />
                <div className="text-left flex-1">
                  <div className="font-medium">Export to PDF</div>
                  <div className="text-xs text-text-base-tertiary">
                    Print-ready report
                  </div>
                </div>
              </button>
            </div>

            <div className="border-t border-stroke-base-secondary p-2">
              <div className="px-3 py-2 text-xs text-text-base-tertiary">
                Exporting {risks.length} risk scenario{risks.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
