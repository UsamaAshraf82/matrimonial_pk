import * as React from "react";
import { Text, TextInput, type TextInputProps } from "react-native";
import { cn } from "~/lib/utils";

function Input({
  className,
  error,
  placeholderClassName,
  ...props
}: TextInputProps & {
  error?: string;
  ref?: React.RefObject<TextInput>;
}) {
  return (
    <>
      <TextInput
        className={cn(
          "w-full py-3  rounded-xl border border-gray-300 bg-white px-3 text-base text-black   ",
          "placeholder:text-gray-400",
          props.editable === false && "opacity-50 web:cursor-not-allowed",
          className
        )}
        placeholderClassName={cn("text-gray-500", placeholderClassName)}
        {...props}
      />
      {error && <Text className="text-red-500 mb-3">{error}</Text>}
    </>
  );
}

export { Input };
