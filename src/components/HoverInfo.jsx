"use client"; // Mark as Client Component for interactivity

import React, { useState } from 'react';

// Main App component to demonstrate the HoverInfo component
//  function Temp() {
//   // Example user data to display in the tooltip
//   const userInfo = {
//     fullName: "Anas Khan",
//     email: "anas@test.com",
//     role: "Admin",
//     department: "IT",
//     lastLogin: "2025-07-22 16:25:49",
//   };

//   const productInfo = {
//     name: "Wireless Earbuds",
//     model: "XYZ-Pro",
//     price: "$99.99",
//     stock: "In Stock (500 units)",
//     features: "Active Noise Cancellation, 10hr Battery, Bluetooth 5.3",
//   };

//   return (
//     <div className="p-8 bg-base-200 min-h-screen flex flex-col items-center justify-center font-inter">
//       <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
//         Hover Info Examples
//       </h1>

//       <div className="flex flex-col md:flex-row gap-12">
//         {/* Example 1: User Info on Username Hover */}
//         <div className="card bg-base-100 shadow-xl p-6 rounded-lg text-center">
//           <h2 className="text-xl font-semibold mb-4 text-secondary">User Information</h2>
//           <HoverInfo
//             trigger={
//               <span className="text-primary-content text-lg font-medium cursor-pointer link link-hover">
//                 Hover over Anas
//               </span>
//             }
//             infoContent={
//               <div className="p-4 text-sm text-base-content bg-base-100 rounded-lg shadow-lg max-w-xs">
//                 <p className="font-bold mb-1 text-info">{userInfo.fullName}</p>
//                 <p>Email: {userInfo.email}</p>
//                 <p>Role: {userInfo.role}</p>
//                 <p>Department: {userInfo.department}</p>
//                 <p>Last Login: {userInfo.lastLogin}</p>
//               </div>
//             }
//             position="bottom" // You can change position: top, bottom, left, right
//           />
//         </div>

//         {/* Example 2: Product Info on Product Name Hover */}
//         <div className="card bg-base-100 shadow-xl p-6 rounded-lg text-center">
//           <h2 className="text-xl font-semibold mb-4 text-secondary">Product Details</h2>
//           <HoverInfo
//             trigger={
//               <span className="text-primary-content text-lg font-medium cursor-pointer link link-hover">
//                 Hover over Product
//               </span>
//             }
//             infoContent={
//               <div className="p-4 text-sm text-base-content bg-base-100 rounded-lg shadow-lg max-w-xs">
//                 <p className="font-bold mb-1 text-info">{productInfo.name}</p>
//                 <p>Model: {productInfo.model}</p>
//                 <p>Price: {productInfo.price}</p>
//                 <p>Stock: {productInfo.stock}</p>
//                 <p>Features: {productInfo.features}</p>
//               </div>
//             }
//             position="top" // Different position
//           />
//         </div>

//         {/* Example 3: Simple Text Hover */}
//         <div className="card bg-base-100 shadow-xl p-6 rounded-lg text-center">
//           <h2 className="text-xl font-semibold mb-4 text-secondary">Simple Hover</h2>
//           <HoverInfo
//             trigger={
//               <button className="btn btn-info rounded-md">
//                 Hover Me!
//               </button>
//             }
//             infoContent={
//               <span className="text-sm">This is a simple tooltip message.</span>
//             }
//             position="right"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// HoverInfo Component: Displays info content on hover over trigger content.
const HoverInfo = ({ trigger, infoContent, position = 'top' }) => {
  // DaisyUI's tooltip component handles the hover logic automatically.
  // The 'data-tip' attribute is used for simple text tooltips.
  // For complex content, we put the trigger inside the tooltip container
  // and the content directly as children, using the DaisyUI structure.

  // The 'tooltip' class creates the tooltip effect.
  // 'tooltip-open' can force it open (not needed for hover).
  // 'tooltip-bottom', 'tooltip-left', etc., control position.

  // We are using the structure where the trigger is the direct child
  // and the content is placed inside the 'tooltip' element itself,
  // making it dynamic.

  // DaisyUI tooltip structure:
  // <div class="tooltip tooltip-open" data-tip="hello">
  //   <button class="btn">Hover me</button>
  // </div>
  // This structure is for simple text. For custom content, we need to wrap
  // the trigger with the tooltip class, and the content will be the tooltip's
  // "data-tip" but rendered dynamically.

  // A more flexible approach for custom content is to use a state-based
  // approach or rely on a library that gives more control, but for DaisyUI's
  // native tooltip, it's primarily for simple text.

  // Let's adapt to a common pattern for custom tooltips with Tailwind/DaisyUI,
  // which involves managing visibility with state or using a popover library.
  // However, since the request specifically mentions "just like the tooltip in daisy ui",
  // we'll stick to the native DaisyUI tooltip class for its simplicity,
  // understanding its limitations for truly rich, interactive content *inside* the tooltip.

  // For truly complex, interactive hover cards, you'd typically use a headless UI library
  // like Radix UI's Popover or Tooltip primitives, combined with Tailwind for styling.
  // But for a "div like tooltip" as requested, we can simulate it by making the tooltip
  // content itself a div, though it will still behave like a native tooltip.

  // Re-evaluating the DaisyUI tooltip structure:
  // The standard DaisyUI tooltip uses `data-tip` for its content.
  // To show a *div* as the tooltip content, we need to use a different approach,
  // often involving managing visibility with state or using a dedicated popover/tooltip library.
  // DaisyUI's native `tooltip` class is primarily for simple text via `data-tip`.

  // If the user wants a *custom div* that appears on hover,
  // we need to build it manually with React state and Tailwind CSS,
  // or use a more advanced headless UI library.

  // Let's create a custom hover effect using `useState` and Tailwind's `group` utility
  // to achieve the "div like tooltip" behavior. This gives full control over the content.

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative inline-block" // Essential for positioning the infoContent
      onMouseEnter={() => setIsHovered(true)}
    //   onMouseLeave={() => setIsHovered(false)}
    >
      {trigger}
      {isHovered && (
        <div
          className={`absolute z-50 p-2 rounded-lg shadow-xl bg-base-300 text-base-content
            ${position === 'top' && 'bottom-full left-1/2 -translate-x-1/2 mb-2'}
            ${position === 'bottom' && 'top-full left-1/2 -translate-x-1/2 mt-2'}
            ${position === 'left' && 'right-full top-1/2 -translate-y-1/2 mr-2'}
            ${position === 'right' && 'left-full top-1/2 -translate-y-1/2 ml-2'}
            transition-opacity duration-200 ease-in-out opacity-100
          `}
          // You can add more styling to infoContent itself via its prop
        >
          {infoContent}
        </div>
      )}
    </div>
  );
};
export default HoverInfo;