import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, TrendingUp, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import type { RiskScenario } from '../../data/mock-risks';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'recommendation' | 'analysis';
}

interface KovrrAIChatProps {
  risks: RiskScenario[];
  className?: string;
}

export const KovrrAIChat: React.FC<KovrrAIChatProps> = ({ risks, className = '' }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "👋 Hi! I'm Kovrr AI, your AI risk management assistant. I can help you analyze your risk portfolio, prioritize mitigation efforts, and provide strategic recommendations.\n\nTry asking me:\n• \"What are my highest priority risks?\"\n• \"Which assets have the most risks?\"\n• \"Recommend mitigation strategies for critical risks\"\n• \"What's my total financial exposure?\"",
      timestamp: new Date(),
      type: 'text',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock AI response generator
  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Calculate metrics
    const criticalRisks = risks.filter(r => r.priority === 'Critical');
    const highRisks = risks.filter(r => r.priority === 'High');
    const totalFinancialImpact = risks.reduce((sum, r) => sum + (r.financial_impact || 0), 0);
    const totalEAL = risks.reduce((sum, r) => sum + (r.expected_annual_loss || 0), 0);
    
    // Priority risks query
    if (lowerMessage.includes('priority') || lowerMessage.includes('highest') || lowerMessage.includes('critical')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Based on my analysis of your ${risks.length} risk scenarios:\n\n**Critical Priority Risks (${criticalRisks.length}):**\n${criticalRisks.slice(0, 3).map(r => `• ${r.risk_id}: ${r.name} - $${(r.financial_impact / 1000000).toFixed(1)}M impact`).join('\n')}\n\n**High Priority Risks (${highRisks.length}):**\n${highRisks.slice(0, 3).map(r => `• ${r.risk_id}: ${r.name} - ${r.impact_level} impact`).join('\n')}\n\n💡 **Recommendation:** Focus on ${criticalRisks[0]?.name || 'critical risks'} first - it has the highest financial impact and likelihood combination.`,
        timestamp: new Date(),
        type: 'recommendation',
      };
    }
    
    // Financial exposure query
    if (lowerMessage.includes('financial') || lowerMessage.includes('exposure') || lowerMessage.includes('cost')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `📊 **Financial Risk Exposure Analysis:**\n\n• **Total Potential Impact:** $${(totalFinancialImpact / 1000000).toFixed(1)}M\n• **Expected Annual Loss (EAL):** $${(totalEAL / 1000000).toFixed(1)}M\n• **Average per Risk:** $${(totalFinancialImpact / risks.length / 1000000).toFixed(1)}M\n\n**Top 3 Financial Risks:**\n${risks.sort((a, b) => (b.financial_impact || 0) - (a.financial_impact || 0)).slice(0, 3).map(r => `• ${r.name}: $${(r.financial_impact / 1000000).toFixed(1)}M`).join('\n')}\n\n⚠️ **Alert:** Your total EAL represents significant exposure. Consider immediate mitigation for top 3 risks to reduce by ~60%.`,
        timestamp: new Date(),
        type: 'analysis',
      };
    }
    
    // Assets query
    if (lowerMessage.includes('asset') || lowerMessage.includes('system')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `🎯 **Asset Risk Analysis:**\n\nBased on your risk register, here are the assets with the highest risk exposure:\n\n• **ChatGPT Enterprise:** 4 associated risks (Privacy, Data Leakage)\n• **GitHub Copilot:** 3 associated risks (Code Security, IP)\n• **Midjourney:** 2 associated risks (Content Generation, Bias)\n\n💡 **Recommendation:** Implement additional controls for ChatGPT Enterprise:\n1. Data Loss Prevention (DLP) integration\n2. User activity monitoring\n3. Prompt injection detection\n4. Regular security audits`,
        timestamp: new Date(),
        type: 'recommendation',
      };
    }
    
    // Mitigation strategies
    if (lowerMessage.includes('mitigat') || lowerMessage.includes('strateg') || lowerMessage.includes('recommend')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `🛡️ **Mitigation Strategy Recommendations:**\n\n**For Critical Risks:**\n1. **Immediate Actions (0-30 days):**\n   • Implement DLP controls\n   • Enable audit logging\n   • Deploy prompt injection filters\n\n2. **Short-term (1-3 months):**\n   • Conduct security assessments\n   • Implement RBAC policies\n   • Deploy monitoring dashboards\n\n3. **Long-term (3-6 months):**\n   • Build AI governance framework\n   • Establish incident response procedures\n   • Deploy automated compliance checks\n\n**Estimated Risk Reduction:** 65-75% with full implementation\n**ROI Timeline:** Break-even in 8-12 months`,
        timestamp: new Date(),
        type: 'recommendation',
      };
    }
    
    // Compliance query
    if (lowerMessage.includes('complian') || lowerMessage.includes('regulat') || lowerMessage.includes('framework')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `📋 **Compliance & Regulatory Analysis:**\n\n**Applicable Frameworks:**\n• GDPR - 7 risks require attention\n• CCPA - 5 risks identified\n• NIST AI RMF - Full coverage needed\n• ISO 42001 - 3 gaps identified\n\n**Compliance Gaps:**\n1. Data retention policies (GDPR Art. 17)\n2. Algorithmic transparency (EU AI Act)\n3. Bias testing documentation (ISO 42001)\n\n✅ **Next Steps:**\n• Schedule compliance assessment\n• Document AI system inventory\n• Implement privacy-by-design controls`,
        timestamp: new Date(),
        type: 'analysis',
      };
    }
    
    // Trend analysis
    if (lowerMessage.includes('trend') || lowerMessage.includes('pattern') || lowerMessage.includes('analyz')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `📈 **Risk Trend Analysis:**\n\n**Key Findings:**\n• 40% of risks are in "Expected" likelihood category - requires immediate attention\n• Privacy risks increased 25% this quarter\n• Security risks remain stable\n• Bias/Fairness risks emerging (new category)\n\n**Patterns Detected:**\n1. GenAI tools (ChatGPT, Midjourney) have highest risk concentration\n2. Data exposure risks correlate with cloud-based AI services\n3. Mitigation timelines averaging 4.5 months - consider acceleration\n\n⚠️ **Alert:** 3 risks have passed their mitigation deadlines - review required.`,
        timestamp: new Date(),
        type: 'analysis',
      };
    }
    
    // Default response
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: `I understand you're asking about "${userMessage}". I can help you with:\n\n• **Risk Analysis:** Priority assessment, financial exposure, trend analysis\n• **Mitigation Planning:** Strategic recommendations, timeline optimization\n• **Compliance:** Framework mapping, gap identification\n• **Asset Management:** Risk concentration, control effectiveness\n\nCould you rephrase your question or try one of the suggested topics above?`,
      timestamp: new Date(),
      type: 'text',
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
      type: 'text',
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case 'recommendation':
        return <Lightbulb className="text-yellow-600" size={16} />;
      case 'analysis':
        return <TrendingUp className="text-blue-600" size={16} />;
      default:
        return <Sparkles className="text-purple-600" size={16} />;
    }
  };

  const suggestedQuestions = [
    "What are my highest priority risks?",
    "Show me financial exposure analysis",
    "Which assets need immediate attention?",
    "Recommend mitigation strategies",
  ];

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-[10px]">
        <div className="flex items-center gap-2">
          <Sparkles size={24} />
          <div>
            <h3 className="font-semibold text-lg">Kovrr AI Assistant</h3>
            <p className="text-xs text-purple-100">AI-powered risk intelligence</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-fill-base-secondary">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-fill-brand-primary text-white'
                  : 'bg-fill-base-primary border border-stroke-base-secondary'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2">
                  {getMessageIcon(message.type)}
                  <span className="text-xs font-semibold text-text-base-secondary">
                    Kovrr AI
                  </span>
                </div>
              )}
              <div className={`text-sm whitespace-pre-line ${
                message.role === 'user' ? 'text-white' : 'text-text-base-primary'
              }`}>
                {message.content}
              </div>
              <div className={`text-xs mt-2 ${
                message.role === 'user' ? 'text-purple-200' : 'text-text-base-tertiary'
              }`}>
                {message.timestamp.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-fill-base-primary border border-stroke-base-secondary rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Sparkles className="text-purple-600 animate-pulse" size={16} />
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="p-4 bg-fill-base-secondary border-t border-stroke-base-secondary">
          <div className="text-xs font-semibold text-text-base-secondary mb-2">
            Suggested questions:
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputValue(question)}
                className="text-xs px-3 py-1.5 bg-fill-base-primary border border-stroke-base-secondary 
                  rounded-full hover:bg-fill-brand-primary hover:text-white hover:border-fill-brand-primary 
                  transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-fill-base-primary border-t border-stroke-base-secondary rounded-b-[10px]">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Kovrr AI anything about your risks..."
            className="flex-1 px-4 py-2 border border-stroke-base-secondary rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-fill-brand-primary focus:border-transparent
              text-sm"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="btn btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="text-xs text-text-base-tertiary mt-2">
          Press Enter to send • Shift+Enter for new line
        </div>
      </div>
    </div>
  );
};
