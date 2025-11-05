import * as React from 'react';
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef, type Table as TableType } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/newComponents/atoms/table';
import { Pagination } from '@/newComponents/molecules/Pagination';

export type PaginationProps = {
  pageCount: number;
  pageSize: number;
  pageIndex: number;
  setPageIndex: (n: number) => void;
  setPageSize?: (n: number) => void;
  totalCount?: number;
  currentPageSize?: number;
};

type Props<TData> = {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  pagination: PaginationProps;
  isLoading?: boolean;
  isFetching?: boolean;
};

export function DataTable<TData>({ columns, data, pagination, isLoading, isFetching }: Props<TData>) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
  return (
    <div className="space-y-sm">
      <div className="rounded-[20px] border border-border bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length}>Loading...</TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>No results</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        setPageIndex={pagination.setPageIndex}
        totalCount={pagination.totalCount}
      />
    </div>
  );
}


