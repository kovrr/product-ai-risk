/**
 * Asset-Control Mappings
 * Maps AI assets to their applicable NIST AI RMF controls
 * Only includes NIST framework controls (GOVERN, MAP, MEASURE, MANAGE)
 */

export const assetControlMappings = {
  // ChatGPT - Comprehensive coverage due to high risk
  'chatgpt': {
    controls: [
      'GOVERN-1.1', 'GOVERN-1.2', 'GOVERN-1.3', 'GOVERN-1.4', 'GOVERN-1.5', 'GOVERN-1.6',
      'MAP-1.1', 'MAP-2.1', 'MAP-2.2', 'MAP-3.1', 'MAP-5.1',
      'MEASURE-1.1', 'MEASURE-2.1', 'MEASURE-2.2', 'MEASURE-3.1',
      'MANAGE-1.1', 'MANAGE-2.1', 'MANAGE-3.1', 'MANAGE-4.1'
    ],
    riskAreas: ['Data Privacy', 'Compliance', 'Model Bias', 'Security']
  },

  // GitHub Copilot - Code generation focus
  'github-copilot': {
    controls: [
      'GOVERN-1.1', 'GOVERN-1.2', 'GOVERN-1.3',
      'MAP-2.1', 'MAP-3.1', 'MAP-5.1',
      'MEASURE-2.1', 'MEASURE-3.1',
      'MANAGE-2.1', 'MANAGE-3.1', 'MANAGE-4.1'
    ],
    riskAreas: ['Data Privacy', 'Security', 'Intellectual Property']
  },

  // Grammarly - Text processing
  'grammarly': {
    controls: [
      'GOVERN-1.1', 'GOVERN-1.2',
      'MAP-2.1', 'MAP-5.1',
      'MEASURE-2.1',
      'MANAGE-2.1', 'MANAGE-3.1'
    ],
    riskAreas: ['Data Privacy', 'Security']
  },

  // Jasper AI - Content generation
  'jasper': {
    controls: [
      'GOVERN-1.1', 'GOVERN-1.2', 'GOVERN-1.3',
      'MAP-1.1', 'MAP-2.1', 'MAP-3.1',
      'MEASURE-1.1', 'MEASURE-2.1', 'MEASURE-3.1',
      'MANAGE-1.1', 'MANAGE-2.1', 'MANAGE-3.1'
    ],
    riskAreas: ['Data Privacy', 'Model Bias', 'Compliance']
  },

  // DeepSeek Coder - Chinese LLM for code generation
  'deepseek-coder': {
    controls: [
      'GOVERN-1.1', 'GOVERN-1.2', 'GOVERN-1.3', 'GOVERN-1.4', 'GOVERN-1.5',
      'MAP-1.1', 'MAP-2.1', 'MAP-3.1', 'MAP-5.1',
      'MEASURE-1.1', 'MEASURE-2.1', 'MEASURE-3.1',
      'MANAGE-1.1', 'MANAGE-2.1', 'MANAGE-3.1', 'MANAGE-4.1'
    ],
    riskAreas: ['Data Privacy', 'Compliance', 'Security', 'Intellectual Property']
  },

  // Baidu ERNIE Bot - Chinese LLM chatbot
  'baidu-ernie-bot': {
    controls: [
      'GOVERN-1.1', 'GOVERN-1.2', 'GOVERN-1.3', 'GOVERN-1.4',
      'MAP-1.1', 'MAP-2.1', 'MAP-3.1', 'MAP-5.1',
      'MEASURE-1.1', 'MEASURE-2.1', 'MEASURE-3.1',
      'MANAGE-1.1', 'MANAGE-2.1', 'MANAGE-3.1'
    ],
    riskAreas: ['Data Privacy', 'Compliance', 'Model Bias', 'Security']
  },

  // Midjourney - Image generation
  'midjourney': {
    controls: [
      'GOVERN-1.1', 'GOVERN-1.2',
      'MAP-1.1', 'MAP-3.1',
      'MEASURE-1.1', 'MEASURE-3.1',
      'MANAGE-1.1', 'MANAGE-3.1'
    ],
    riskAreas: ['Intellectual Property', 'Model Bias', 'Compliance']
  },

  // Notion AI - Productivity
  'notion-ai': {
    controls: [
      'GOVERN-1.1', 'GOVERN-1.2',
      'MAP-2.1', 'MAP-5.1',
      'MEASURE-2.1',
      'MANAGE-2.1', 'MANAGE-3.1'
    ],
    riskAreas: ['Data Privacy', 'Security']
  },

  // Otter.ai - Transcription
  'otter-ai': {
    controls: [
      'GOVERN-1.1', 'GOVERN-1.2',
      'MAP-2.1', 'MAP-5.1',
      'MEASURE-2.1',
      'MANAGE-2.1', 'MANAGE-3.1'
    ],
    riskAreas: ['Data Privacy', 'Security', 'Compliance']
  },

  // Salesforce Einstein - CRM AI
  'salesforce-einstein': {
    controls: [
      'GOVERN-1.1', 'GOVERN-1.2', 'GOVERN-1.3', 'GOVERN-1.4',
      'MAP-1.1', 'MAP-2.1', 'MAP-3.1', 'MAP-5.1',
      'MEASURE-1.1', 'MEASURE-2.1', 'MEASURE-3.1',
      'MANAGE-1.1', 'MANAGE-2.1', 'MANAGE-3.1', 'MANAGE-4.1'
    ],
    riskAreas: ['Data Privacy', 'Compliance', 'Model Bias', 'Security']
  },

  // Zapier AI - Automation
  'zapier-ai': {
    controls: [
      'GOVERN-1.1', 'GOVERN-1.2',
      'MAP-2.1', 'MAP-5.1',
      'MEASURE-2.1',
      'MANAGE-2.1', 'MANAGE-3.1', 'MANAGE-4.1'
    ],
    riskAreas: ['Data Privacy', 'Security', 'Operational']
  }
};

/**
 * Get controls for a specific asset
 * @param {string} assetName - Asset name (lowercase, hyphenated)
 * @returns {Array} Array of control IDs
 */
export const getControlsForAsset = (assetName) => {
  const normalizedName = assetName.toLowerCase().replace(/\s+/g, '-');
  return assetControlMappings[normalizedName]?.controls || [];
};

/**
 * Get risk areas for a specific asset
 * @param {string} assetName - Asset name (lowercase, hyphenated)
 * @returns {Array} Array of risk area names
 */
export const getRiskAreasForAsset = (assetName) => {
  const normalizedName = assetName.toLowerCase().replace(/\s+/g, '-');
  return assetControlMappings[normalizedName]?.riskAreas || [];
};

/**
 * Get all assets that use a specific control
 * @param {string} controlId - Control ID (e.g., "GOVERN-1.1")
 * @returns {Array} Array of asset names
 */
export const getAssetsForControl = (controlId) => {
  const assets = [];
  Object.entries(assetControlMappings).forEach(([assetName, data]) => {
    if (data.controls.includes(controlId)) {
      assets.push(assetName);
    }
  });
  return assets;
};
