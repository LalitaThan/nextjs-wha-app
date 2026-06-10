import { Mail, Phone, Clock } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import ContactForm from "./contact-form"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          ติดต่อเรา
        </h1>
        <p className="text-lg text-muted-foreground">
          มีคำถามหรือข้อสงสัยประการใด สามารถติดต่อเราได้ผ่านช่องทางด้านล่างนี้ เรายินดีให้คำปรึกษาและช่วยเหลือท่านในทุกเรื่อง
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-8 md:gap-12 items-start">
        <div className="flex flex-col gap-6">
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">contact@example.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium">เบอร์โทรศัพท์</p>
                <p className="text-sm text-muted-foreground">02-xxx-xxxx</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium">เวลาทำการ</p>
                <p className="text-sm text-muted-foreground">จันทร์ - ศุกร์: 09:00 - 18:00 น.</p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="px-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              หากคุณต้องการข้อมูลเพิ่มเติมเกี่ยวกับบริการของเรา หรือต้องการขอใบเสนอราคา 
              กรุณากรอกแบบฟอร์มติดต่อด้านข้าง เราจะรีบติดต่อกลับหาท่านโดยเร็วที่สุด
            </p>
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
