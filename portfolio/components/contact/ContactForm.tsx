"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  contactFormSchema,
  budgetRanges,
  type ContactFormData,
} from "@/lib/validations/contact";
import {
  submitContactForm,
  type ContactFormState,
} from "@/lib/actions/contact";
import { cn } from "@/lib/utils";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  },
};

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState<ContactFormState | null>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      budget: "",
      message: "",
      website: "", // Honeypot field
    },
  });

  const onSubmit = (data: ContactFormData) => {
    startTransition(async () => {
      const result = await submitContactForm(data);
      setFormState(result);

      if (result.success) {
        form.reset();
      }
    });
  };

  // Success state
  if (formState?.success) {
    return (
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="relative p-8 sm:p-10 rounded-2xl bg-linear-to-b from-white/3 to-transparent border border-white/10 backdrop-blur-sm"
      >
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">Message sent!</h3>
          <p className="text-sm text-blue-100/60 mb-6">{formState.message}</p>
          <Button
            variant="ghost"
            onClick={() => setFormState(null)}
            className="text-blue-400 hover:text-blue-300"
          >
            Send another message
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={itemVariants}
      className="relative p-6 sm:p-8 lg:p-10 rounded-2xl bg-linear-to-b from-white/3 to-transparent border border-white/10 backdrop-blur-sm shadow-2xl shadow-black/20"
    >
      {/* Subtle glow effect */}
      <div className="absolute -inset-px rounded-2xl bg-linear-to-b from-blue-500/10 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Error Banner */}
          {formState && !formState.success && (
            <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <p className="text-sm text-red-300">{formState.message}</p>
            </div>
          )}

          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-blue-100/80">
                  Full Name <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    className={cn(
                      "bg-white/5 border-white/10 text-white placeholder:text-gray-500",
                      "focus:border-blue-500/50 focus:ring-blue-500/20",
                      "hover:border-white/20 transition-colors"
                    )}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-blue-100/80">
                  Email <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@company.com"
                    {...field}
                    className={cn(
                      "bg-white/5 border-white/10 text-white placeholder:text-gray-500",
                      "focus:border-blue-500/50 focus:ring-blue-500/20",
                      "hover:border-white/20 transition-colors"
                    )}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Company / Project */}
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-blue-100/80">
                  Company / Project
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your company or project name"
                    {...field}
                    className={cn(
                      "bg-white/5 border-white/10 text-white placeholder:text-gray-500",
                      "focus:border-blue-500/50 focus:ring-blue-500/20",
                      "hover:border-white/20 transition-colors"
                    )}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Budget Range */}
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-blue-100/80">
                  Budget Range
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={cn(
                        "bg-white/5 border-white/10 text-white",
                        "focus:border-blue-500/50 focus:ring-blue-500/20",
                        "hover:border-white/20 transition-colors",
                        "[&>span]:data-placeholder:text-gray-500"
                      )}
                    >
                      <SelectValue placeholder="Select a range (optional)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-muted border-white/10">
                    {budgetRanges.map((range) => (
                      <SelectItem
                        key={range.value}
                        value={range.value}
                        className="text-white focus:bg-blue-500/20 focus:text-white"
                      >
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-blue-100/80">
                  Message <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your project, goals, and timeline..."
                    rows={5}
                    {...field}
                    className={cn(
                      "bg-white/5 border-white/10 text-white placeholder:text-gray-500 resize-none",
                      "focus:border-blue-500/50 focus:ring-blue-500/20",
                      "hover:border-white/20 transition-colors"
                    )}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Honeypot - Hidden from users, visible to bots */}
          <div className="sr-only" aria-hidden="true">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending}
            size="lg"
            className={cn(
              "w-full relative overflow-hidden",
              "bg-linear-to-r from-blue-600 via-blue-500 to-cyan-500",
              "hover:from-blue-500 hover:via-blue-400 hover:to-cyan-400",
              "text-white font-semibold",
              "shadow-lg shadow-blue-500/20",
              "transition-all duration-300",
              "disabled:opacity-70 disabled:cursor-not-allowed"
            )}
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
