
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { concepts } from '@/data/statistical-concepts';
import NotFound from './NotFound';

const ConceptPage = () => {
  const { id } = useParams<{ id: string }>();
  const concept = concepts.find((c) => c.id === id);

  if (!concept) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto py-12">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-primary">{concept.title}</h1>
          <p className="text-xl text-muted-foreground mb-8 italic">{concept.summary}</p>
          <div className="prose prose-lg max-w-none" style={{ whiteSpace: 'pre-line' }}>
            {concept.description}
          </div>
        </article>
      </main>
      <footer className="py-6 border-t mt-12">
        <div className="container mx-auto text-center text-muted-foreground">
          <a href="/" className="hover:text-primary transition-colors">&larr; Back to all concepts</a>
        </div>
      </footer>
    </div>
  );
};

export default ConceptPage;
