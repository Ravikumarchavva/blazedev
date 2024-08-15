"use client";

import React, { ReactNode } from "react";
import { Role } from "@prisma/client";
import { FormError } from "@/components/Form-Error";
import { useCurrentRole } from "@/hooks/use-current-role";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const role = useCurrentRole();

  if (role !== Role.ADMIN) {
    return (
      <div className="h-screen flex items-center justify-center">
        <FormError message="You need Admin Privileges" />
      </div>
    );
  }

  return <>{children}</>;
};

export default Layout;
