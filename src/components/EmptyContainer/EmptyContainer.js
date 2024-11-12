import { Empty } from "antd";
import React from "react";

export default function EmptyContainer({ className, message }) {
  return (
    <div className={className}>
      <div>
        <Empty />
        <h4 className="mt-4 text-center text-xl font-semibold text-danger">
          {message}
        </h4>
      </div>
    </div>
  );
}
