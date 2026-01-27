import { useMemo } from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

interface StrengthCriteria {
  label: string;
  met: boolean;
}

function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
  criteria: StrengthCriteria[];
} {
  const criteria: StrengthCriteria[] = [
    { label: 'At least 6 characters', met: password.length >= 6 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Contains number', met: /\d/.test(password) },
    { label: 'Contains special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  const score = criteria.filter((c) => c.met).length;

  let label: string;
  let color: string;

  if (score === 0) {
    label = '';
    color = 'bg-muted';
  } else if (score <= 2) {
    label = 'Weak';
    color = 'bg-destructive';
  } else if (score <= 3) {
    label = 'Fair';
    color = 'bg-orange-500';
  } else if (score <= 4) {
    label = 'Good';
    color = 'bg-yellow-500';
  } else {
    label = 'Strong';
    color = 'bg-green-500';
  }

  return { score, label, color, criteria };
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const { score, label, color, criteria } = useMemo(
    () => getPasswordStrength(password),
    [password]
  );

  if (!password) return null;

  return (
    <div className="space-y-3 mt-2">
      {/* Strength bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Password strength</span>
          <span className={score >= 4 ? 'text-green-500' : score >= 3 ? 'text-yellow-500' : 'text-muted-foreground'}>
            {label}
          </span>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                level <= score ? color : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Criteria checklist */}
      <ul className="space-y-1">
        {criteria.map((criterion) => (
          <li
            key={criterion.label}
            className={`flex items-center gap-2 text-xs transition-colors ${
              criterion.met ? 'text-green-500' : 'text-muted-foreground'
            }`}
          >
            {criterion.met ? (
              <Check className="h-3 w-3" />
            ) : (
              <X className="h-3 w-3" />
            )}
            {criterion.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
