import { Card } from '@/components/ui/card';
import { XrayIntakeForm } from '@/components/dental/XrayIntakeForm';

export default function XrayQuoteForm() {
  return (
    <main className="min-h-screen bg-secondary/30 px-4 py-8 sm:py-12">
      <Card className="mx-auto max-w-md rounded-3xl p-5 shadow-xl sm:p-7">
        <XrayIntakeForm />
      </Card>
    </main>
  );
}
