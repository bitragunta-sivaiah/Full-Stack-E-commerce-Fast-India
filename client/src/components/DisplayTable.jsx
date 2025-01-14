import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

const DisplayTable = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {/* This div will allow horizontal scrolling for small screens */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse px-0 py-0">
          <thead className="bg-primary-blue text-white">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                <th className="px-4 py-2 border-l border-gray-300 text-left">Sr.No</th>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-4 py-2 border-l border-gray-300 text-left text-sm sm:text-base"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="font-rubik">
            {table.getRowModel().rows.map((row, index) => (
              <tr key={row.id} className="even:bg-gray-50 hover:bg-gray-100">
                <td className="px-4 py-2 border-b border-gray-300">{row.index + 1}</td>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-2 border-b border-gray-300 text-sm sm:text-base">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayTable;
