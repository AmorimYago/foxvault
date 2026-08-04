import { AlertCircle, X } from "lucide-react";

type UploadValidationMessageProps = {
  messages: string[];
  onDismiss: () => void;
};

export function UploadValidationMessage({
  messages,
  onDismiss,
}: UploadValidationMessageProps) {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div
      role="alert"
      className="rounded-xl border border-red-500/20 bg-red-500/10 p-4"
    >
      <div className="flex items-start gap-3">
        <AlertCircle
          aria-hidden="true"
          className="mt-0.5 size-5 shrink-0 text-red-400"
        />

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-red-300">
            Algumas imagens não puderam ser adicionadas
          </p>

          <ul className="mt-2 space-y-1 text-sm text-red-300/80">
            {messages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Fechar mensagens de validação"
          className="cursor-pointer rounded-lg p-1 text-red-300/70 transition-colors hover:bg-red-500/10 hover:text-red-200"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      </div>
    </div>
  );
}