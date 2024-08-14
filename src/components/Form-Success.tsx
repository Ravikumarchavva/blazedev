import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
    message?: string
}

export  const FormSuccess = ({
    message,
}:FormSuccessProps)=>{
    if (!message) return null;
    return (
        <div className="bg-secondary/15 w-full text-secondary flex items-center pl-1 pr-2 gap-x-2 text-md rounded-sm">
            <CheckCircledIcon className="h-4 w-4"/>
            <p className="py-2">{message}</p>
        </div>
    )
}