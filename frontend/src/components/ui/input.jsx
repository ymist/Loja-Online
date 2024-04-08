import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				"focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-300 ease-in-out h-10 w-full rounded-md bg-gray500 px-3 py-2 text-sm placeholder-gray-500 font-medium",
				className,
			)}
			ref={ref}
			{...props}
		/>
	);
});
Input.displayName = "Input";

export { Input };
