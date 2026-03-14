import * as z from 'zod'
export const registerschema = z.object({
  name: z.string().nonempty('required').min(2, 'minimum 2 letters').max(30, 'max name length'),
  email: z.string().nonempty('required').email('invalid email'),
  phone: z
    .string()
    .nonempty("Phone number is required")
    .regex(
      /^01[0-2,5][0-9]{8}$/,
      "Phone number must be a valid Egyptian number"
    ),
  studentId: z.string()
    .min(6, { message: "Student ID must be at least 6 characters" })
    .max(12, { message: "Student ID cannot exceed 12 characters" })
    .regex(/^[0-9]+$/, { message: "Student ID must contain only numbers" }),

  date: z.string().nonempty("Date of birth is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, uppercase, lowercase, number, and special character"
    ),

  repassword: z.string().nonempty("Confirm password is required"),
  major: z.string().min(1, "Please select a major"),
  interests: z.array(z.string()).min(1, 'Select at least one interest'),
})
  .refine((data) => data.password === data.repassword, {
    message: "Passwords do not match",
    path: ["repassword"],
  });

export type registerschemaform = z.infer<typeof registerschema>