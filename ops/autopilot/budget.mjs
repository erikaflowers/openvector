// Monthly budget gate. Exit 0 = there is room for a run; exit 3 = this month's cap is reached.
//   node ops/autopilot/budget.mjs        prints "budget: $x.xx of $10.00 spent in 2026-10"
import { loadYaml, monthSpend, today } from './lib.mjs';

const cap = loadYaml('config.yaml').budget?.monthlyUsd ?? Infinity;
const spent = monthSpend();
console.log(`budget: $${spent.toFixed(2)} of $${cap.toFixed(2)} spent in ${today().slice(0, 7)}`);
process.exit(spent >= cap ? 3 : 0);
