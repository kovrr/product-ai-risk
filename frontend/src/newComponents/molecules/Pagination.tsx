import * as React from 'react';
import { Button } from '@/newComponents/atoms/button';

type Props = {
  pageIndex: number;
  pageSize: number;
  totalCount?: number;
  setPageIndex: (n: number) => void;
  setPageSize?: (n: number) => void;
};

export const Pagination: React.FC<Props> = ({ pageIndex, pageSize, totalCount, setPageIndex }) => {
  const totalPages = totalCount ? Math.max(1, Math.ceil(totalCount / pageSize)) : undefined;
  return (
    <div className="flex items-center justify-end gap-sm py-sm">
      <Button variant="secondary" disabled={pageIndex === 0} onClick={() => setPageIndex(pageIndex - 1)}>
        Prev
      </Button>
      {typeof totalPages === 'number' ? <span className="text-sm">{pageIndex + 1} / {totalPages}</span> : <span className="text-sm">Page {pageIndex + 1}</span>}
      <Button variant="secondary" disabled={typeof totalPages === 'number' && pageIndex + 1 >= totalPages} onClick={() => setPageIndex(pageIndex + 1)}>
        Next
      </Button>
    </div>
  );
};


