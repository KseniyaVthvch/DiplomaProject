import React, { useEffect, useState } from "react";

export interface ImageBaseProps {
  file: string;
  type: string;
  className?: string;
}

const ImageBase = ({ file, type, className, ...props }: ImageBaseProps) => {
  const [base64Str, setBase64Str] = useState<string>();

  useEffect(() => {
    const byteCharacters = atob(file);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type });

    const fileFromBlob = new File([blob], "image", {
      type,
    });

    const reader = new FileReader();

    if (fileFromBlob) {
      reader.readAsDataURL(fileFromBlob);
      reader.onload = function () {
        setBase64Str(reader.result as string);
      };
    }
  }, [file, type]);

  return (
    <img src={base64Str} alt="" className={className} {...props} />
    // <img src={`data:${type};base64,${file}`}/>
  );
};

export default ImageBase;
