import Nav from "@/components/Navbar/Nav";
import "./globals.css";
import { Toaster } from 'react-hot-toast'
import { UserProvider } from "@/lib/context/userContext";
import ReduxProvider from "@/components/ReduxProvider";
import AuthWrapper from "@/components/AuthWrapper";
// import cally from 'cally'
export const metadata = {
  title: "HRM",
  description: " Manage everything and anything in one place. This is humane resource management system where you can manage your employees and their related actions.",
};

export default function RootLayout({ children }) {

  return (
    <html data-theme="lofi" lang="en">
      <body >
        <ReduxProvider>
          <UserProvider>
            <Nav />
            {children}
            <Toaster position="top-right" />
          </UserProvider>
        </ReduxProvider>

      </body>
    </html>
  );
}

// edit employee
// edit user
// leaveBalance on accepting leave 
      // on approve:
      //          - calculate number of days
      //          - 
// Admin visits the "Activity Log" screen: AuditLog model
