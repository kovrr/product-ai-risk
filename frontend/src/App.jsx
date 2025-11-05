import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AssetsVisibility from './pages/AssetsVisibility';
import { AssetDetailView } from './pages/AssetsVisibility/AssetDetailView';
import ManualAssetWizard from './pages/AssetsVisibility/ManualAssetWizard';
import RiskRegister from './pages/RiskRegister';
import { RiskDetailView } from './pages/RiskDetailView';
import GovernanceMonitoring from './pages/GovernanceMonitoring';
import ComplianceReadiness from './pages/ComplianceReadiness';
import AIAssurancePlan from './pages/AIAssurancePlan';
import IntegrationHub from './pages/IntegrationHub';
import FinancialQuantification from './pages/FinancialQuantification';
import { ComponentTest } from './pages/ComponentTest';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

// Placeholder components for other routes
const Placeholder = ({ title }) => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-neutral-800">{title}</h1>
      <p className="text-neutral-600 mt-2">Coming soon...</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="assets" element={<AssetsVisibility />} />
            <Route path="assets/new" element={<ManualAssetWizard />} />
            <Route path="assets/:id" element={<AssetDetailView />} />
            <Route path="risk-register" element={<RiskRegister />} />
            <Route path="risk-register/:id" element={<RiskDetailView />} />
            <Route path="compliance-readiness" element={<ComplianceReadiness />} />
            <Route path="ai-assurance-plan" element={<AIAssurancePlan />} />
            <Route path="governance-monitoring" element={<GovernanceMonitoring />} />
            <Route path="integration-hub" element={<IntegrationHub />} />
            <Route path="financial-quantification" element={<FinancialQuantification />} />
            <Route path="component-test" element={<ComponentTest />} />
          </Route>
        </Routes>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
