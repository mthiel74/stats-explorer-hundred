
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { concepts } from '@/data/statistical-concepts';
import NotFound from './NotFound';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ConceptSimulationWrapper from '@/components/ConceptSimulationWrapper';

const ConceptPage = () => {
  const { id } = useParams<{ id: string }>();
  const concept = concepts.find((c) => c.id === id);

  if (!concept || !id) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto py-12">
        <Card className="max-w-5xl mx-auto">
          <CardHeader>
            <CardTitle className="text-4xl md:text-5xl font-serif font-bold mb-4 text-primary">{concept.title}</CardTitle>
            <CardDescription className="text-xl text-muted-foreground italic">{concept.summary}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none mb-12" style={{ whiteSpace: 'pre-line' }}>
              {concept.description}
            </div>

            <div className="mt-16 border-t pt-12">
              <ConceptSimulationWrapper conceptId={id} conceptTitle={concept.title} />
            </div>
          </CardContent>
        </Card>
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
