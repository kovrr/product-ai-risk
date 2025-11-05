import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Plus } from 'lucide-react';
import { mockRisks, getRiskAssets, getAssetById } from '../data';
import { Badge } from '@/newComponents/atoms/badge';
import { Button } from '@/newComponents/atoms/button';
import { Card, CardContent } from '@/newComponents/atoms/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/newComponents/atoms/table';

const RiskRegister = () => {
  const navigate = useNavigate();

  // Calculate affected assets for each risk
  const risksWithAssets = useMemo(() => {
    return mockRisks.map(risk => {
      const assetIds = getRiskAssets(risk.id);
      const assets = assetIds.map(id => getAssetById(id)).filter(Boolean);
      return {
        ...risk,
        affectedAssets: assets,
        assetCount: assets.length,
      };
    });
  }, []);

  const getPriorityBadge = (priority) => {
    const badges = {
      Critical: 'badge-error',
      High: 'badge-warning',
      Medium: 'badge-info',
      Low: 'badge-success',
    };
    return badges[priority] || 'badge-info';
  };

  return (
    <div className="min-h-screen bg-fill-base-1 p-md space-y-sm">
      <div className="flex items-center justify-between">
        <div className="space-y-xs">
          <h1 className="text-[32px] font-[700] text-text-base-primary">Risk Register</h1>
          <p className="text-[14px] text-text-base-secondary">AI risk scenarios and mitigation strategies</p>
        </div>
        <Button variant="primary" className="rounded-[15px] px-md">
          <Plus size={18} />
          Add Risk Scenario
        </Button>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Risk Name</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Likelihood</TableHead>
                  <TableHead>Impact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Affected Assets</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {risksWithAssets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-text-base-tertiary">
                      No risk scenarios found
                    </TableCell>
                  </TableRow>
                ) : (
                  risksWithAssets.map((risk) => (
                    <TableRow
                      key={risk.id}
                      className="hover:bg-fill-base-1 cursor-pointer"
                    >
                      <TableCell className="font-[600]">{risk.name}</TableCell>
                      <TableCell>
                        <Badge variant={risk.priority === 'Critical' || risk.priority === 'High' ? 'destructive' : 'default'}>
                          {risk.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{risk.likelihood || 'N/A'}</TableCell>
                      <TableCell>{risk.impact || 'N/A'}</TableCell>
                      <TableCell>{risk.status}</TableCell>
                      <TableCell>{risk.owner_name || 'Unassigned'}</TableCell>
                      <TableCell>
                        {risk.assetCount > 0 ? (
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                              {risk.assetCount} {risk.assetCount === 1 ? 'asset' : 'assets'}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/assets?risk=${risk.id}`);
                              }}
                              className="text-xs"
                            >
                              View →
                            </Button>
                          </div>
                        ) : (
                          <span className="text-text-base-tertiary text-sm">No assets</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskRegister;
