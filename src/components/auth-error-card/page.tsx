import React from "react";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import Link from "next/link";

const AuthErrorCard = () => {
  return (
    <Card className="bg-primary">
      <CardHeader>Authentication Error</CardHeader>
      <CardFooter>
        <Link href="/login" className="underline-offset-2 underline">
          Please log in again.
        </Link>
      </CardFooter>
    </Card>
  );
};

export default AuthErrorCard;
