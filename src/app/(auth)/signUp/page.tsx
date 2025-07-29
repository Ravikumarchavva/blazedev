import { SignUpForm } from "@/components/client/page";
import SocialMediaLogin from "@/components/SocialMediaLogin/page";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen pt-[10vh] dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background to-primary">
      <Card className="w-[400px] mt-10 mb-10">
        <CardHeader className="text-center">
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <SignUpForm />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <p>Or</p>
          <SocialMediaLogin />
          <p>
            Already have an Account?{" "}
            <Link
              href={"./login"}
              className="text-secondary underline underline-offset-2"
            >
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
