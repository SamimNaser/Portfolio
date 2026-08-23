import { AnimatedSpan, Terminal, TypingAnimation } from "./ui/terminal";

export function TerminalDemo() {
  return (
    <Terminal>
      <TypingAnimation>&gt; ./connect --user samim</TypingAnimation>

      <AnimatedSpan className="text-muted-foreground">
        Initializing connection…
      </AnimatedSpan>

      <AnimatedSpan className="text-green-500">
        ✓ Developer profile loaded
      </AnimatedSpan>

      <AnimatedSpan className="text-green-500">
        ✓ Projects indexed
      </AnimatedSpan>

      <AnimatedSpan className="text-green-500">
        ✓ Communication channel ready
      </AnimatedSpan>

      <AnimatedSpan className="text-blue-500">
        Status: Available
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
