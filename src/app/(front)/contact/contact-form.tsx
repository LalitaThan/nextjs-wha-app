"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle, Mail, Phone, Clock } from "lucide-react"
import { toast } from "sonner"
import { 
  Field, 
  FieldLabel, 
  FieldContent, 
  FieldError 
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact"

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isPending, isPendingState] = useTransition()

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: ContactFormValues) {
    isPendingState(async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })

        const result = await response.json()

        if (!response.ok || !result.success) {
          throw new Error(result.error || "เกิดข้อผิดพลาดในการส่งข้อความ")
        }

        toast.success("ส่งข้อความสำเร็จแล้ว เราจะติดต่อกลับโดยเร็วที่สุด")
        setIsSubmitted(true)
        form.reset()
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "เกิดข้อผิดพลาด"
        toast.error(errorMessage)
      }
    })
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-8">
        <CheckCircle className="w-12 h-12 text-green-500" />
        <h3 className="text-xl font-semibold">ส่งข้อความสำเร็จ!</h3>
        <p className="text-muted-foreground">
          ขอบคุณที่ติดต่อเรา เราได้รับข้อความของคุณแล้วและจะติดต่อกลับโดยเร็วที่สุด
        </p>
        <Button 
          variant="outline" 
          onClick={() => setIsSubmitted(false)}
          className="mt-4"
        >
          ส่งข้อความอีกครั้ง
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Field
        data-invalid={!!form.formState.errors.name}
        className="gap-2"
      >
        <FieldLabel>ชื่อ</FieldLabel>
        <FieldContent>
          <Input 
            {...form.register("name")} 
            placeholder="กรอกชื่อของคุณ" 
          />
          <FieldError />
          {form.formState.errors.name && (
            <span className="text-sm text-destructive">
              {form.formState.errors.name.message}
            </span>
          )}
        </FieldContent>
      </Field>

      <Field
        data-invalid={!!form.formState.errors.email}
        className="gap-2"
      >
        <FieldLabel>Email</FieldLabel>
        <FieldContent>
          <Input 
            {...form.register("email")} 
            type="email" 
            placeholder="example@email.com" 
          />
          <FieldError />
          {form.formState.errors.email && (
            <span className="text-sm text-destructive">
              {form.formState.errors.email.message}
            </span>
          )}
        </FieldContent>
      </Field>

      <Field
        data-invalid={!!form.formState.errors.message}
        className="gap-2"
      >
        <FieldLabel>ข้อความ</FieldLabel>
        <FieldContent>
          <Textarea 
            {...form.register("message")} 
            rows={5} 
            placeholder="พิมพ์ข้อความที่ต้องการ..." 
          />
          <FieldError />
          {form.formState.errors.message && (
            <span className="text-sm text-destructive">
              {form.formState.errors.message.message}
            </span>
          )}
        </FieldContent>
      </Field>

      <Button 
        type="submit" 
        className="w-full" 
        disabled={isPending}
      >
        {isPending ? "กำลังส่ง..." : "ส่งข้อความ"}
      </Button>
    </form>
  )
}
