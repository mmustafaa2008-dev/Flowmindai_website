"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { automationInterestOptions, contactApiRequestSchema } from "@/lib/validation/contact";
import type { ContactApiRequest } from "@/lib/validation/contact";

const inputClasses = cn(
  "bg-surface/50 border-border text-foreground placeholder:text-text-muted",
  "min-h-11 w-full rounded-md border px-4 py-3 text-sm outline-none transition-colors",
  "focus:border-primary focus:ring-primary/50 focus:ring-1",
);

const labelClasses = "font-body text-text-secondary text-sm font-medium";

/** Overall submission lifecycle, independent of RHF's per-request `isSubmitting`. */
type SubmissionStatus = "idle" | "success" | "error";

/**
 * Contact form — Client Component (the only interactive piece of the
 * Contact section) because React Hook Form + fetch need client state.
 *
 * Phase 9: submits validated data to `POST /api/contact`. The form is
 * resolved against `contactApiRequestSchema` — the exact same schema the
 * server re-validates against — which is `contactFormSchema` plus the
 * honeypot field, so the honeypot is a normal (if hidden) registered RHF
 * field rather than a ref read during render. Client validation is a UX
 * convenience only; the server never trusts it as the security boundary.
 */
export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactApiRequest>({
    resolver: zodResolver(contactApiRequestSchema),
    mode: "onBlur",
    defaultValues: { honeypot: "" },
  });

  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const nameId = useId();
  const companyId = useId();
  const emailId = useId();
  const websiteId = useId();
  const automationId = useId();
  const messageId = useId();
  const honeypotId = useId();

  async function onSubmit(values: ContactApiRequest) {
    setStatus("idle");
    setStatusMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result: {
        ok: boolean;
        error?: string;
        fieldErrors?: Partial<Record<keyof ContactApiRequest, string[]>>;
      } = await response.json();

      if (!response.ok || !result.ok) {
        // Surface server-side field errors if the server caught something
        // the client resolver didn't (e.g. a stale client bundle).
        if (result.fieldErrors) {
          for (const [field, messages] of Object.entries(result.fieldErrors)) {
            if (messages?.[0]) {
              setError(field as keyof ContactApiRequest, { message: messages[0] });
            }
          }
        }

        setStatus("error");
        setStatusMessage(
          result.error ??
            "We couldn't send your inquiry right now. Please try again or contact FlowMind AI directly.",
        );
        return;
      }

      setStatus("success");
      setStatusMessage(
        "Thanks — your inquiry has been sent. FlowMind AI will get back to you soon.",
      );
      reset();
    } catch {
      // Network failure — the request never reached the server, so keep
      // the user's entered data exactly as-is.
      setStatus("error");
      setStatusMessage(
        "We couldn't send your inquiry right now. Please check your connection and try again, or contact FlowMind AI directly.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {/* Honeypot — hidden from sighted users and assistive tech alike,
          removed from the tab order, and never autofocused. Real visitors
          never interact with it; bots that blindly fill every input do,
          and get flagged server-side. Deliberately not `type="hidden"`,
          since some bots specifically skip hidden inputs but still fill
          visible-looking ones — this stays a real text input, just
          positioned off-screen. A normal RHF-registered field (not a
          ref read during render), matching the shared API schema. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={honeypotId}>Phone Number</label>
        <input
          id={honeypotId}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("honeypot")}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={nameId} className={labelClasses}>
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id={nameId}
            type="text"
            placeholder="John Doe"
            autoComplete="name"
            aria-required="true"
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? `${nameId}-error` : undefined}
            className={cn(inputClasses, errors.name && "border-danger focus:border-danger")}
            {...register("name")}
          />
          <FieldError id={`${nameId}-error`} message={errors.name?.message} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={companyId} className={labelClasses}>
            Business / Company <span aria-hidden="true">*</span>
          </label>
          <input
            id={companyId}
            type="text"
            placeholder="Acme Corp"
            autoComplete="organization"
            aria-required="true"
            aria-invalid={errors.company ? "true" : undefined}
            aria-describedby={errors.company ? `${companyId}-error` : undefined}
            className={cn(inputClasses, errors.company && "border-danger focus:border-danger")}
            {...register("company")}
          />
          <FieldError id={`${companyId}-error`} message={errors.company?.message} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={emailId} className={labelClasses}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id={emailId}
            type="email"
            placeholder="john@example.com"
            autoComplete="email"
            aria-required="true"
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? `${emailId}-error` : undefined}
            className={cn(inputClasses, errors.email && "border-danger focus:border-danger")}
            {...register("email")}
          />
          <FieldError id={`${emailId}-error`} message={errors.email?.message} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={websiteId} className={labelClasses}>
            Website
          </label>
          <input
            id={websiteId}
            type="text"
            placeholder="example.com"
            autoComplete="url"
            aria-invalid={errors.website ? "true" : undefined}
            aria-describedby={errors.website ? `${websiteId}-error` : undefined}
            className={cn(inputClasses, errors.website && "border-danger focus:border-danger")}
            {...register("website")}
          />
          <FieldError id={`${websiteId}-error`} message={errors.website?.message} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={automationId} className={labelClasses}>
          What do you want to automate? <span aria-hidden="true">*</span>
        </label>
        <select
          id={automationId}
          defaultValue=""
          aria-required="true"
          aria-invalid={errors.automationInterest ? "true" : undefined}
          aria-describedby={errors.automationInterest ? `${automationId}-error` : undefined}
          className={cn(
            inputClasses,
            "appearance-none",
            errors.automationInterest && "border-danger focus:border-danger",
          )}
          {...register("automationInterest")}
        >
          <option value="" disabled>
            Select an option
          </option>
          {automationInterestOptions.map((option) => (
            <option key={option} value={option} className="bg-surface">
              {option}
            </option>
          ))}
        </select>
        <FieldError id={`${automationId}-error`} message={errors.automationInterest?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={messageId} className={labelClasses}>
          Message / Requirements <span aria-hidden="true">*</span>
        </label>
        <textarea
          id={messageId}
          rows={4}
          placeholder="Tell us about your current workflow challenges..."
          aria-required="true"
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? `${messageId}-error` : undefined}
          className={cn(
            inputClasses,
            "resize-none",
            errors.message && "border-danger focus:border-danger",
          )}
          {...register("message")}
        />
        <FieldError id={`${messageId}-error`} message={errors.message?.message} />
      </div>

      <Button type="submit" variant="primary" disabled={isSubmitting} className="mt-2 w-full">
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>

      {/* Announces submission outcome to everyone, not just sighted users.
          Empty on idle — never pre-populated with a fake "sent" message. */}
      <div aria-live="polite" className="min-h-5">
        {status === "success" ? (
          <p className="text-secondary flex items-center gap-1.5 text-sm">
            <CheckCircle2 aria-hidden="true" className="h-4 w-4 shrink-0" />
            {statusMessage}
          </p>
        ) : null}
        {status === "error" ? (
          <p role="alert" className="text-danger flex items-center gap-1.5 text-sm">
            <AlertCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
            {statusMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} role="alert" className="text-danger flex items-center gap-1.5 text-xs">
      <AlertCircle aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
      {message}
    </p>
  );
}
