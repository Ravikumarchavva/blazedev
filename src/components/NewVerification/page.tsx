"use client";
import React, { useCallback, useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import {BeatLoader} from "react-spinners";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { verification } from '@/actions/new-verification';
import { FormError } from '../Form-Error';
import { FormSuccess } from '../Form-Success';
const NewVerification = () => {
    const searchParams = useSearchParams();
    const [error,setError] = useState<string | undefined>();
    const [success,setSuccess] = useState<string | undefined>();
    const token = searchParams.get('token');
    const onSubmit = useCallback(async ()=>{
      if(success || error) return;
      if(!token){
        setError('Token is required');
        return;
      } 
      verification(token).then((data)=>{
        if(data.success){
          setSuccess(data.message);
        }else{
          setError(data.message);
        }
      });
    },[token,success,error]);
    useEffect(()=>{
        onSubmit();
    },[onSubmit])
  return (
    <div className="flex items-center justify-center min-h-screen pt-[10vh] dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background to-primary">

          <Card className="w-[400px] my-10">
            <CardHeader className="text-center">
              <CardTitle>Verification</CardTitle>
              <CardContent>Confirming your email</CardContent>
            </CardHeader>
            <CardContent className="space-y-2 w-full flex flex-col items-center justify-center">
                {!success && !error && <BeatLoader />}
                <FormSuccess message={success}/>
                {!success && <FormError message={error}/>}
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Link href='/login'>Back to Login</Link>
            </CardFooter>
          </Card>

    </div>
  )
}

export default NewVerification