import { Table, type TableColumnsType, type TableProps } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import React from "react";

interface Props<T> extends TableProps<T> {
  dataSource?: T[];
  columns: TableColumnsType<T>;
  loading?: boolean;
  size?: SizeType;
  rowClassName?: string;
  paginationData?: any;
  setPaginationData?: (pagination: any) => void;
  total?: number;
}

function AppTable<T extends object>({
  columns,
  dataSource = [],
  loading,
  rowClassName,
  setPaginationData,
  paginationData,
  total,
  ...rest
}: Props<T>) {
  return (
    <div className="border border-gray-200 rounded-lg">
      <Table
        dataSource={dataSource?.map((item, index) => ({
          ...item,
          key: (item as { key?: React.Key }).key ?? index.toString(),
        }))} // Ensure each item has a key
        columns={columns}
        loading={loading}
        showHeader
        rowClassName={rowClassName}
        pagination={
          paginationData && total !== null
            ? {
                total,
                current: paginationData?.page,
                pageSize: paginationData?.pageSize,
                onChange(page, pageSize) {
                  setPaginationData?.({
                    page,
                    pageSize,
                  });
                },
              }
            : false
        }
        scroll={{ x: "max-content" }}
        {...rest}
      />
    </div>
  );
}

export default AppTable;
