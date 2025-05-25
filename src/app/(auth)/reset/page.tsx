import ResetForm from "@/components/ResetForm/page";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen pt-[10vh] dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background to-primary">
      <Card className="w-[400px] my-10">
        <CardHeader className="text-center">
          <CardTitle>Password Reset</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <ResetForm />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <p>
            Go back to login?{" "}
            <Link
              href={"./login"}
              className="text-secondary underline underline-offset-2"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
