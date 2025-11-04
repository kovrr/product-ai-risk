import { useEffect, useState } from 'react';
import { visibilityService } from '../services/auth';
import { Eye, Search } from 'lucide-react';

const AssetsVisibility = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      const data = await visibilityService.getAssets();
      setAssets(data.results || data || []);
    } catch (error) {
      console.error('Failed to load assets:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAssets = assets.filter((asset) =>
    asset.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.vendor?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const badges = {
      Sanctioned: 'badge-success',
      Shadow: 'badge-warning',
      Unknown: 'badge-info',
    };
    return badges[status] || 'badge-info';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading assets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Assets Visibility</h1>
          <p className="text-neutral-600 mt-1">AI tools and applications inventory</p>
        </div>
        <button className="btn btn-primary">
          <Eye size={18} />
          Discover Assets
        </button>
      </div>

      <div className="card">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type="text"
              placeholder="Search assets by name or vendor..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Asset Name</th>
                <th>Vendor</th>
                <th>Category</th>
                <th>Status</th>
                <th>First Seen</th>
                <th>Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-neutral-500">
                    No assets found
                  </td>
                </tr>
              ) : (
                filteredAssets.map((asset) => (
                  <tr key={asset.id}>
                    <td className="font-medium">{asset.name}</td>
                    <td>{asset.vendor || 'N/A'}</td>
                    <td>{asset.category || 'Uncategorized'}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(asset.status)}`}>
                        {asset.status}
                      </span>
                    </td>
                    <td>{asset.first_seen ? new Date(asset.first_seen).toLocaleDateString() : 'N/A'}</td>
                    <td>{asset.last_seen ? new Date(asset.last_seen).toLocaleDateString() : 'N/A'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssetsVisibility;
