import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
    message?: string
}

export  const FormError = ({
    message,
}:FormErrorProps)=>{
    if (!message) return null;
    return (
        <div className="bg-destructive/15 text-destructive flex items-center pl-1 gap-x-2 text-md rounded-sm">
            <ExclamationTriangleIcon className="h-4 w-4"/>
            <p className="py-2">{message}</p>
        </div>
    )
}