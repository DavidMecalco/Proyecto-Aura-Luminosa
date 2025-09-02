/**
 * ========================================
 * SISTEMA DE CONTACTO EMPRESARIAL
 * Velas Starlight - Contact System
 * ========================================
 */

/**
 * Configuración del sistema de contacto
 */
const ContactConfig = {
    // Email empresarial principal
    businessEmail: 'ventas@velasstarlight.com',
    
    // WhatsApp Business
    whatsappNumber: '525564682112',
    
    // Plantillas de email para diferentes tipos de consulta
    emailTemplates: {
        boda: {
            subject: 'Consulta para Boda - Velas Personalizadas',
            priority: 'alta'
        },
        corporativo: {
            subject: 'Evento Corporativo - Solicitud de Cotización',
            priority: 'alta'
        },
        mayoreo: {
            subject: 'Compra por Mayoreo - Solicitud de Descuentos',
            priority: 'media'
        },
        general: {
            subject: 'Consulta General - Velas Starlight',
            priority: 'normal'
        }
    },

    // Respuestas automáticas
    autoResponses: {
        mayoreo: 'Gracias por tu interés en nuestros descuentos por mayoreo. Te contactaremos en menos de 24 horas con una cotización personalizada.',
        evento: 'Hemos recibido tu consulta para evento. Nuestro equipo especializado te contactará pronto para crear una propuesta única.',
        general: 'Gracias por contactarnos. Responderemos tu consulta a la brevedad.'
    }
};

/**
 * Clase para manejar el sistema de contacto
 */
class ContactSystem {
    constructor() {
        this.init();
    }

    /**
     * Inicializar el sistema
     */
    init() {
        this.setupFormHandlers();
        this.setupQuickActions();
        console.log('📧 Sistema de contacto inicializado');
    }

