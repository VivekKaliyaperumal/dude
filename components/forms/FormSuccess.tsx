import { formCopy } from "@/content/contact";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  body?: string;
  resetLabel: string;
  onReset: () => void;
  /** Centre vertically inside a tall card (quote form). */
  fill?: boolean;
  className?: string;
};

export function FormSuccess({ title, body, resetLabel, onReset, fill, className }: Props) {
  return (
    <div
      role="status"
      className={cn("animate-fade-in flex flex-col", fill && "min-h-[420px] justify-center", className)}
    >
      <Icon name="check-circle" size={40} className="text-green" />
      <h3 className="mt-5 text-[26px] font-bold tracking-[-.025em] text-ink">{title}</h3>
      {body ? <p className="mt-3 text-[15px] leading-[1.6] text-muted">{body}</p> : null}
      <p className="mt-[18px] font-mono text-xs tracking-[.08em] text-bronze">{formCopy.callLine}</p>
      <Button type="button" variant="outline" size="xs" onClick={onReset} className="mt-[26px] self-start text-[13px]">
        {resetLabel}
      </Button>
    </div>
  );
}
