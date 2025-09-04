import { motion } from 'framer-motion';

function About() {
  return (
    <section id="about">
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Sobre mí
      </motion.h2>
      <p>
        ¡Hola! Soy un estudiante de desarrollador web entusiasta con un enfoque actual React y diseño moderno.
      </p>
    </section>
  );
}

export default About;
