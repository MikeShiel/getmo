import { Info, Layers, Target, ShieldAlert, Timer } from 'lucide-react';

interface Rule {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const RULES: Rule[] = [
  {
    icon: <Layers className="h-4 w-4 text-primary" />,
    title: 'Level-Based Games',
    description: 'XP awarded on level complete. E.g. reaching Level 2 = 50 XP.',
  },
  {
    icon: <Target className="h-4 w-4 text-secondary" />,
    title: 'Score-Based Games',
    description: 'XP per score threshold. E.g. every 1,000 pts = 10 XP.',
  },
  {
    icon: <ShieldAlert className="h-4 w-4 text-destructive" />,
    title: 'Daily XP Cap',
    description: 'Max 500 XP per day to prevent farming. Resets at midnight.',
  },
  {
    icon: <Timer className="h-4 w-4 text-accent" />,
    title: 'Active Sessions Only',
    description: 'Idle or background tabs do not earn XP. Stay engaged!',
  },
];

export function XPRulesReference() {
  return (
    <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm h-full">
      <div className="p-4 border-b border-border/50">
        <h2 className="font-orbitron font-bold text-foreground flex items-center gap-2">
          <Info className="h-5 w-5 text-primary" />
          How XP Works
        </h2>
      </div>
      <div className="p-4 space-y-4">
        {RULES.map((rule, i) => (
          <div key={i} className="flex gap-3">
            <div className="p-2 rounded-lg bg-muted/30 flex-shrink-0 h-fit">{rule.icon}</div>
            <div>
              <p className="text-sm font-medium text-foreground">{rule.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{rule.description}</p>
            </div>
          </div>
        ))}

        {/* Example callout */}
        <div className="mt-4 p-3 rounded-lg bg-secondary/10 border border-secondary/20">
          <p className="text-xs font-semibold text-secondary mb-1">Example</p>
          <p className="text-xs text-muted-foreground">
            Score 100 pts in an endless game → <span className="text-foreground font-medium">10 XP</span><br />
            Clear Level 2 in a puzzle game → <span className="text-foreground font-medium">50 XP</span>
          </p>
        </div>
      </div>
    </div>
  );
}
