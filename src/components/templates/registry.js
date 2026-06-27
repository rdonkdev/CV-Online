import TemplateModern from '@/components/templates/TemplateModern.vue'
import TemplateClassic from '@/components/templates/TemplateClassic.vue'
import TemplateMinimal from '@/components/templates/TemplateMinimal.vue'
import TemplateElegant from '@/components/templates/TemplateElegant.vue'
import TemplateCompact from '@/components/templates/TemplateCompact.vue'
import TemplateSidebar from '@/components/templates/TemplateSidebar.vue'
import TemplateTimeline from '@/components/templates/TemplateTimeline.vue'
import TemplateProfessional from '@/components/templates/TemplateProfessional.vue'
import TemplateCorporate from '@/components/templates/TemplateCorporate.vue'
import TemplateExecutive from '@/components/templates/TemplateExecutive.vue'
import TemplateBanner from '@/components/templates/TemplateBanner.vue'
import TemplateCards from '@/components/templates/TemplateCards.vue'
import TemplateSlate from '@/components/templates/TemplateSlate.vue'
import TemplateUnderline from '@/components/templates/TemplateUnderline.vue'
import TemplateMono from '@/components/templates/TemplateMono.vue'
import TemplateGradient from '@/components/templates/TemplateGradient.vue'
import TemplateRefined from '@/components/templates/TemplateRefined.vue'
import TemplateCreative from '@/components/templates/TemplateCreative.vue'

// Lista única de templates — usada pelo seletor e pela pré-visualização.
export const TEMPLATES = [
  { value: 'modern', label: 'Modern', component: TemplateModern },
  { value: 'classic', label: 'Classic', component: TemplateClassic },
  { value: 'minimal', label: 'Minimal', component: TemplateMinimal },
  { value: 'elegant', label: 'Elegant', component: TemplateElegant },
  { value: 'compact', label: 'Compact', component: TemplateCompact },
  { value: 'sidebar', label: 'Sidebar', component: TemplateSidebar },
  { value: 'timeline', label: 'Timeline', component: TemplateTimeline },
  { value: 'professional', label: 'Professional', component: TemplateProfessional },
  { value: 'corporate', label: 'Corporate', component: TemplateCorporate },
  { value: 'executive', label: 'Executive', component: TemplateExecutive },
  { value: 'banner', label: 'Banner', component: TemplateBanner },
  { value: 'cards', label: 'Cards', component: TemplateCards },
  { value: 'slate', label: 'Slate', component: TemplateSlate },
  { value: 'underline', label: 'Underline', component: TemplateUnderline },
  { value: 'mono', label: 'Mono', component: TemplateMono },
  { value: 'gradient', label: 'Gradient', component: TemplateGradient },
  { value: 'refined', label: 'Refined', component: TemplateRefined },
  { value: 'creative', label: 'Creative', component: TemplateCreative },
]

export const templateMap = Object.fromEntries(TEMPLATES.map((t) => [t.value, t.component]))
