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

/** "Send Enquiry" form (Contact #contact). Remounts on reset. */
export function ContactForm() {
  const [key, setKey] = useState(0);
  return <ContactFormInner key={key} onReset={() => setKey((k) => k + 1)} />;
}

function ContactFormInner({ onReset }: { onReset: () => void }) {
  const [state, action] = useActionState(submitEnquiry, initialEnquiryState);

  if (state.status === "ok") {
    return (
      <FormSuccess
        title={formCopy.contact.successTitle}
        body={formCopy.contact.successBody}
        resetLabel={formCopy.contact.reset}
        onReset={onReset}
      />
    );
  }

  const errors = state.status === "error" ? (state.errors ?? {}) : {};
  const err = (field: string) => errors[field]?.[0];

  return (
    <form action={action}>
      <HiddenFields kind="contact" />
      {state.status === "error" ? <FormError message={state.message} /> : null}
      <div className="grid gap-4 tight:grid-cols-2">
        <TextField label="Name" name="name" required autoComplete="name" error={err("name")} />
        <TextField label="Phone Number" name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="+91" error={err("phone")} />
        <TextField label="Email" name="email" type="email" autoComplete="email" error={err("email")} />
        <SelectField label="Project Type" name="projectType" placeholder="Select" options={projectTypes} error={err("projectType")} />
        <TextField label="Location" name="location" autoComplete="address-level2" error={err("location")} />
        <TextField label="Material / Service Required" name="requirement" error={err("requirement")} />
      </div>
      <TextareaField className="mt-4" label="Message" name="message" rows={5} error={err("message")} />
      <SubmitButton arrow className="mt-6 h-[50px] px-7">
        {formCopy.contact.submit}
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
