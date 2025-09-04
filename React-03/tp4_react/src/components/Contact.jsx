import { useState } from 'react';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Mensaje enviado:\nNombre: ${form.name}\nEmail: ${form.email}`);
    // Aquí iría la conexión al backend o EmailJS si quisieras
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact">
      <h3>Contacto</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Tu nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Tu email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Tu mensaje"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}

export default Contact;
