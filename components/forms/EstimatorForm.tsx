"use client";

import { useActionState, useState } from "react";
import { submitEnquiry } from "@/app/actions/submit-enquiry";
import { estimatorProjectTypes, floorOptions, formCopy } from "@/content/contact";
import { estimatorCategories, estimatorDefaultCategories, type EstimatorCategory } from "@/content/materials";
import { site } from "@/content/site";
import { initialEnquiryState } from "@/lib/enquiry/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ConsentLine } from "./ConsentLine";
import { SelectField, TextField } from "./Field";
import { FormError } from "./FormError";
import { HiddenFields } from "./HiddenFields";
import { SubmitButton } from "./SubmitButton";

/** Two-step "Free Material Estimate" lead form (Home #resources). No calculation — a human replies. */
export function EstimatorForm() {
  const [key, setKey] = useState(0);
  return <EstimatorFormInner key={key} onReset={() => setKey((k) => k + 1)} />;
}

function EstimatorFormInner({ onReset }: { onReset: () => void }) {
  const [state, action] = useActionState(submitEnquiry, initialEnquiryState);
  const [picked, setPicked] = useState<ReadonlySet<EstimatorCategory>>(() => new Set(estimatorDefaultCategories));

  if (state.status === "ok") {
    return (
      <div role="status" className="animate-fade-in max-w-[62ch] p-[clamp(30px,5vw,68px)]">
        <Icon name="check-circle" size={40} className="text-green" />
        <h3 className="mt-5 text-h3 font-bold text-ink">{formCopy.estimate.successTitle}</h3>
        <p className="mt-3.5 text-sm leading-[1.6] text-muted">{formCopy.estimate.disclaimer}</p>
        <p className="mt-4 font-mono text-xs tracking-[.08em] text-bronze">{formCopy.callLine}</p>
        <Button type="button" variant="outline" size="xs" onClick={onReset} className="mt-6 text-[13px]">
          {formCopy.estimate.reset}
        </Button>
      </div>
    );
  }

  const errors = state.status === "error" ? (state.errors ?? {}) : {};
  const err = (field: string) => errors[field]?.[0];

  const toggle = (name: EstimatorCategory) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  return (
    <form
      action={action}
      className="grid"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}
    >
      <HiddenFields kind="estimate" />
      <div className="border-b border-line p-[clamp(22px,3vw,40px)] split:border-r split:border-b-0">
        <span className="block font-mono text-[10.5px] tracking-[.16em] text-muted">{formCopy.estimate.step1}</span>
        {state.status === "error" ? (
          <div className="mt-4">
            <FormError message={state.message} />
          </div>
        ) : null}
        <div
          className="mt-[18px] grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 215px), 1fr))" }}
        >
          <SelectField label="Project Type" name="projectType" options={estimatorProjectTypes} error={err("projectType")} />
          <TextField label="City / Location" name="city" placeholder="Bengaluru" autoComplete="address-level2" error={err("city")} />
          <TextField label="Plot Length (ft)" name="plotLengthFt" type="number" inputMode="decimal" min={1} placeholder="40" error={err("plotLengthFt")} />
          <TextField label="Plot Width (ft)" name="plotWidthFt" type="number" inputMode="decimal" min={1} placeholder="30" error={err("plotWidthFt")} />
          <SelectField label="Number of Floors" name="floors" options={floorOptions} error={err("floors")} />
          <TextField label="Built-up Area (sqft)" name="builtUpSqft" type="number" inputMode="numeric" min={1} placeholder="Approx." error={err("builtUpSqft")} />
          <TextField label="Sump Capacity" name="sumpCapacity" placeholder="Litres (optional)" error={err("sumpCapacity")} />
          <TextField label="Phone Number" name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="+91" error={err("phone")} />
        </div>
      </div>

      <div className="flex flex-col p-[clamp(22px,3vw,40px)]">
        <span id="est-categories-label" className="block font-mono text-[10.5px] tracking-[.16em] text-muted">
          {formCopy.estimate.step2}
        </span>
        <div role="group" aria-labelledby="est-categories-label" className="mt-[18px] flex flex-wrap gap-2">
          {estimatorCategories.map((name) => {
            const on = picked.has(name);
            return (
              <button
                key={name}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(name)}
                className={cn(
                  "min-h-11 border px-3.5 py-[9px] text-[12.5px] font-medium transition-colors duration-300 hover:border-green motion-reduce:transition-none",
                  on ? "border-green bg-green text-white" : "border-line-2 bg-card text-muted",
                )}
              >
                {name}
              </button>
            );
          })}
        </div>
        {/* Selected categories travel with the form; the defaults are pre-rendered so no-JS submissions still work. */}
        {[...picked].map((name) => (
          <input key={name} type="hidden" name="categories" value={name} />
        ))}
        {err("categories") ? <p className="mt-2 text-[12.5px] text-bronze">{err("categories")}</p> : null}
        <p className="mt-[22px] border-t border-line pt-[18px] text-[12.5px] leading-[1.6] text-muted">
          {formCopy.estimate.disclaimer}
        </p>
        <SubmitButton className="mt-auto w-full p-[18px] pt-[18px] pb-[18px]">{formCopy.estimate.submit}</SubmitButton>
        <p className="mt-3 text-center text-xs text-muted">
          {formCopy.estimate.footnote}{" "}
          <a href={site.phone.tel} className="text-green-deep">
            {site.phone.display}
          </a>
        </p>
        <ConsentLine className="mt-3 text-center" />
      </div>
    </form>
  );
}
