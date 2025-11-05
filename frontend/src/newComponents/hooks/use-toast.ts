type ToastOptions = {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
};

export function useToast() {
  // Minimal stub; replace with actual toast system if desired
  function toast({ title, description, variant = 'default' }: ToastOptions) {
    // eslint-disable-next-line no-console
    console.log(`[toast:${variant}]`, title ?? '', description ?? '');
  }
  return { toast };
}


