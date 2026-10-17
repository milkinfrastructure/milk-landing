# Merge notes

Sources read: Agent Store `inputs/agent-instructions-v2-proposal.md`, Standing prompt only, and `inputs/ponytail.tgz` at `ponytail/5.3.2/skills/ponytail/SKILL.md`. Nothing active was changed.

## Dropped or changed

- Ponytail YAML frontmatter and the `# Ponytail` title. Dropped. Skill metadata, not standing instructions.
- "You are a lazy senior developer." Dropped. Conflicts with the standing persona. His sentence wins: "Work like a staff engineer accountable for the result."
- "The best code is the code never written." Dropped. Conflicts with finishing the requested outcome and treating missing implementation as work to do.
- "You solve the whole problem with the least new code." Dropped. "Least" conflicts with keeping complexity that protects an invariant. "Make the smallest sufficient correction" and "economical about implementation" are the sentences that stay.
- "End your reply with one or two lines: what you skipped or did not check, and any risk the user must know." Dropped. Mapped to "At completion, distinguish what changed, what was checked, and what remains."
- "Active for the whole session until the user says "stop ponytail" or "normal mode". Switch level: `/ponytail lite|full|ultra`." Dropped. Session activation, not standing instructions.
- Heading "Before you write". Dropped. The two sentences that remain sit under "Start from the real system".
- "Read the task and the code it touches." Dropped. Same instruction as "For engineering, read the relevant existing code and configuration before designing," which also names configuration and timing.
- "That is scope." Dropped. Conflicts with his scope: current state, authorized scope, exclusions, and evidence of done.
- "Extra features are not." Dropped. Less precise than ladder step 1, which stays: skip features, options, and flexibility nobody asked for.
- "Prefer the existing core, tools, and platform mechanisms." Dropped from his paragraph. The ladder is the same preference, with order and the exceptions (house component, no dependency for a few lines).
- "Be lazy about the solution, never about the change itself:" removed from the front of that bullet. "Lazy" conflicts with the staff-engineer persona. Kept the rest verbatim: "Finish every part the task needs, including the callers, tests and fixtures your change breaks."
- "Deletion beats addition." Removed from the abstraction bullet. Less precise than "When replacing a design, remove what the replacement makes obsolete; add compatibility only for a real requirement."
- "The shortest working diff wins, once you know everything it must touch." Dropped. Conflicts with keeping complexity for a named invariant. "Smallest sufficient correction" is the rule that stays. Kept "A one-liner that needs decoding is not short."
- "Lazy code without its check is unfinished: new non-trivial logic (a branch, a loop, a parser, money or security, or a whole new script or app) leaves one small test or an assert-based self-check. Trivial changes need none." Dropped. A required test conflicts with "Match verification to the consequence and the requested result," including a waived check.
- Levels heading marked "(optional)" and moved to the end. Table cells are unchanged. Lite's "let the user pick" and ultra's "push back" do not override "ask only when a missing decision or authority materially changes what you can do" or "Do not silently reduce the outcome."

## Review cases

- Later CLI spec reverses an earlier command: pass. Apply the latest correction only to that decision, keep unrelated constraints, and remove the behavior the replacement makes obsolete.
- Current scan clean, historical reads fail: pass. A sample proves only its observed scope, and a blocked check states exactly what remains unverified.
- Four approved deletions, restore tests waived: pass. Reuse the approval, do not ask again, match checks to the request, and verify at the actual entry point.
- Exploratory localhost whiteboard: pass. A vague request gets the smallest version that does the core job, with no speculative production process and no cut to the requested interaction.
- Create request loses its response: pass. Before retrying an uncertain external write, reconcile whether it already happened.
- Worker reports success: pass. A worker report is not completion; inspect the result and rerun checks invalidated by combining it.
- Markdown prompt proposal requested: pass. Deliver that proposal. It is not an approved decision, and it does not become a new instruction or a memory authorization.
