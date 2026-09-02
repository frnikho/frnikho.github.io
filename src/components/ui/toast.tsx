import { AnimatePresence, motion } from "motion/react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

type ToastVariant = "success" | "error";

type ToastItem = {
	id: number;
	title: string;
	description?: string;
	variant: ToastVariant;
};

type ToastContextValue = {
	toasts: ToastItem[];
	addToast: (t: Omit<ToastItem, "id">) => void;
	removeToast: (id: number) => void;
	success: (title: string, description?: string) => void;
	error: (title: string, description?: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

let nextId = 1;

export function ToastProvider({ children }: { children: React.ReactNode }) {
	const [toasts, setToasts] = useState<ToastItem[]>([]);

	const removeToast = useCallback((id: number) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	}, []);

	const addToast = useCallback(
		(t: Omit<ToastItem, "id">) => {
			const id = nextId++;
			setToasts((prev) => [...prev, { ...t, id }]);
			// auto-dismiss handled in Toaster per item, but also fallback timeout here
			window.setTimeout(() => removeToast(id), 4000);
		},
		[removeToast],
	);

	const success = useCallback(
		(title: string, description?: string) =>
			addToast({ title, description, variant: "success" }),
		[addToast],
	);
	const error = useCallback(
		(title: string, description?: string) =>
			addToast({ title, description, variant: "error" }),
		[addToast],
	);

	return (
		<ToastContext.Provider
			value={{ toasts, addToast, removeToast, success, error }}
		>
			{children}
		</ToastContext.Provider>
	);
}

export function useToast() {
	const ctx = useContext(ToastContext);
	if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
	return ctx;
}

export function Toaster() {
	const ctx = useContext(ToastContext);
	if (!ctx) return null;
	const { toasts, removeToast } = ctx;

	return (
		<div className="fixed bottom-4 right-4 z-[90] flex flex-col gap-2 pointer-events-none max-w-[min(420px,calc(100vw-2rem))]">
			<AnimatePresence>
				{toasts.map((t) => (
					<ToastCard key={t.id} toast={t} onClose={() => removeToast(t.id)} />
				))}
			</AnimatePresence>
		</div>
	);
}

function ToastCard({
	toast,
	onClose,
}: {
	toast: ToastItem;
	onClose: () => void;
}) {
	const timerRef = useRef<number | undefined>(undefined);
	useEffect(() => {
		timerRef.current = window.setTimeout(onClose, 4000);
		return () => clearTimeout(timerRef.current);
	}, [onClose]);

	const isSuccess = toast.variant === "success";

	return (
		<motion.div
			initial={{ opacity: 0, y: 8, scale: 0.98 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, y: 8, scale: 0.98 }}
			transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
			role={isSuccess ? "status" : "alert"}
			aria-live={isSuccess ? "polite" : "assertive"}
			className={`pointer-events-auto rounded-xl border shadow-[0_16px_40px_rgba(12,46,61,0.18)] px-4 py-3 flex items-start gap-3 ${
				isSuccess
					? "bg-forest text-white border-forest"
					: "bg-white text-primary border-line"
			}`}
		>
			<span
				aria-hidden="true"
				className={`mt-0.5 w-7 h-7 rounded-full grid place-items-center text-[12px] font-bold shrink-0 ${
					isSuccess ? "bg-white text-forest" : "bg-accent text-white"
				}`}
			>
				{isSuccess ? "✓" : "!"}
			</span>
			<div className="flex-1 min-w-0">
				<p
					className={`font-display font-semibold text-sm leading-tight ${isSuccess ? "text-white" : "text-primary"}`}
				>
					{toast.title}
				</p>
				{toast.description ? (
					<p
						className={`mt-0.5 text-xs leading-snug ${isSuccess ? "text-white/80" : "opacity-60"}`}
					>
						{toast.description}
					</p>
				) : null}
			</div>
			<button
				type="button"
				onClick={onClose}
				aria-label="Fermer la notification"
				className={`w-7 h-7 rounded-full grid place-items-center shrink-0 transition ${isSuccess ? "hover:bg-white/15 text-white" : "hover:bg-paper text-primary/60 hover:text-primary"}`}
			>
				✕
			</button>
		</motion.div>
	);
}
