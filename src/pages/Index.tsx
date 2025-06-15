
import Header from '@/components/Header';
import ConceptCard from '@/components/ConceptCard';
import { concepts } from '@/data/statistical-concepts';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Explore Statistical Concepts</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A curated collection of essential statistical ideas, explained simply. Dive in and expand your knowledge.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {concepts.map((concept) => (
            <ConceptCard key={concept.id} concept={concept} />
          ))}
        </div>
      </main>
      <footer className="py-6 border-t mt-12">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Statistical Concepts. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
