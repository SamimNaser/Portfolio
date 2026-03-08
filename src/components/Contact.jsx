import React, { useRef, useState } from "react";
import { Mail, Github, Instagram, Send } from "lucide-react";
import { contactLinks } from "../data/contact";
import emailjs from "@emailjs/browser";
import { TerminalDemo } from "./TerminalDemo";

const baseButton =
  "flex items-center justify-center px-4 py-2 rounded-lg transition-colors text-sm font-medium";

const buttonVariants = {
  outline:
    "group relative px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 border border-white text-white hover:bg-white hover:text-black",
};

const Contact = ({ hasAnimated }) => {
  const formRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    setSending(true);

    emailjs
      .sendForm(
        "service_j6bsdy7",
        "template_ew8imgf",
        formRef.current,
        "OPD_l8mGrU6cllLUN",
      )
      .then(() => {
        setStatus({
          type: "success",
          text: "Message sent successfully. I'll get back to you soon.",
        });
        formRef.current.reset();
      })
      .catch((err) => {
        console.error(err);
        setStatus({
          type: "error",
          text: "Failed to send message. Please try again.",
        });
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
      className="relative scroll-mt-24 py-14 md:py-20 px-6 md:px-10 surface"
    >
      <div className="max-w-6xl mx-auto text-center justify-center px-6">
        <div
          className={`transition-all duration-1000 delay-500 ${hasAnimated.contact ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-primary">
            LET'S WORK TOGETHER
          </h2>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 max-w-7xl mx-auto justify-center mt-10 w-full">
            {/* Left Side */}
            <div className="flex flex-col items-center justify-end text-center gap-6 w-full h-full">
              {/* Terminal Animation */}
              <div className="text-left w-full md:w-5/6 max-w-xl mx-auto h-78 md:h-full overflow-hidden">
                <TerminalDemo />
              </div>
              {/* Location Details */}
              <div className="text-primary text-sm">
                <h2 className="text-2xl">Kolkata,India</h2>
              </div>
              {/* Contact Buttons */}
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
              {status && (
                <div
                  className={`flex items-center gap-2 mt-4 text-sm font-bold ${status.type === "success" ? "text-green-500" : "text-red-400"}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full animate-pulse ${status.type === "success" ? "bg-green-500" : "bg-red-400"}`}
                  ></span>
                  <h2>{status.text}</h2>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
