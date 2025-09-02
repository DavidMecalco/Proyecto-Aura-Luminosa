/**
 * ========================================
 * INTEGRACIÓN DE EMAIL EMPRESARIAL
 * Velas Starlight - Email Integration
 * ========================================
 */

/**
 * Configuración para diferentes servicios de email
 */
const EmailIntegration = {
    
    /**
     * Configuración para EmailJS (Recomendado)
     * Visita: https://www.emailjs.com/
     */
    emailJS: {
        enabled: false, // Cambiar a true cuando configures EmailJS
        serviceID: 'YOUR_SERVICE_ID',
        templateID: 'YOUR_TEMPLATE_ID',
        publicKey: 'YOUR_PUBLIC_KEY',
        
        // Configurar EmailJS
        init() {
            if (this.enabled && typeof emailjs !== 'undefined') {
                emailjs.init(this.publicKey);
                return true;
            }
            return false;
        },
        
        // Enviar email via EmailJS
        async send(emailData, formData) {
            if (!this.enabled) throw new Error('EmailJS no configurado');
            
            const templateParams = {
                to_email: 'ventas@velasstarlight.com',
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone || 'No proporcionado',
                event_type: formData['event-type'] || 'General',
                quantity: formData.quantity || 'No especificada',
                message: formData.message,
                subject: emailData.subject
            };
            
            return emailjs.send(this.serviceID, this.templateID, templateParams);
        }
    },

    /**
     * Configuración para Formspree
     * Visita: https://formspree.io/
     */
    formspree: {
        enabled: false, // Cambiar a true cuando configures Formspree
        endpoint: 'https://formspree.io/f/YOUR_FORM_ID',
        
        async send(emailData, formData) {
            if (!this.enabled) throw new Error('Formspree no configurado');
            
            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    name: formData.name,
                    phone: formData.phone,
                    eventType: formData['event-type'],
                    quantity: formData.quantity,
                    message: formData.message,
                    _subject: emailData.subject
                })
            });
            
            if (!response.ok) {
                throw new Error('Error al enviar via Formspree');
            }
            
            return response.json();
        }
    },

    /**
     * Configuración para Netlify Forms
     */
    netlify: {
        enabled: false, // Cambiar a true si usas Netlify
        
        async send(emailData, formData) {
            if (!this.enabled) throw new Error('Netlify Forms no configurado');
            
            const form = new FormData();
            form.append('form-name', 'contact');
            form.append('name', formData.name);
            form.append('email', formData.email);
            form.append('phone', formData.phone || '');
            form.append('event-type', formData['event-type'] || '');
            form.append('quantity', formData.quantity || '');
            form.append('message', formData.message);
            
            const response = await fetch('/', {
                method: 'POST',
                body: form
            });
            
            if (!response.ok) {
                throw new Error('Error al enviar via Netlify');
            }
            
            return response;
        }
    },

    /**
     * Método principal para enviar email
     */
    async sendEmail(emailData, formData) {
        // Intentar servicios en orden de preferencia
        const services = [
            { name: 'EmailJS', service: this.emailJS },
            { name: 'Formspree', service: this.formspree },
            { name: 'Netlify', service: this.netlify }
        ];

        for (const { name, service } of services) {
            if (service.enabled) {
                try {
                    console.log(`📧 Intentando envío via ${name}...`);
                    const result = await service.send(emailData, formData);
                    console.log(`✅ Email enviado exitosamente via ${name}`);
                    return result;
                } catch (error) {
                    console.warn(`❌ Error con ${name}:`, error.message);
                    continue;
                }
            }
        }

        // Si ningún servicio está configurado o funciona
        throw new Error('No hay servicios de email configurados');
    }
};

/**
 * Instrucciones de configuración
 */
const EmailSetupInstructions = {
    
    /**
     * Configurar EmailJS (Recomendado - Gratis hasta 200 emails/mes)
     */
    setupEmailJS() {
        console.log(`
🔧 CONFIGURAR EMAILJS:

1. Ve a https://www.emailjs.com/ y crea una cuenta
2. Crea un servicio de email (Gmail, Outlook, etc.)
3. Crea una plantilla de email con estas variables:
   - {{to_email}} - Email destino
   - {{from_name}} - Nombre del cliente
   - {{from_email}} - Email del cliente
   - {{phone}} - Teléfono
   - {{event_type}} - Tipo de evento
   - {{quantity}} - Cantidad
   - {{message}} - Mensaje
   - {{subject}} - Asunto

4. Agrega el SDK de EmailJS al HTML:
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

5. Actualiza la configuración en email-integration.js:
   emailJS: {
       enabled: true,
       serviceID: 'tu_service_id',
       templateID: 'tu_template_id',
       publicKey: 'tu_public_key'
   }
        `);
    },

    /**
     * Configurar Formspree
     */
    setupFormspree() {
        console.log(`
🔧 CONFIGURAR FORMSPREE:

1. Ve a https://formspree.io/ y crea una cuenta
2. Crea un nuevo formulario
3. Configura el email destino: ventas@velasstarlight.com
4. Copia el endpoint del formulario
5. Actualiza la configuración:
   formspree: {
       enabled: true,
       endpoint: 'https://formspree.io/f/TU_FORM_ID'
   }
        `);
    },

    /**
     * Mostrar todas las instrucciones
     */
    showAll() {
        this.setupEmailJS();
        this.setupFormspree();
        console.log(`
📧 RECOMENDACIÓN:
EmailJS es la opción más fácil y gratuita para empezar.
Formspree es buena alternativa si prefieres no usar JavaScript.
        `);
    }
};

// Mostrar instrucciones en consola
console.log('📧 Sistema de integración de email cargado');
console.log('💡 Ejecuta EmailSetupInstructions.showAll() para ver las instrucciones de configuración');

// Exportar para uso global
window.EmailIntegration = EmailIntegration;
window.EmailSetupInstructions = EmailSetupInstructions;