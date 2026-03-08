import { AnimatedSpan, Terminal, TypingAnimation } from "./ui/terminal";

export function TerminalDemo() {
  return (
    <Terminal>
      <TypingAnimation>&gt; ssh samim@portfolio.dev</TypingAnimation>

      <AnimatedSpan className="text-muted-foreground">
        Authenticating...
      </AnimatedSpan>

      <AnimatedSpan className="text-green-500">
        ✔ Identity verified
      </AnimatedSpan>

      <AnimatedSpan className="text-green-500">
        ✔ Secure channel established
      </AnimatedSpan>

      <AnimatedSpan className="text-green-500">
        ✔ Signal strength: excellent
      </AnimatedSpan>

      <AnimatedSpan className="text-green-500">
        ✔ Developer profile loaded
      </AnimatedSpan>

      <AnimatedSpan className="text-blue-500">
        ℹ Status: Available for collaboration
      </AnimatedSpan>
      <AnimatedSpan className="text-blue-500">
        ℹ Status: Always interested in new projects
      </AnimatedSpan>

      <TypingAnimation className="text-muted-foreground">
        Waiting for incoming message...
      </TypingAnimation>

      <TypingAnimation className="text-green-500 flex items-center gap-1">
        &gt; send-message
      </TypingAnimation>
    </Terminal>
  );
}
