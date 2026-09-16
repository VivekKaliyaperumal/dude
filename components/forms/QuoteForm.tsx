"use client";

import { useActionState, useState } from "react";
import { submitEnquiry } from "@/app/actions/submit-enquiry";
import { formCopy, projectTypes } from "@/content/contact";
import { site } from "@/content/site";
import { initialEnquiryState } from "@/lib/enquiry/types";
import { ConsentLine } from "./ConsentLine";
import { SelectField, TextareaField, TextField } from "./Field";
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";
import { HiddenFields } from "./HiddenFields";
import { SubmitButton } from "./SubmitButton";

type Props = { tall?: boolean };

/** "Request Free Quote" form (Home #quote and Contact #quote). Remounts on reset. */
export function QuoteForm(props: Props) {
  const [key, setKey] = useState(0);
  return <QuoteFormInner key={key} {...props} onReset={() => setKey((k) => k + 1)} />;
}

function QuoteFormInner({ tall, onReset }: Props & { onReset: () => void }) {
  const [state, action] = useActionState(submitEnquiry, initialEnquiryState);

  if (state.status === "ok") {
    return (
      <FormSuccess
        fill
        title={formCopy.quote.successTitle}
        body={formCopy.quote.successBody}
        resetLabel={formCopy.quote.reset}
        onReset={onReset}
      />
    );
  }

  const errors = state.status === "error" ? (state.errors ?? {}) : {};
  const err = (field: string) => errors[field]?.[0];

  return (
    <form action={action}>
      <HiddenFields kind="quote" />
      {state.status === "error" ? <FormError message={state.message} /> : null}
      <div className="grid gap-4 tight:grid-cols-2">
        <TextField label="Name" name="name" required autoComplete="name" error={err("name")} tall={tall} />
        <TextField
          label="Phone Number"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          placeholder="+91"
          error={err("phone")}
          tall={tall}
        />
        <TextField label="Location" name="location" autoComplete="address-level2" error={err("location")} tall={tall} />
        <SelectField label="Project Type" name="projectType" placeholder="Select" options={projectTypes} error={err("projectType")} tall={tall} />
        <TextField label="Material Required" name="material" error={err("material")} tall={tall} />
        <TextField label="Approximate Quantity" name="quantity" error={err("quantity")} tall={tall} />
      </div>
      <TextField className="mt-4" label="Delivery Location" name="deliveryLocation" error={err("deliveryLocation")} tall={tall} />
      <TextareaField className="mt-4" label="Message" name="message" rows={5} error={err("message")} />
      <SubmitButton arrow className="mt-6 h-[50px] px-7">
        {formCopy.quote.submit}
      </SubmitButton>
      <p className="mt-[22px] text-sm text-muted">
        {formCopy.prefer}{" "}
        <a href={site.phone.tel} className="font-medium text-ink">
          {site.phone.display}
        </a>
      </p>
      <ConsentLine className="mt-4" />
    </form>
  );
}
