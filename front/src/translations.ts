export type Lang = "en" | "es" | "zh";

export const translations = {
  en: {
    nav: {
      services: "Services",
      templates: "Templates",
      onboarding: "How It Works",
      calculator: "AI Audit",
      whyUs: "Why Us",
      cta: "Get Started",
    },
    hero: {
      badge: "Live in Bogota, Colombia",
      headline1: "Automating Jobs.",
      headline2: "Optimizing Infrastructure.",
      description:
        "Low-ticket, high-impact AI solutions for local businesses. We automate repetitive workflows, harden your infrastructure, and deploy edge computing — starting at $299.",
      cta1: "See Work Templates",
      cta2: "Talk to Us",
    },
    services: {
      title: "What We Build",
      subtitle: "Modular. Affordable. Production-ready.",
      fromLabel: "From",
      cards: [
        {
          title: "Task Automation",
          price: "From $299",
          description:
            "Automate repetitive business processes — invoicing, reporting, data entry — using AI agents and workflow engines.",
          tags: ["N8N", "Python", "Gemini"],
        },
        {
          title: "Infrastructure Audit",
          price: "Included",
          description:
            "Full diagnostic of your tech stack. We map bottlenecks, security gaps, and cost leaks in your existing infrastructure.",
          tags: ["Docker", "K8s", "Security"],
        },
        {
          title: "Edge Computing",
          price: "Custom Quote",
          description:
            "Deploy local inference nodes and low-latency compute tailored to Bogota's connectivity landscape.",
          tags: ["FastAPI", "ONNX", "Edge"],
        },
      ],
    },
    stack: {
      title: "Tech Stack",
      subtitle: "Enterprise tools. Startup price.",
    },
    templates: {
      title: "Work Templates",
      subtitle: "Proven blueprints deployed in under 2 weeks.",
      impact: "Impact",
      deliverables: "Deliverables",
      previewHint: "Click to preview",
      previewCta: "Live Demo",
      cards: [
        {
          title: "Finance Hub",
          description: "Automated reconciliation, invoice parsing, and cash-flow reporting.",
          impact: "−40% overhead",
          deliverables: ["AI invoice parser", "Auto-reconciliation pipeline", "Real-time dashboard"],
        },
        {
          title: "Supermarket IA",
          description: "DIAN-compliant invoicing, real-time inventory tracking, and sales insights for Colombian retailers.",
          impact: "−35% waste",
          deliverables: ["DIAN e-invoicing (CUFE)", "Inventory alerts", "Daily sales insights"],
        },
        {
          title: "Farmacia Digital",
          description: "INVIMA drug registry, WHO interaction alerts, and Rx dispensing workflows.",
          impact: "0 compliance gaps",
          deliverables: ["INVIMA drug catalog", "Interaction engine (WHO)", "Rx tracking"],
        },
        {
          title: "Sales Intel Pipeline",
          description: "CRM enrichment, lead scoring, and outreach sequencing via AI agents.",
          impact: "+30% conversion",
          deliverables: ["Lead enrichment API", "AI scoring model", "Automated sequences"],
        },
        {
          title: "Pet Shop IA",
          description: "Appointment scheduling, vaccination reminders, and owner notifications via WhatsApp.",
          impact: "+45% retention",
          deliverables: ["Booking system", "Vaccine reminders", "WhatsApp alerts"],
        },
        {
          title: "Custom Copilot",
          description: "Domain-specific AI assistant trained on your internal docs and workflows.",
          impact: "−60% support load",
          deliverables: ["RAG knowledge base", "Chat interface", "API integration"],
        },
        {
          title: "Personal Finance IA",
          description: "Budget tracking, spending analysis, and AI-powered financial coaching in COP.",
          impact: "+28% savings rate",
          deliverables: ["Budget dashboard", "AI advisor chat", "Annual projection"],
        },
        {
          title: "Restaurante IA",
          description: "Kitchen order management, reservation handling, and food waste reduction insights.",
          impact: "−22% food waste",
          deliverables: ["Live order display", "Reservation system", "AI kitchen insights"],
        },
        {
          title: "Smoke Shop Smart",
          description: "Age-verified POS, DIAN invoicing, and compliance dashboard for regulated retail.",
          impact: "100% compliant",
          deliverables: ["Age-gate POS", "DIAN integration", "Compliance tracker"],
        },
        {
          title: "Infrastructure Sentinel",
          description: "24/7 infrastructure monitoring with AI-powered anomaly detection.",
          impact: "99.9% uptime",
          deliverables: ["Observability stack", "Alert intelligence", "Auto-remediation"],
        },
      ],
    },
    onboarding: {
      title: "How We Work",
      subtitle: "Three steps from diagnosis to deployment.",
      steps: [
        {
          number: "01",
          title: "Diagnostic Access",
          description:
            "We analyze your current stack, workflows, and pain points. No commitment required.",
        },
        {
          number: "02",
          title: "Blueprint Selection",
          description:
            "You pick the template or custom build that maps to your highest-impact opportunity.",
        },
        {
          number: "03",
          title: "Local Handover",
          description:
            "We deploy, train your team, and hand over fully documented, locally-hosted systems.",
        },
      ],
    },
    calculator: {
      title: "AI Efficiency Calculator",
      subtitle: "Describe any manual business process. Get an instant audit report.",
      placeholder:
        "Describe a manual process in your business (e.g., 'We manually reconcile bank statements every Monday — two employees spend 4 hours each week pulling data from 3 different systems...')",
      button: "Generate Audit Report",
      loading: "Generating your audit...",
      systemPrompt: `You are an expert AI consultant at Eccensia, a Bogota-based AI consulting firm.
      A local business has described a manual process.
      Provide a structured efficiency audit in the following format:

      ## Process Summary
      Brief restatement of the process.

      ## Automation Opportunity Score
      Rate from 1-10 how automatable this is, with reasoning.

      ## Recommended Solution
      Specific technology stack and approach Eccensia would use.

      ## Estimated Impact
      - Time saved per week
      - Cost reduction estimate
      - ROI timeline

      ## Implementation Plan
      3-step rollout using Eccensia's approach.

      ## Starting Price
      Based on complexity, suggest a price range from Eccensia's offerings (starting at $299).

      Be specific, data-driven, and reference Bogota's local business context where relevant. Respond in English.`,
    },
    whyUs: {
      title: "Why Eccensia",
      subtitle: "We are not a SaaS. We are your local engineering team.",
      features: [
        {
          title: "Local Latency",
          description: "Infrastructure deployed within Bogota. No cross-Atlantic round trips.",
        },
        {
          title: "Operational Focus",
          description: "We target processes with measurable ROI, not vanity AI features.",
        },
        {
          title: "Infrastructure as Code",
          description: "Every deployment is reproducible, documented, and yours to keep.",
        },
      ],
    },
    footer: {
      tagline: "Automating Bogota's businesses, one workflow at a time.",
      links: ["Services", "Templates", "How It Works", "AI Audit"],
      copyright: "© 2026 Eccensia. Bogota, CO.",
    },
    contact: {
      title: "Let's Talk",
      subtitle: "Tell us about your business and we'll get back within 24 hours.",
      company: "Company Name",
      email: "Work Email",
      message: "Describe your biggest operational challenge",
      submit: "Send Message",
      submitting: "Sending...",
      success: "Message sent! We'll reach out within 24 hours.",
    },
  },
  es: {
    nav: {
      services: "Servicios",
      templates: "Plantillas",
      onboarding: "Cómo Funciona",
      calculator: "Auditoría IA",
      whyUs: "Por Qué Nosotros",
      cta: "Comenzar",
    },
    hero: {
      badge: "Con sede en Bogotá, Colombia",
      headline1: "Automatizando Trabajos.",
      headline2: "Optimizando Infraestructura.",
      description:
        "Soluciones de IA de alto impacto y bajo costo para empresas locales. Automatizamos flujos repetitivos, fortalecemos tu infraestructura y desplegamos computación edge — desde $299.",
      cta1: "Ver Plantillas",
      cta2: "Hablar con Nosotros",
    },
    services: {
      title: "Qué Construimos",
      subtitle: "Modular. Accesible. Listo para producción.",
      fromLabel: "Desde",
      cards: [
        {
          title: "Automatización de Tareas",
          price: "Desde $299",
          description:
            "Automatiza procesos repetitivos — facturación, reportes, captura de datos — usando agentes de IA y motores de flujo de trabajo.",
          tags: ["N8N", "Python", "Gemini"],
        },
        {
          title: "Auditoría de Infraestructura",
          price: "Incluida",
          description:
            "Diagnóstico completo de tu stack tecnológico. Mapeamos cuellos de botella, brechas de seguridad y fugas de costos.",
          tags: ["Docker", "K8s", "Seguridad"],
        },
        {
          title: "Computación Edge",
          price: "Cotización Personalizada",
          description:
            "Desplegamos nodos de inferencia local y cómputo de baja latencia adaptados a la conectividad de Bogotá.",
          tags: ["FastAPI", "ONNX", "Edge"],
        },
      ],
    },
    stack: {
      title: "Stack Tecnológico",
      subtitle: "Herramientas empresariales. Precio startup.",
    },
    templates: {
      title: "Plantillas de Trabajo",
      subtitle: "Blueprints probados desplegados en menos de 2 semanas.",
      impact: "Impacto",
      deliverables: "Entregables",
      previewHint: "Clic para previsualizar",
      previewCta: "Demo en vivo",
      cards: [
        {
          title: "Hub Financiero",
          description: "Conciliación automatizada, análisis de facturas y reportes de flujo de caja.",
          impact: "−40% sobrecarga",
          deliverables: ["Parser de facturas IA", "Pipeline de conciliación", "Dashboard en tiempo real"],
        },
        {
          title: "Supermercado IA",
          description: "Facturación electrónica DIAN, control de inventario en tiempo real e insights de ventas para minoristas colombianos.",
          impact: "−35% desperdicio",
          deliverables: ["Factura-e DIAN (CUFE)", "Alertas de inventario", "Insights diarios de ventas"],
        },
        {
          title: "Farmacia Digital",
          description: "Registro INVIMA, alertas de interacciones OMS y flujos de dispensación de fórmulas médicas.",
          impact: "0 brechas regulatorias",
          deliverables: ["Catálogo INVIMA", "Motor de interacciones OMS", "Trazabilidad Rx"],
        },
        {
          title: "Pipeline de Inteligencia Comercial",
          description: "Enriquecimiento de CRM, scoring de leads y secuencias de outreach con agentes IA.",
          impact: "+30% conversión",
          deliverables: ["API de enriquecimiento", "Modelo de scoring IA", "Secuencias automáticas"],
        },
        {
          title: "Pet Shop IA",
          description: "Agendamiento de citas, recordatorios de vacunas y notificaciones a propietarios vía WhatsApp.",
          impact: "+45% retención",
          deliverables: ["Sistema de reservas", "Recordatorios de vacunas", "Alertas WhatsApp"],
        },
        {
          title: "Copiloto Personalizado",
          description: "Asistente IA de dominio específico entrenado en tus documentos y flujos internos.",
          impact: "−60% carga de soporte",
          deliverables: ["Base de conocimiento RAG", "Interfaz de chat", "Integración API"],
        },
        {
          title: "Finanzas Personales IA",
          description: "Seguimiento de presupuesto, análisis de gastos y asesoría financiera IA en COP.",
          impact: "+28% tasa de ahorro",
          deliverables: ["Dashboard de presupuesto", "Chat asesor IA", "Proyección anual"],
        },
        {
          title: "Restaurante IA",
          description: "Gestión de pedidos en cocina, manejo de reservas e insights para reducir desperdicio.",
          impact: "−22% desperdicio alimentario",
          deliverables: ["Display de pedidos en vivo", "Sistema de reservas", "Insights IA de cocina"],
        },
        {
          title: "Smoke Shop Smart",
          description: "Punto de venta con verificación de edad, facturación DIAN y panel de cumplimiento regulatorio.",
          impact: "100% cumplimiento",
          deliverables: ["POS con verificación de edad", "Integración DIAN", "Rastreador de cumplimiento"],
        },
        {
          title: "Centinela de Infraestructura",
          description: "Monitoreo 24/7 con detección de anomalías impulsada por IA.",
          impact: "99.9% disponibilidad",
          deliverables: ["Stack de observabilidad", "Alertas inteligentes", "Remediación automática"],
        },
      ],
    },
    onboarding: {
      title: "Cómo Trabajamos",
      subtitle: "Tres pasos del diagnóstico al despliegue.",
      steps: [
        {
          number: "01",
          title: "Acceso Diagnóstico",
          description: "Analizamos tu stack, flujos y puntos de dolor. Sin compromiso.",
        },
        {
          number: "02",
          title: "Selección de Blueprint",
          description: "Eliges la plantilla o construcción personalizada de mayor impacto.",
        },
        {
          number: "03",
          title: "Entrega Local",
          description: "Desplegamos, entrenamos a tu equipo y entregamos sistemas documentados.",
        },
      ],
    },
    calculator: {
      title: "Calculadora de Eficiencia IA",
      subtitle: "Describe cualquier proceso manual. Obtén un reporte de auditoría al instante.",
      placeholder:
        "Describe un proceso manual en tu empresa (ej: 'Conciliamos extractos bancarios manualmente cada lunes — dos empleados pasan 4 horas semanales extrayendo datos de 3 sistemas distintos...')",
      button: "Generar Reporte de Auditoría",
      loading: "Generando tu auditoría...",
      systemPrompt: `Eres un consultor experto en IA de Eccensia, una firma de consultoría IA con sede en Bogotá.
      Una empresa local ha descrito un proceso manual.
      Proporciona una auditoría de eficiencia estructurada en el siguiente formato:

      ## Resumen del Proceso
      Breve descripción del proceso.

      ## Puntuación de Oportunidad de Automatización
      Califica del 1 al 10 qué tan automatizable es, con razonamiento.

      ## Solución Recomendada
      Stack tecnológico y enfoque específico que usaría Eccensia.

      ## Impacto Estimado
      - Tiempo ahorrado por semana
      - Estimación de reducción de costos
      - Plazo de ROI

      ## Plan de Implementación
      Despliegue en 3 pasos usando el enfoque de Eccensia.

      ## Precio Inicial
      Basado en la complejidad, sugiere un rango de precios desde $299.

      Sé específico, basado en datos y referencia el contexto empresarial local de Bogotá donde sea relevante. Responde en español.`,
    },
    whyUs: {
      title: "Por Qué Eccensia",
      subtitle: "No somos un SaaS. Somos tu equipo de ingeniería local.",
      features: [
        {
          title: "Latencia Local",
          description: "Infraestructura desplegada en Bogotá. Sin saltos transatlánticos.",
        },
        {
          title: "Enfoque Operacional",
          description: "Apuntamos a procesos con ROI medible, no a características IA de vanidad.",
        },
        {
          title: "Infraestructura como Código",
          description: "Cada despliegue es reproducible, documentado y tuyo.",
        },
      ],
    },
    footer: {
      tagline: "Automatizando los negocios de Bogotá, un flujo a la vez.",
      links: ["Servicios", "Plantillas", "Cómo Funciona", "Auditoría IA"],
      copyright: "© 2026 Eccensia. Bogotá, CO.",
    },
    contact: {
      title: "Hablemos",
      subtitle: "Cuéntanos sobre tu negocio y respondemos en 24 horas.",
      company: "Nombre de la Empresa",
      email: "Correo Empresarial",
      message: "Describe tu mayor desafío operacional",
      submit: "Enviar Mensaje",
      submitting: "Enviando...",
      success: "¡Mensaje enviado! Te contactamos en 24 horas.",
    },
  },
  zh: {
    nav: {
      services: "服务",
      templates: "模板",
      onboarding: "工作流程",
      calculator: "AI审计",
      whyUs: "为何选择我们",
      cta: "开始合作",
    },
    hero: {
      badge: "驻地波哥大，哥伦比亚",
      headline1: "自动化工作流程。",
      headline2: "优化基础架构。",
      description:
        "为本地企业提供低成本、高影响力的AI解决方案。我们自动化重复性工作流、强化基础设施并部署边缘计算——起价$299。",
      cta1: "查看工作模板",
      cta2: "联系我们",
    },
    services: {
      title: "我们构建什么",
      subtitle: "模块化。可负担。生产就绪。",
      fromLabel: "从",
      cards: [
        {
          title: "任务自动化",
          price: "起价 $299",
          description: "使用AI代理和工作流引擎自动化重复业务流程——发票、报告、数据录入。",
          tags: ["N8N", "Python", "Gemini"],
        },
        {
          title: "基础设施审计",
          price: "免费包含",
          description: "全面诊断您的技术栈，识别瓶颈、安全漏洞和成本泄漏。",
          tags: ["Docker", "K8s", "安全"],
        },
        {
          title: "边缘计算",
          price: "定制报价",
          description: "部署本地推理节点和低延迟计算，适配波哥大网络环境。",
          tags: ["FastAPI", "ONNX", "Edge"],
        },
      ],
    },
    stack: {
      title: "技术栈",
      subtitle: "企业级工具。初创公司价格。",
    },
    templates: {
      title: "工作模板",
      subtitle: "经过验证的蓝图，两周内完成部署。",
      impact: "影响",
      deliverables: "交付物",
      previewHint: "点击预览",
      previewCta: "实时演示",
      cards: [
        {
          title: "财务中枢",
          description: "自动化对账、发票解析和现金流报告。",
          impact: "减少40%管理负担",
          deliverables: ["AI发票解析器", "自动对账流水线", "实时仪表板"],
        },
        {
          title: "超市IA",
          description: "DIAN合规开票、实时库存追踪及哥伦比亚零售商销售洞察。",
          impact: "减少35%浪费",
          deliverables: ["DIAN电子发票(CUFE)", "库存预警", "每日销售洞察"],
        },
        {
          title: "数字药房",
          description: "INVIMA药品注册、WHO药物相互作用预警及处方调配工作流。",
          impact: "零合规缺口",
          deliverables: ["INVIMA药品目录", "WHO交互引擎", "处方追踪"],
        },
        {
          title: "销售智能流水线",
          description: "CRM数据增强、线索评分和AI代理自动化推广序列。",
          impact: "提升30%转化率",
          deliverables: ["线索增强API", "AI评分模型", "自动化序列"],
        },
        {
          title: "宠物店IA",
          description: "预约管理、疫苗提醒及WhatsApp宠物主人通知系统。",
          impact: "提升45%留存率",
          deliverables: ["预约系统", "疫苗提醒", "WhatsApp推送"],
        },
        {
          title: "定制副驾驶",
          description: "基于内部文档和工作流训练的领域专属AI助手。",
          impact: "减少60%支持负载",
          deliverables: ["RAG知识库", "聊天界面", "API集成"],
        },
        {
          title: "个人财务IA",
          description: "预算追踪、消费分析及COP币种AI财务辅导。",
          impact: "提升28%储蓄率",
          deliverables: ["预算仪表板", "AI顾问聊天", "年度预测"],
        },
        {
          title: "餐厅IA",
          description: "厨房订单管理、预订处理及食物浪费减少洞察。",
          impact: "减少22%食物浪费",
          deliverables: ["实时订单显示", "预订系统", "AI厨房洞察"],
        },
        {
          title: "烟草店智能系统",
          description: "年龄验证POS、DIAN开票及受监管零售合规面板。",
          impact: "100%合规",
          deliverables: ["年龄验证POS", "DIAN集成", "合规追踪器"],
        },
        {
          title: "基础设施哨兵",
          description: "24/7基础设施监控，配备AI驱动的异常检测。",
          impact: "99.9%可用性",
          deliverables: ["可观测性栈", "智能告警", "自动修复"],
        },
      ],
    },
    onboarding: {
      title: "工作方式",
      subtitle: "从诊断到部署，三步完成。",
      steps: [
        {
          number: "01",
          title: "诊断访问",
          description: "我们分析您当前的技术栈、工作流和痛点，无需承诺。",
        },
        {
          number: "02",
          title: "蓝图选择",
          description: "选择影响最大的模板或定制构建方案。",
        },
        {
          number: "03",
          title: "本地交付",
          description: "我们部署、培训您的团队，并移交完全文档化的本地托管系统。",
        },
      ],
    },
    calculator: {
      title: "AI效率计算器",
      subtitle: "描述任何手动业务流程，即时获取审计报告。",
      placeholder: "描述您企业中的手动流程（例如：'我们每周一手动对账——两名员工每周花4小时从3个不同系统提取数据...'）",
      button: "生成审计报告",
      loading: "正在生成审计报告...",
      systemPrompt: `您是Eccensia的AI顾问专家，Eccensia是一家驻波哥大的AI咨询公司。
      一家本地企业描述了一个手动流程。
      请按以下格式提供结构化效率审计：

      ## 流程摘要
      简要重述该流程。

      ## 自动化机会评分
      评分1-10，说明可自动化程度及原因。

      ## 推荐方案
      Eccensia将使用的具体技术栈和方法。

      ## 预估影响
      - 每周节省时间
      - 成本削减估算
      - ROI时间线

      ## 实施计划
      使用Eccensia方法的3步推进计划。

      ## 起始价格
      根据复杂度，建议起价$299的价格区间。

      请具体、数据驱动，在相关情况下参考波哥大本地商业背景。请用中文回答。`,
    },
    whyUs: {
      title: "为何选择Eccensia",
      subtitle: "我们不是SaaS，我们是您的本地工程团队。",
      features: [
        {
          title: "本地低延迟",
          description: "基础设施部署在波哥大本地，无跨洋往返延迟。",
        },
        {
          title: "运营导向",
          description: "我们针对有可量化ROI的流程，而非表面化的AI功能。",
        },
        {
          title: "基础设施即代码",
          description: "每次部署可重现、有文档，完全归您所有。",
        },
      ],
    },
    footer: {
      tagline: "逐一自动化波哥大的业务流程。",
      links: ["服务", "模板", "工作流程", "AI审计"],
      copyright: "© 2026 Eccensia. 波哥大，哥伦比亚。",
    },
    contact: {
      title: "联系我们",
      subtitle: "告诉我们您的业务，我们将在24小时内回复。",
      company: "公司名称",
      email: "工作邮箱",
      message: "描述您最大的运营挑战",
      submit: "发送消息",
      submitting: "发送中...",
      success: "消息已发送！我们将在24小时内联系您。",
    },
  },
} as const;

export type Translations = (typeof translations)[Lang];
