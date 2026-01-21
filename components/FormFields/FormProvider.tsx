"use client";

import React, { ReactNode } from "react";
import { FormProvider as Form, UseFormReturn, FieldValues } from "react-hook-form";

// ----------------------------------------------------------------------

interface FormProviderProps<TFieldValues extends FieldValues> {
  children: ReactNode;
  methods: UseFormReturn<TFieldValues>;
  onSubmit?: (e?: React.BaseSyntheticEvent) => Promise<void> | void;
  className?: string;
}

export default function FormProvider<TFieldValues extends FieldValues>({
  children,
  onSubmit,
  methods,
  className,
}: FormProviderProps<TFieldValues>) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} className={className}>
        {children}
      </form>
    </Form>
  );
}