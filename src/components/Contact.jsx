import React, { useRef, useState } from "react";
import { Mail, Github, Instagram, Send } from "lucide-react";
import { contactLinks } from "../data/contact";
import emailjs from "@emailjs/browser";

const baseButton =
  "flex items-center justify-center px-4 py-2 rounded-lg transition-colors text-sm font-medium";

const buttonVariants = {
  outline:
    "group relative px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 border border-white text-white hover:bg-white hover:text-black",
};

const Contact = ({ hasAnimated }) => {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    setSending(true);

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        formRef.current,
        "YOUR_PUBLIC_KEY",
      )
      .then(() => {
        alert("Message sent successfully");
        formRef.current.reset();
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to send message");
      })
      .finally(() => setSending(false));
  };

  const contactLinksWithIcons = contactLinks.map((link) => {
    let icon;

    switch (link.label) {
      case "Email":
        icon = <Mail className="w-5 h-5 mr-2" />;
        break;
      case "Github":
        icon = <Github className="w-5 h-5 mr-2" />;
        break;
      default:
        icon = <Instagram className="w-5 h-5 mr-2" />;
    }

    return { ...link, icon };
  });

  return (
    <section
      id="contact"
      className="relative min-h-screen py-16 px-6 md:px-10 surface"
    >
      <div className="max-w-6xl mx-auto text-center px-6">
        <div
          className={`transition-all duration-1000 delay-500 ${hasAnimated.contact ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl md:text-6xl font-bold mb-10 text-primary">
            LET'S WORK TOGETHER
          </h2>
          <p className="text-xl text-primary mb-10 max-w-3xl mx-auto">
            I'm always interested in new opportunities and exciting projects.
            Feel free to reach out if you'd like to collaborate or just say
            hello !
          </p>

          <div className="grid md:grid-cols-2 gap-12 md:gap-24 max-w-7xl mx-auto mt-12 w-full">
            {/* Left Side Contact Buttons */}
            <div className="flex flex-col items-center justify-end text-center gap-6 w-full h-full">
              <div className="text-primary text-sm">
                <h2 className="text-2xl">Kolkata, India</h2>
              </div>
              <div className="flex flex-row flex-wrap gap-4 justify-center">
                {contactLinksWithIcons.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`${baseButton} ${buttonVariants[link.variant]}`}
                  >
                    {link.icon}
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Side Contact Form */}
            <form
              ref={formRef}
              onSubmit={sendEmail}
              className="flex flex-col gap-8 w-full text-left"
            >
              {/* Name Details */}
              <div className="flex flex-col gap-3">
                <h2 className="text-sm tracking-[0.25em] uppercase text-primary/70">
                  Your Name
                </h2>
                <input
                  type="text"
                  name="user_name"
                  placeholder="XYZ"
                  required
                  className="border-b border-gray-700 bg-transparent pb-5 outline-none text-primary text-2xl md:text-3xl font-semibold placeholder:text-primary/40 focus:border-white transition-colors duration-300"
                />
              </div>
              {/* Email Details */}
              <div className="flex flex-col gap-3">
                <h2 className="text-sm tracking-[0.25em] uppercase text-primary/70">
                  Your Email
                </h2>
                <input
                  type="email"
                  name="user_email"
                  placeholder="xyz@example.com"
                  required
                  className="border-b border-gray-700 bg-transparent pb-5 outline-none text-primary text-2xl md:text-3xl font-semibold placeholder:text-primary/40 focus:border-white transition-colors duration-300"
                />
              </div>
              {/* Message  */}
              <div className="flex flex-col gap-3">
                <h2 className="text-sm tracking-[0.25em] uppercase text-primary/70">
                  Your Message
                </h2>
                <textarea
                  name="message"
                  rows="2"
                  placeholder="Tell me about your project..."
                  required
                  className="border-b border-gray-700 bg-transparent pb-5 outline-none text-primary text-2xl md:text-3xl font-semibold placeholder:text-primary/40 resize-none focus:border-white transition-colors duration-300"
                />
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                disabled={sending}
                className="mt-4 inline-flex items-center gap-2 self-center md:self-start px-5 py-3 md:px-6 md:py-4 bg-white text-black rounded-full font-medium tracking-wide hover:scale-105 transition-transform duration-200 disabled:opacity-50"
              >
                {sending ? "Sending..." : "Send Message"}
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
