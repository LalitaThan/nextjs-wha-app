'use client'

import { useTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, Loader2 } from 'lucide-react'
import { 
  Field, 
  FieldLabel, 
  FieldError, 
  FieldContent 
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { contactSchema, ContactFormValues } from '@/lib/validations/contact'

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  async function onSubmit(values: ContactFormValues) {
    startTransition(async () => {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        })

        const result = await response.json()

        if (!result.success) {
          throw new Error(result.error)
        }

        toast.success('ส่งข้อความเรียบร้อยแล้ว')
        setIsSubmitted(true)
        form.reset()
      } catch (error: unknown) {
        toast.error((error as Error).message || 'เกิดข้อผิดพลาดในการส่งข้อความ')
      }
    })
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-8">
        <CheckCircle className="w-12 h-12 text-green-500" />
        <h3 className="text-xl font-semibold">ส่งข้อความสำเร็จ!</h3>
        <p className="text-muted-foreground">เราจะติดต่อกลับหาคุณโดยเร็วที่สุด</p>
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
      <Field>
        <FieldLabel>ชื่อ</FieldLabel>
        <FieldContent>
          <Input 
            {...form.register('name')} 
            placeholder="กรอกชื่อของคุณ" 
          />
        </FieldContent>
        <FieldError errors={form.formState.errors.name ? [{ message: form.formState.errors.name.message }] : []} />
      </Field>

      <Field>
        <FieldLabel>Email</FieldLabel>
        <FieldContent>
          <Input 
            type="email" 
            {...form.register('email')} 
            placeholder="example@email.com" 
          />
        </FieldContent>
        <FieldError errors={form.formState.errors.email ? [{ message: form.formState.errors.email.message }] : []} />
      </Field>

      <Field>
        <FieldLabel>ข้อความ</FieldLabel>
        <FieldContent>
          <Textarea 
            rows={5} 
            {...form.register('message')} 
            placeholder="พิมพ์ข้อความที่ต้องการ..." 
          />
        </FieldContent>
        <FieldError errors={form.formState.errors.message ? [{ message: form.formState.errors.message.message }] : []} />
      </Field>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> กำลังส่ง...</>
        ) : (
          'ส่งข้อความ'
        )}
      </Button>
    </form>
  )
}
