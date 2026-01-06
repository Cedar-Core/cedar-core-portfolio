"use server";

import {
  contactFormSchema,
  type ContactFormData,
} from "@/lib/validations/contact";

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: Partial<Record<keyof ContactFormData, string[]>>;
};

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactFormState> {
  // Validate input server-side
  const validationResult = contactFormSchema.safeParse(data);

  if (!validationResult.success) {
    const fieldErrors: Partial<Record<keyof ContactFormData, string[]>> = {};
    for (const issue of validationResult.error.issues) {
      const field = issue.path[0] as keyof ContactFormData;
      if (!fieldErrors[field]) {
        fieldErrors[field] = [];
      }
      fieldErrors[field]!.push(issue.message);
    }
    return {
      success: false,
      message: "Please check the form for errors.",
      errors: fieldErrors,
    };
  }

  const validData = validationResult.data;

  // Anti-spam: Check honeypot field
  if (validData.website && validData.website.length > 0) {
    // Silently succeed for bots (don't let them know they failed)
    console.log("[Contact Form] Honeypot triggered - likely spam");
    return {
      success: true,
      message: "Message sent. We'll reply soon.",
    };
  }

  try {
    // Log the submission in development
    console.log("[Contact Form] New submission:", {
      fullName: validData.fullName,
      email: validData.email,
      company: validData.company || "(not provided)",
      budget: validData.budget || "(not provided)",
      messageLength: validData.message.length,
      timestamp: new Date().toISOString(),
    });

    // TODO: Integrate email service (Resend, SendGrid, etc.)
    // Example with Resend:
    // -------------------------------------------------
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    //
    // await resend.emails.send({
    //   from: 'Cedar Core <noreply@cedarcore.io>',
    //   to: ['team@cedarcore.io'],
    //   subject: `New Contact: ${validData.fullName}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${validData.fullName}</p>
    //     <p><strong>Email:</strong> ${validData.email}</p>
    //     <p><strong>Company:</strong> ${validData.company || 'N/A'}</p>
    //     <p><strong>Budget:</strong> ${validData.budget || 'N/A'}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${validData.message}</p>
    //   `,
    // });
    // -------------------------------------------------

    // TODO: Save to database if Prisma/DB is configured
    // Example:
    // -------------------------------------------------
    // import { prisma } from '@/lib/db';
    // await prisma.contactSubmission.create({
    //   data: {
    //     fullName: validData.fullName,
    //     email: validData.email,
    //     company: validData.company,
    //     budget: validData.budget,
    //     message: validData.message,
    //   },
    // });
    // -------------------------------------------------

    // Simulate processing delay (remove in production)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      message: "Message sent. We'll reply soon.",
    };
  } catch (error) {
    console.error("[Contact Form] Submission error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
