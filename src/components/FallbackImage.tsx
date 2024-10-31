// import Image, {ImageProps} from "next/image";
// import React, {useState} from "react";
//
// type Props = {
//     src: string,
//     alt: string,
// } & Omit<React.HTMLProps<ImageProps>, 'src'>;
//
// export default function FallbackImage({src, alt, ...props}: Props) {
//
//     const [error, setError] = useState(false);
//
//     return (
//         <Image {...props} src={error ? '' : src} alt={alt} onError={() => setError(true)}/>
//     )
// }