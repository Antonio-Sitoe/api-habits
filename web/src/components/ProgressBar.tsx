interface ProgressBarProps {
  progress: number;
}
export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-3 rounded-3xl bg-zinc-700 w-full mt-4">
      <div
        role="progressbar"
        aria-label="progresso de habitos completados nesse dia"
        aria-aria-valuenow={progress}
        className="h-3 rounded-3xl bg-violet-600 w-3/4"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
