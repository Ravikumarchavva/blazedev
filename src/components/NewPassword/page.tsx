"use client";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { FormError } from '../Form-Error';
import { FormSuccess } from '../Form-Success';
import PasswordRestForm from '../PasswordResetForm/page';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
export const NewPassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen pt-[10vh] dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background to-primary">

          <Card className="w-[400px] my-10">
            <CardHeader className="text-center">
              <CardTitle>Password Reset</CardTitle>
              <CardContent>Change your password</CardContent>
            </CardHeader>
            <CardContent className="space-y-2 w-full flex flex-col items-center justify-center">
                <PasswordRestForm />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Link href='/login'>Back to Login</Link>
            </CardFooter>
          </Card>

    </div>
  )
}