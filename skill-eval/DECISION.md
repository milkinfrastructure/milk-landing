# Decision

No. These two inputs do not make one reusable skill.

A skill here is one file an agent loads for one specific trigger. Ponytail is already a plugin with its own always-on rules, session hooks, and several separately triggered commands. The standing-instructions proposal is a global operating prompt, and it says so. Putting them in one skill would mix two loaders, two defaults, and two reply styles, and it would be less useful than leaving each where it already belongs.

## What ponytail does

Ponytail 5.3.2 makes a coding agent behave like a lazy senior developer: read the task and the code it touches, then solve the whole task with the least new code. Before writing, it stops at the first rung that fully works: skip anything nobody asked for, reuse what this codebase already has, then the standard library or platform, then an installed dependency, then one clear line, and only then the minimum new code. It does not cut trust-boundary validation, error handling that prevents data loss, security, accessibility, or anything the user asked for. New non-trivial logic keeps one small test, and a deliberate shortcut is marked `shortcut:` with its ceiling and when to revisit it.

Hooks load that ruleset at session start, pass it to subagents, and track a level for the session: lite, full (the default), ultra, or off. Ultra also pushes back on parts of the request the need does not justify. Separate commands do one-shot work and, except for switching level, do not edit code: `/ponytail-review` reviews a diff, `/ponytail-audit` ranks the same checks over a repo, `/ponytail-debt` lists shortcut comments, and `/ponytail-gain` prints the published benchmark. In Codex those commands are skills under the plugin namespace.

## What the proposal does

`uploads/agent-instructions-v2-proposal.md` was not in this workspace, so this is the task's account of that file, not a line reading of it. It is a second draft of standing instructions for how one agent should work on every task: staff-engineer execution, a minimal-correction loop, proportional verification, delegation, memory used as sourced context, and plain communication. It is not a procedure for one kind of task. The draft itself says this standing prompt belongs in global user instructions, not in a per-task skill.

## Why one skill is the wrong artifact

The two overlap on purpose and still do not combine. Both want the existing code read before new code is written, both want the change kept small, and both refuse to drop safety to get there. That is enough for them to run in the same session. It is not a shared trigger.

A combined skill would be worse than either alone. The standing prompt would fire on every turn, which is what global instructions are for, while ponytail's review, audit, debt, and gain commands would fire only when asked. One trigger line cannot mean both. Folding the plugin into a skill would also drop the hooks that inject the ruleset and remember the level. Folding the standing prompt into the plugin would ignore the draft's own placement.

## Conflicts

- **When it loads.** Ponytail's rules are injected every session until the user turns them off, and its other commands are explicit one-shots. The proposal is standing policy for every task and, by its own terms, is not a skill. A milk skill is neither of those loaders.
- **Default posture.** Ponytail's voice is the lazy senior: the best code is the code never written, and ultra mode questions the request before building. Staff-engineer execution plus a correction loop carries the objective through to a finished result. Those are different defaults for the same turn.
- **Verification.** Ponytail leaves one small test on non-trivial logic and otherwise treats review and audit as reports that change nothing. A minimal-correction loop with proportional verification is how the work gets finished. One skill would make "review" mean both "stop and report" and "keep correcting."
- **Tone and length.** Ponytail ends replies with what was skipped and any risk, and a review is a full numbered report with four parts per finding. The proposal asks for plain communication. Always-on rules plus that report template are two lengths of answer.
- **Modes.** Ponytail has lite, full, ultra, and off, stored for the session and switched with `/ponytail`. A standing prompt has no second intensity ladder. Ultra's pushback can fight an instruction to execute the objective.
- **Memory and delegation.** The proposal covers delegation and treats memory as sourced context. Ponytail does not. Its session hook can add a codebase map so reuse is cheaper, and the Claude Code band stores local cost metrics. Those are not a delegation policy or sourced memory. A merged skill would have to invent that half.

## Where each belongs

The standing prompt belongs in `~/.codex/AGENTS.md`, as global user instructions. It then applies to every Codex thread without a skill trigger.

Ponytail stays the Codex plugin it already is: marketplace `DietrichGebert/ponytail`, plugin `ponytail@ponytail` at v5.3.2, with its two lifecycle hooks trusted. Its commands stay plugin skills (`$ponytail:ponytail-review` and the others). Rewriting that plugin as one milk skill would drop the hooks, the level flag, and the separate commands.

If both are on, `~/.codex/AGENTS.md` can say in one line whether ponytail's lazy default and ultra pushback may override the standing prompt. That is precedence between two layers, not a third document.

## Source limit

This workspace had no `uploads/` directory, so the proposal file and `ponytail.tgz` could not be unpacked from there. Ponytail above is the published v5.3.2 tree: `README.md`, `AGENTS.md`, `skills/`, `commands/` (`ponytail`, `ponytail-audit`, `ponytail-review`, `ponytail-debt`, `ponytail-gain`, `ponytail-help`), and `hooks/`, with `.codex-plugin/plugin.json` at version 5.3.2. The proposal section uses only what this task says the draft contains and where the draft says it belongs. No combined skill was written.
