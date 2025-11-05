/**
 * Export Utilities
 * Functions for exporting risk data to CSV and PDF
 */

import type { RiskScenario } from '../data/mock-risks';

/**
 * Export risks to CSV format
 */
export const exportToCSV = (risks: RiskScenario[], filename: string = 'risk-register.csv'): void => {
  // Define CSV headers
  const headers = [
    'Risk ID',
    'Name',
    'Category',
    'Priority',
    'Impact Level',
    'Likelihood Level',
    'Status',
    'Owner',
    'Financial Impact',
    'Expected Annual Loss',
    'Value at Risk (95%)',
    'Maximum Probable Loss',
    'Records at Risk',
    'Description',
    'Reputational Impact',
    'Regulatory Impact',
    'Operational Impact',
    'Current Controls',
    'Planned Controls',
    'Mitigation Timeline',
    'Residual Risk',
    'MITRE Tactics',
    'Data Types',
    'Jurisdictions',
    'Frameworks',
  ];

  // Convert risks to CSV rows
  const rows = risks.map(risk => [
    risk.risk_id,
    `"${risk.name.replace(/"/g, '""')}"`, // Escape quotes
    risk.category,
    risk.priority,
    risk.impact_level,
    risk.likelihood_level,
    risk.status,
    risk.owner_name,
    risk.financial_impact || '',
    risk.expected_annual_loss || '',
    risk.value_at_risk_95 || '',
    risk.maximum_probable_loss || '',
    risk.records_at_risk || '',
    `"${(risk.description || '').replace(/"/g, '""')}"`,
    `"${(risk.reputational_impact || '').toString().replace(/"/g, '""')}"`,
    `"${(risk.regulatory_impact || '').toString().replace(/"/g, '""')}"`,
    `"${(risk.operational_impact || '').toString().replace(/"/g, '""')}"`,
    `"${(risk.current_controls || []).join('; ')}"`,
    `"${(risk.planned_controls || []).join('; ')}"`,
    risk.mitigation_timeline || '',
    '', // residual_risk not in model
    `"${(risk.mitre_tactics || []).join(', ')}"`,
    `"${(risk.data_types || []).join(', ')}"`,
    `"${(risk.jurisdictions || []).join(', ')}"`,
    `"${(risk.regulatory_frameworks || []).join(', ')}"`,
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Export risks to PDF format (simplified - would use a library like jsPDF in production)
 */
export const exportToPDF = (risks: RiskScenario[], filename: string = 'risk-register.pdf'): void => {
  // For now, create a printable HTML version
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Risk Register Report</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 40px;
          color: #333;
        }
        h1 {
          color: #5E5694;
          border-bottom: 3px solid #5E5694;
          padding-bottom: 10px;
        }
        .header-info {
          margin: 20px 0;
          padding: 15px;
          background: #f5f5f5;
          border-radius: 5px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th {
          background: #5E5694;
          color: white;
          padding: 12px;
          text-align: left;
          font-weight: 600;
        }
        td {
          padding: 10px;
          border-bottom: 1px solid #ddd;
        }
        tr:hover {
          background: #f9f9f9;
        }
        .priority-critical { color: #DC3545; font-weight: bold; }
        .priority-high { color: #FD7E14; font-weight: bold; }
        .priority-medium { color: #FFC107; font-weight: bold; }
        .priority-low { color: #6C757D; }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          text-align: center;
          color: #666;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <h1>Kovrr.ai Risk Register Report</h1>
      <div class="header-info">
        <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Total Risks:</strong> ${risks.length}</p>
        <p><strong>Total Financial Impact:</strong> $${(risks.reduce((sum, r) => sum + (r.financial_impact || 0), 0) / 1000000).toFixed(1)}M</p>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Risk ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Impact</th>
            <th>Likelihood</th>
            <th>Status</th>
            <th>Financial Impact</th>
          </tr>
        </thead>
        <tbody>
          ${risks.map(risk => `
            <tr>
              <td>${risk.risk_id}</td>
              <td>${risk.name}</td>
              <td>${risk.category}</td>
              <td class="priority-${risk.priority.toLowerCase()}">${risk.priority}</td>
              <td>${risk.impact_level}</td>
              <td>${risk.likelihood_level}</td>
              <td>${risk.status}</td>
              <td>$${((risk.financial_impact || 0) / 1000000).toFixed(1)}M</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div class="footer">
        <p>Kovrr.ai Risk Register - Confidential</p>
        <p>© 2025 Kovrr. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;

  // Open in new window for printing
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    
    // Trigger print dialog after content loads
    setTimeout(() => {
      printWindow.print();
    }, 250);
  }
};

/**
 * Export single risk to JSON
 */
export const exportRiskToJSON = (risk: RiskScenario, filename?: string): void => {
  const jsonContent = JSON.stringify(risk, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename || `${risk.risk_id}.json`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Copy risk data to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
};
