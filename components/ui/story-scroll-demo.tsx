'use client';

import FlowArt, { FlowSection } from '@/components/ui/story-scroll';

export default function StoryScrollDemo() {
  return (
    <FlowArt aria-label="Flow Art presentation">
      <FlowSection aria-label="Who I AM" style={{ backgroundColor: '#fd5200', color: '#fff' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]">01 — WHO I AM</p>
        <hr className="my-[2vw] border-none border-t border-black opacity-100" />
        <div>
          <h1 className="text-[clamp(2.5rem,8.5vw,9rem)] font-bold leading-[0.9] uppercase tracking-tight">
            BUILD
            <br />
            Without
            <br />
            Limits
          </h1>
        </div>
        <hr className="my-[2vw] border-none border-t border-black opacity-100" />
        <p className="mt-auto max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
          I'm a CSE student at VIT Vellore who
doesn't wait to be assigned problems — I find them,
build for them, and ship. No excuses, no shortcuts,
just clean systems and real output.
        </p>
      </FlowSection>

      <FlowSection aria-label="The mission" style={{ backgroundColor: '#000', color: '#fff' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]">02 — The mission</p>
        <hr className="my-[2vw] border-none border-t border-white/60" />
        <div>
          <h2 className="text-[clamp(2.5rem,8.5vw,9rem)] font-bold leading-[0.9] uppercase tracking-tight">
            IMPACT
            <br />
            OVER
            <br />
            NOISE
          </h2>
        </div>
        <hr className="my-[2vw] border-none border-t border-white/60" />
        <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
          Not here to fill a GitHub with dead repos.
Every line of code I write has a purpose —
to solve something real, for someone real.
        </p>
        <hr className="my-[2vw] border-none border-t border-white/60" />
        <div className="flex flex-wrap gap-[3vw]">
          <div className="min-w-45 flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">CURIOSITY</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              I don't stop at "it works." I dig into
why it works, break it, and rebuild it
better every single time.
            </p>
          </div>
          <div className="min-w-45 flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">CRAFT</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              Clean architecture, intentional design,
and code that the next developer
actually wants to read.
            </p>
          </div>
          <div className="min-w-45 flex-1">
            <p className="mb-2 text-sm font-bold uppercase tracking-wider">IMPACT</p>
            <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-75">
              If it doesn't solve a real problem,
it doesn't ship. Every project starts
with a why, not a what.
            </p>
          </div>
        </div>
      </FlowSection>

      <FlowSection aria-label="How it works" style={{ backgroundColor: '#F5F0E8', color: '#000' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]">03 — HOW I WORK</p>
        <hr className="my-[2vw] border-none border-t border-black/60" />
        <div>
          <h2 className="text-[clamp(2.5rem,8.5vw,9rem)] font-bold leading-[0.9] uppercase tracking-tight">
            THINK.
            <br />
            BUILD.
            <br />
            SHIP.
          </h2>
        </div>
        <hr className="my-[2vw] border-none border-t border-black/60" />
        <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
          No overcomplicated process. Just clear thinking,
deliberate execution, and something real at the end.
        </p>
      </FlowSection>

      <FlowSection aria-label="The vision" style={{ backgroundColor: '#1A3DE8', color: '#fff' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]">04 — The vision</p>
        <hr className="my-[2vw] border-none border-t border-white/50" />
        <div>
          <h2 className="text-[clamp(2.5rem,8.5vw,9rem)] font-bold leading-[0.9] uppercase tracking-tight">
            BUILT
            <br />
            TO
            <br />
            LEAD.
          </h2>
        </div>
        <hr className="my-[2vw] border-none border-t border-white/50" />
        <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
          Not just to write code — but to architect
the systems, lead the teams, and define
the standards that the next generation
of engineers will build on.
        </p>
      </FlowSection>

      <FlowSection aria-label="Join us" style={{ backgroundColor: '#000', color: '#fff' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em]">05 — LET'S TALK</p>
        <hr className="my-[2vw] border-none border-t border-white/60" />
        <div>
          <h2 className="text-[clamp(2.5rem,8.5vw,9rem)] font-bold leading-[0.9] uppercase tracking-tight">
            GOT AN
            <br />
            IDEA?
            <br />
            LET'S BUILD.
          </h2>
        </div>
        <hr className="my-[2vw] border-none border-t border-white/60" />
        <p className="mt-auto max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
          Whether it's an internship, a collaboration, or just
a problem worth solving — my inbox is open.
        </p>
      </FlowSection>
    </FlowArt>
  );
}
