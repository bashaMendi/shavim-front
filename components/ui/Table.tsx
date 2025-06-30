// components/ui/Table.tsx
import React, { ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
}

export function Table({ children }: TableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200" role="table">
        {children}
      </table>
    </div>
  );
}

Table.Head = function TableHead({ children }: { children: ReactNode }) {
  return <thead className="bg-gray-50">{children}</thead>;
};

Table.Body = function TableBody({ children }: { children: ReactNode }) {
  return <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>;
};

Table.Row = function TableRow({ children }: { children: ReactNode }) {
  return <tr>{children}</tr>;
};

Table.Cell = function TableCell({ children }: { children: ReactNode }) {
  return <td className="px-6 py-4 whitespace-nowrap">{children}</td>;
};

Table.HeaderCell = function TableHeaderCell({ children }: { children: ReactNode }) {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      {children}
    </th>
  );
};
