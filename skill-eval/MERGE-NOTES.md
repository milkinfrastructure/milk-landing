# Merge notes

Sources read: Agent Store `inputs/agent-instructions-v2-proposal.md`, Standing prompt only, and `inputs/ponytail.tgz` at `ponytail/5.3.2/skills/ponytail/SKILL.md`. The initial merge changed no active instructions. The reviewed revision is approved for installation as the global AGENTS.md.

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
- Removed the optional levels from the standing prompt. A mode must not reopen approved scope or introduce unnecessary approval questions.
- Permit implementation details required by the requested outcome or an invariant; reject speculative additions. Fix a bug at its owning layer, using shared code only for a shared invariant.
- Restore the live rules against questioning unfamiliar or unpublished model names and against unsolicited analysis files.

## Static review cases

These are reasoning checks of the written instructions, not executed agent trials or evidence of runtime improvement. Installing the file does not show that a running session has reloaded it.

- Later CLI spec reverses an earlier command: Apply the latest correction only to that decision, keep unrelated constraints, and remove the behavior the replacement makes obsolete.
- Current scan clean, historical reads fail: A sample proves only its observed scope, and a blocked check states exactly what remains unverified.
- Four approved deletions, restore tests waived: Reuse the approval, do not ask again, match checks to the request, and verify at the actual entry point.
- Exploratory localhost whiteboard: A vague request gets the smallest version that does the core job, with no speculative production process and no cut to the requested interaction.
- Create request loses its response: Before retrying an uncertain external write, reconcile whether it already happened.
- Worker reports success: A worker report is not completion; inspect the result and rerun checks invalidated by combining it.
- Markdown prompt proposal requested: Deliver that proposal. It is not an approved decision, and it does not become a new instruction or a memory authorization.
