import React from 'react';



// DynamicTable Component: Renders an object's keys and values in a DaisyUI table.
const DynamicTable = ({ data }) => {
  // Ensure data is an object and not null/undefined
  if (!data || typeof data !== 'object') {
    return (
      <div className="alert alert-error shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Error: Invalid data provided. Please pass a valid object.</span>
        </div>
      </div>
    );
  }

  // Extract keys from the object to use as headers
  const keys = Object.keys(data);

  // Helper function to format values for display
  const formatValue = (value) => {
    if (typeof value === 'object' && value !== null) {
      // For objects or arrays, stringify them for display
      return <pre className="whitespace-pre-wrap break-all text-sm">{JSON.stringify(value, null, 2)}</pre>;
    }
    // For boolean values, display as 'true' or 'false'
    if (typeof value === 'boolean') {
      return value.toString();
    }
    // For other primitive types (string, number), display directly
    return value;
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-xl">
      <table className="table w-full table-zebra">
        {/* Table head */}
        <thead>
          <tr className="bg-primary text-primary-content">
            <th className="rounded-tl-lg">Key</th>
            <th className="rounded-tr-lg">Value</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {keys.length === 0 ? (
            <tr>
              <td colSpan="2" className="text-center py-4">No data available in the object.</td>
            </tr>
          ) : (
            keys.map((key, index) => (
              <tr key={key} className="hover:bg-base-300 transition-colors duration-200">
                <td className="font-medium text-info-content">{key}</td>
                <td className="text-base-content">{formatValue(data[key])}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
