
import { BarChart3 } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-6 border-b">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <BarChart3 className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-serif font-bold">
            Statistical Concepts
          </h1>
        </a>
      </div>
    </header>
  );
};

export default Header;
