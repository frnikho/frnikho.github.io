import { type ClassValue, clsx } from "clsx";
import * as React from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const Title = React.forwardRef<
	HTMLHeadingElement,
	React.ComponentProps<"h1">
>(({ className, ...props }, ref) => {
	return <h1 className={cn('text-[2em] lg:text-[3em] font-montserrat font-[700] leading-tight text-primary', className)} {...props} ref={ref}/>;
});

export const SubTitle = React.forwardRef<
    HTMLHeadingElement,
    React.ComponentProps<"h2">
>(({ className, ...props }, ref) => {
    return <h2 className={cn('text-[1.4em] lg:text-3xl font-montserrat font-[600] leading-tight text-primary', className)} {...props} ref={ref}/>;
});

export const Heading = React.forwardRef<
	HTMLHeadingElement,
	React.ComponentProps<"h3">
>(({ className, ...props }, ref) => {
	return <h3 className={cn('text-lg xl:text-2xl font-montserrat font-[600] leading-tight text-primary', className)} {...props} ref={ref}/>;
});

export const Text = React.forwardRef<
	HTMLHeadingElement,
	React.ComponentProps<"p">
>(({ className, ...props }, ref) => {
	return <p className={cn('font-nunito text-primary', className)} {...props} ref={ref}/>;
});

export const Container = React.forwardRef<
	HTMLDivElement,
	React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
	return <div className={cn('3xl:w-8/12 lg:w-10/12 w-11/12', className)} {...props} ref={ref}/>;
});

export const Button =  React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
	return <button className={cn('px-4 py-2 bg-[#FFFFFF] shadow-[0_8px_30px_rgb(0,0,0,0.06)] active:scale-[.95] rounded-3xl transition-all cursor-pointer', className)} {...props} ref={ref}/>;
});