    /**
     * Configurar manejadores de formularios
     */
    setupFormHandlers() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleFormSubmission(e));
        }

        // Auto-completar información basada en el tipo de evento
        const eventTypeSelect = document.getElementById('event-type');
        if (eventTypeSelect) {
            eventTypeSelect.addEventListener('change', (e) => this.handleEventTypeChange(e));
        }
    }

    /**
     * Configurar acciones rápidas
     */
    setupQuickActions() {
        // Botones de WhatsApp
        document.querySelectorAll('[href*="wa.me"]').forEach(button => {
            button.addEventListener('click', (e) => this.handleWhatsAppClick(e));
        });

        // Enlaces de email
        document.querySelectorAll('[href^="mailto:"]').forEach(link => {
            link.addEventListener('click', (e) => this.handleEmailClick(e));
        });
    }

    /**
     * Manejar envío del formulario
     */
    handleFormSubmission(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Validar datos
        if (!this.validateFormData(data)) {
            return;
        }

        // Procesar según el tipo de consulta
        this.processContactRequest(data);
    }

    /**
     * Validar datos del formulario
     */
    validateFormData(data) {
        const required = ['name', 'email', 'message'];
        const missing = required.filter(field => !data[field] || data[field].trim() === '');
        
        if (missing.length > 0) {
            this.showNotification(`Campos requeridos faltantes: ${missing.join(', ')}`, 'error');
            return false;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showNotification('Por favor ingresa un email válido', 'error');
            return false;
        }

        return true;
    }

    /**
     * Procesar solicitud de contacto
     */
    processContactRequest(data) {
        const eventType = data['event-type'] || 'general';
        const template = ContactConfig.emailTemplates[eventType] || ContactConfig.emailTemplates.general;
        
        // Crear email estructurado
        const emailData = this.createEmailData(data, template);
        
        // Mostrar loading
        this.showNotification('Enviando tu consulta...', 'info');
        
        // Intentar envío directo primero, luego fallback a mailto
        this.sendEmailDirect(emailData, data)
            .then(() => {
                this.showNotification('¡Consulta enviada exitosamente! Te contactaremos pronto.', 'success');
                document.getElementById('contact-form').reset();
            })
            .catch(() => {
                // Fallback a cliente de email local
                this.openEmailClient(emailData);
                this.showNotification('Se abrió tu cliente de email para completar el envío.', 'info');
                
                // Enviar a WhatsApp como respaldo si es prioritario
                if (template.priority === 'alta') {
                    setTimeout(() => {
                        this.sendToWhatsApp(data);
                    }, 2000);
                }
                
                // Limpiar formulario
                document.getElementById('contact-form').reset();
            });
    }

    /**
     * Enviar email directamente (usando servicio web)
     */
    async sendEmailDirect(emailData, formData) {
        // Usar el sistema de integración de email si está disponible
        if (window.EmailIntegration) {
            try {
                return await window.EmailIntegration.sendEmail(emailData, formData);
            } catch (error) {
                console.warn('Error con integración de email:', error.message);
                throw error;
            }
        }
        
        // Fallback: intentar con tu propio backend si existe
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: emailData.to,
                    subject: emailData.subject,
                    html: this.formatEmailAsHTML(emailData.body),
                    formData: formData
                })
            });
            
            if (!response.ok) {
                throw new Error('Error al enviar email via backend');
            }
            
            return response.json();
        } catch (error) {
            console.warn('Backend no disponible:', error.message);
            throw new Error('Servicio de email no configurado - usando cliente local');
        }
    }

    /**
     * Formatear email como HTML
     */
    formatEmailAsHTML(textBody) {
        return textBody
            .replace(/\n/g, '<br>')
            .replace(/NUEVA CONSULTA - VELAS STARLIGHT/g, '<h2 style="color: #2D3E33;">NUEVA CONSULTA - VELAS STARLIGHT</h2>')
            .replace(/================================/g, '<hr>')
            .replace(/INFORMACIÓN DEL CLIENTE:/g, '<h3 style="color: #3A5A40;">INFORMACIÓN DEL CLIENTE:</h3>')
            .replace(/DETALLES DE LA CONSULTA:/g, '<h3 style="color: #3A5A40;">DETALLES DE LA CONSULTA:</h3>')
            .replace(/MENSAJE:/g, '<h3 style="color: #3A5A40;">MENSAJE:</h3>');
    }

    /**
     * Crear datos estructurados para email
     */
    createEmailData(data, template) {
        const subject = `${template.subject} - ${data.name}`;
        
        let body = `
NUEVA CONSULTA - VELAS STARLIGHT
================================

INFORMACIÓN DEL CLIENTE:
------------------------
Nombre: ${data.name}
Email: ${data.email}
Teléfono: ${data.phone || 'No proporcionado'}

DETALLES DE LA CONSULTA:
------------------------
Tipo de evento: ${this.getEventTypeLabel(data['event-type'])}
Cantidad aproximada: ${data.quantity || 'No especificada'}
Prioridad: ${template.priority.toUpperCase()}

MENSAJE:
--------
${data.message}

`;

        // Agregar información específica según el tipo
        if (data['event-type'] === 'mayoreo') {
            body += `
INFORMACIÓN ADICIONAL - MAYOREO:
--------------------------------
- Descuentos disponibles según cantidad
- Facturación empresarial disponible
- Tiempos de entrega: 7-14 días

`;
        }

        if (data['event-type'] === 'boda' || data['event-type'] === 'corporativo') {
            body += `
SERVICIOS ESPECIALES DISPONIBLES:
---------------------------------
- Diseños personalizados
- Fragancias exclusivas
- Empaques corporativos
- Entrega programada

`;
        }

        body += `
---
Enviado desde: www.velasstarlight.com
Fecha: ${new Date().toLocaleString('es-MX')}
IP: ${this.getClientIP()}
        `;

        return {
            to: ContactConfig.businessEmail,
            subject: subject,
            body: body
        };
    }

    /**
     * Abrir cliente de email
     */
    openEmailClient(emailData) {
        const mailtoLink = `mailto:${emailData.to}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;
        window.location.href = mailtoLink;
    }

    /**
     * Enviar a WhatsApp como respaldo
     */
    sendToWhatsApp(data) {
        const message = `
🌟 *CONSULTA PRIORITARIA - VELAS STARLIGHT*

👤 *Cliente:* ${data.name}
📧 *Email:* ${data.email}
📱 *Teléfono:* ${data.phone || 'No proporcionado'}

🎉 *Tipo:* ${this.getEventTypeLabel(data['event-type'])}
📦 *Cantidad:* ${data.quantity || 'No especificada'}

💬 *Mensaje:*
${data.message}

_Enviado desde el formulario web_
        `;

        const whatsappUrl = `https://wa.me/${ContactConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
        
        // Preguntar si quiere enviar también por WhatsApp
        if (confirm('¿También quieres enviar esta consulta por WhatsApp para una respuesta más rápida?')) {
            window.open(whatsappUrl, '_blank');
        }
    }

    /**
     * Manejar cambio de tipo de evento
     */
    handleEventTypeChange(e) {
        const eventType = e.target.value;
        const quantityField = document.getElementById('quantity');
        const messageField = document.getElementById('message');
        
        // Sugerir cantidades según el tipo de evento
        if (quantityField) {
            switch (eventType) {
                case 'boda':
                    quantityField.placeholder = 'Ej: 100 (para invitados)';
                    break;
                case 'corporativo':
                    quantityField.placeholder = 'Ej: 50 (para empleados/clientes)';
                    break;
                case 'mayoreo':
                    quantityField.placeholder = 'Ej: 200 (mínimo para descuentos)';
                    break;
                default:
                    quantityField.placeholder = 'Cantidad aproximada';
            }
        }

        // Sugerir contenido del mensaje
        if (messageField && !messageField.value) {
            const suggestions = {
                boda: 'Hola, estoy planeando mi boda para [fecha] y me interesan velas personalizadas para [número] invitados. Me gustaría conocer opciones de fragancias, colores y precios.',
                corporativo: 'Buenos días, necesito velas para un evento corporativo. Me interesa conocer opciones de personalización con nuestro logo y precios por volumen.',
                mayoreo: 'Hola, soy revendedor/distribuidor y me interesa conocer sus precios por mayoreo y condiciones comerciales.',
                quinceañera: 'Hola, estoy organizando una quinceañera y me gustaría cotizar velas personalizadas para la celebración.',
                general: 'Hola, me interesa conocer más sobre sus productos y servicios.'
            };
            
            if (suggestions[eventType]) {
                messageField.placeholder = suggestions[eventType];
            }
        }
    }

    /**
     * Manejar click en WhatsApp
     */
    handleWhatsAppClick(e) {
        // Agregar tracking si es necesario
        console.log('📱 WhatsApp clicked');
        
        // Agregar mensaje predeterminado si no tiene
        const url = new URL(e.target.href);
        if (!url.searchParams.get('text')) {
            e.preventDefault();
            const defaultMessage = '¡Hola! Me interesa conocer más sobre sus velas artesanales y servicios para eventos. ¿Podrían ayudarme?';
            const newUrl = `${url.origin}${url.pathname}?text=${encodeURIComponent(defaultMessage)}`;
            window.open(newUrl, '_blank');
        }
    }

    /**
     * Manejar click en email
     */
    handleEmailClick(e) {
        console.log('📧 Email clicked');
        // Aquí puedes agregar tracking de analytics
    }

    /**
     * Obtener etiqueta del tipo de evento
     */
    getEventTypeLabel(eventType) {
        const labels = {
            boda: 'Boda',
            corporativo: 'Evento Corporativo',
            quinceañera: 'Quinceañera',
            aniversario: 'Aniversario',
            mayoreo: 'Compra por Mayoreo',
            personalizado: 'Producto Personalizado',
            general: 'Consulta General'
        };
        return labels[eventType] || 'No especificado';
    }

    /**
     * Obtener IP del cliente (simulado)
     */
    getClientIP() {
        // En un entorno real, esto se obtendría del servidor
        return 'xxx.xxx.xxx.xxx';
    }

    /**
     * Mostrar notificación
     */
    showNotification(message, type = 'info') {
        // Remover notificación existente
        const existing = document.querySelector('.contact-notification');
        if (existing) {
            existing.remove();
        }

        // Crear nueva notificación
        const notification = document.createElement('div');
        notification.className = 'contact-notification fixed top-24 right-6 z-50 px-6 py-4 rounded-lg shadow-lg text-white transform transition-all duration-300 translate-x-full max-w-sm';
        
        // Colores según el tipo
        const styles = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-blue-500',
            warning: 'bg-yellow-500'
        };

        notification.classList.add(styles[type] || styles.info);

        // Iconos según el tipo
        const icons = {
            success: 'check-circle',
            error: 'exclamation-triangle',
            info: 'info-circle',
            warning: 'exclamation-triangle'
        };

        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="fas fa-${icons[type] || icons.info} text-lg"></i>
                <div>
                    <p class="font-semibold">${message}</p>
                    <p class="text-xs opacity-90">Velas Starlight</p>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        // Remover después de 5 segundos
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
}

/**
 * Inicializar sistema de contacto cuando el DOM esté listo
 */
document.addEventListener('DOMContentLoaded', function() {
    window.contactSystem = new ContactSystem();
});

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ContactSystem, ContactConfig };
}