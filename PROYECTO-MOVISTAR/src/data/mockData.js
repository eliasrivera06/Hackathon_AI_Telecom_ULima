export const userProfile = {
  id: "USR-84920",
  name: "Carlos Ruiz",
  email: "carlos.ruiz@email.com",
  phone: "+51 987 654 321",
  clientCode: "CLI-2024-998",
  accountType: "Residencial Hogar",
  address: "Av. Javier Prado Este 2450, San Borja, Lima",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
};

export const currentPlan = {
  name: "Plan Hogar Fibra 600 Mbps",
  serviceType: "Fibra Óptica Monofamiliar",
  status: "Activo",
  speed: "600 Mbps simétricos",
  modem: "Smart WiFi 6 Movistar",
  contractStart: "15/01/2024",
  regularPrice: 120,
  currentPrice: 120,
  features: [
    "Internet Ilimitado por Fibra Óptica",
    "Smart WiFi 6 con Cobertura Extendida",
    "Movistar TV App versión Estándar",
    "Asistencia Técnica Prioritaria 24/7"
  ]
};

export const billingOverview = {
  nextBillAmount: 120,
  nextDueDate: "28 Ago 2024",
  lastBillAmount: 100,
  lastBillDate: "15 Jul 2024",
  variation: 20,
  variationPercentage: "+20%",
  variationType: "increase", // 'increase' | 'decrease' | 'equal'
  rootCauseSummary: "Finalización de la promoción de bienvenida (-S/20/mes) aplicada durante los primeros 6 meses.",
  invoiceNumber: "REC-2024-07-88392",
  billingCycle: "15 Jun 2024 - 14 Jul 2024"
};

export const receiptComparison = {
  previousMonth: "Junio 2024",
  previousAmount: "S/ 100.00",
  currentMonth: "Julio 2024",
  currentAmount: "S/ 120.00",
  difference: "+ S/ 20.00",
  reason: "Término de la promoción de bienvenida (Descuento de S/ 20 durante 6 meses)",
  effectiveDate: "15 de julio de 2024",
  itemizedBreakdown: [
    { 
      concept: "Plan Hogar Fibra 600 Mbps (Tarifa base regular)", 
      juneAmount: 120.00, 
      julyAmount: 120.00, 
      status: "Sin variación",
      note: "Precio de lista contratado" 
    },
    { 
      concept: "Descuento Promocional Bienvenida (6 meses)", 
      juneAmount: -20.00, 
      julyAmount: 0.00, 
      status: "Promoción Finalizada",
      note: "Venció el 15/07/2024" 
    },
    { 
      concept: "Alquiler Equipamiento Smart WiFi 6", 
      juneAmount: 0.00, 
      julyAmount: 0.00, 
      status: "Incluido S/0",
      note: "Bonificación 100%" 
    },
    { 
      concept: "Servicio Movistar TV App Standard", 
      juneAmount: 0.00, 
      julyAmount: 0.00, 
      status: "Incluido S/0",
      note: "Beneficio de plan" 
    }
  ]
};

export const planBenefits = [
  {
    id: "ben-1",
    title: "Renovación de Promoción Fija",
    desc: "Renueva tu fidelidad y accede a un nuevo descuento de S/ 15/mes por 6 meses adicionales.",
    badge: "Recomendado para ti",
    actionText: "Solicitar Renovación",
    icon: "Tag"
  },
  {
    id: "ben-2",
    title: "Upgrade a 800 Mbps al mismo precio",
    desc: "Al vincular tu celular Movistar Postpago, aumenta tu velocidad a 800 Mbps sin costo extra.",
    badge: "Beneficio Total",
    actionText: "Vincular Línea Móvil",
    icon: "Zap"
  },
  {
    id: "ben-3",
    title: "Mes Gratis de Movistar TV Total",
    desc: "Disfruta de la liga peruana, canales de deportes HD y películas premium sin costo por 30 días.",
    badge: "Exclusivo",
    actionText: "Activar Prueba Gratis",
    icon: "Tv"
  }
];

export const chatHistory = [
  {
    id: "chat-1",
    title: "Explicación Recibo Julio",
    subtitle: "Aumento de S/20 por fin de promo",
    date: "Hoy, 10:14 AM",
    active: true,
    category: "Recibos",
    tag: "Importante"
  },
  {
    id: "chat-2",
    title: "Revisión Plan Fibra 600M",
    subtitle: "Consulta sobre velocidad WiFi",
    date: "14 Jul 2024",
    active: false,
    category: "Servicio",
    tag: "Resuelto"
  },
  {
    id: "chat-3",
    title: "Descuento Movistar Total",
    subtitle: "Vincular paquete hogar + móvil",
    date: "02 Jun 2024",
    active: false,
    category: "Beneficios",
    tag: "Completado"
  },
  {
    id: "chat-4",
    title: "Cambio de Smart WiFi Router",
    subtitle: "Solicitud de soporte técnico",
    date: "20 May 2024",
    active: false,
    category: "Soporte",
    tag: "Atendido"
  }
];

export const initialMessages = [
  {
    id: "msg-welcome-init",
    sender: "assistant",
    agentName: "Lucio",
    agentRole: "Asistente Inteligente de Recibos Movistar",
    timestamp: "Ahora",
    text: "¡Hola! Soy Lucio, tu asistente inteligente de Movistar. ¿En qué te puedo ayudar hoy con tu recibo o plan?",
    suggestedActions: []
  }
];

export const mockAiResponses = {
  "action-detail": {
    text: "Aquí tienes el desglose detallado línea por línea de tu facturación de Julio 2024 comparada con Junio 2024:",
    showModal: "detail"
  },
  "action-benefits": {
    text: "Para mantener tu tarifa reducida, encontré estas 3 opciones exclusivas preparadas especialmente para tu cuenta:",
    showModal: "benefits"
  },
  "action-claim": {
    text: "Entiendo tu requerimiento. He generado una constancia de consulta para que un especialista en facturación de Movistar revise tu caso si lo deseas:",
    showModal: "claim"
  }
};
