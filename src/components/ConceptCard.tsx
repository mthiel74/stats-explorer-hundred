
import { Link } from 'react-router-dom';
import { Concept } from '@/data/statistical-concepts';
import { ArrowRight } from 'lucide-react';

interface ConceptCardProps {
  concept: Concept;
}

const ConceptCard = ({ concept }: ConceptCardProps) => {
  return (
    <Link 
      to={`/concept/${concept.id}`} 
      className="group block p-6 bg-card border rounded-lg hover:shadow-lg transition-shadow duration-300"
    >
      <h3 className="text-xl font-serif font-bold text-primary mb-2">{concept.title}</h3>
      <p className="text-muted-foreground mb-4">{concept.summary}</p>
      <div className="flex items-center text-primary font-semibold">
        Learn more
        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};

export default ConceptCard;
