import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { concepts } from '@/data/statistical-concepts';
import NotFound from './NotFound';
import CentralLimitTheoremSimulation from '@/components/CentralLimitTheoremSimulation';
import CorrelationSimulation from '@/components/CorrelationSimulation';
import HypothesisTestingSimulation from '@/components/HypothesisTestingSimulation';
import MaximumLikelihoodEstimationSimulation from '@/components/MaximumLikelihoodEstimationSimulation';
import RegressionAnalysisSimulation from '@/components/RegressionAnalysisSimulation';
import ConfidenceIntervalsSimulation from '@/components/ConfidenceIntervalsSimulation';
import BootstrappingSimulation from '@/components/BootstrappingSimulation';
import BayesianInferenceSimulation from '@/components/BayesianInferenceSimulation';
import ABTestingSimulation from '@/components/ABTestingSimulation';
import MCMCSimulation from '@/components/MCMCSimulation';
import StandardDeviationSimulation from '@/components/StandardDeviationSimulation';
import PValueSimulation from '@/components/PValueSimulation';
import TypeErrorsSimulation from '@/components/TypeErrorsSimulation';
import LawOfLargeNumbersSimulation from '@/components/LawOfLargeNumbersSimulation';

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

        {concept.id === 'central-limit-theorem' && (
          <section className="max-w-5xl mx-auto mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Interactive Simulation</h2>
              <p className="text-muted-foreground">An "Animalistic" take on the Central Limit Theorem</p>
            </div>
            <CentralLimitTheoremSimulation />
          </section>
        )}

        {concept.id === 'correlation' && (
          <section className="max-w-5xl mx-auto mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Interactive Simulation</h2>
              <p className="text-muted-foreground">An "Animalistic" look at Correlation</p>
            </div>
            <CorrelationSimulation />
          </section>
        )}

        {concept.id === 'hypothesis-testing' && (
          <section className="max-w-5xl mx-auto mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Interactive Simulation</h2>
              <p className="text-muted-foreground">An "Animalistic" look at Hypothesis Testing</p>
            </div>
            <HypothesisTestingSimulation />
          </section>
        )}

        {concept.id === 'p-value' && (
          <section className="max-w-5xl mx-auto mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Interactive Simulation</h2>
              <p className="text-muted-foreground">A "Judgemental" look at p-values</p>
            </div>
            <PValueSimulation />
          </section>
        )}

        {concept.id === 'type-i-and-type-ii-errors' && (
          <section className="max-w-5xl mx-auto mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Interactive Simulation</h2>
              <p className="text-muted-foreground">The Oracle's Dilemma of Type I & II Errors</p>
            </div>
            <TypeErrorsSimulation />
          </section>
        )}

        {concept.id === 'law-of-large-numbers' && (
          <section className="max-w-5xl mx-auto mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Interactive Simulation</h2>
              <p className="text-muted-foreground">A "Draconic" look at the Law of Large Numbers</p>
            </div>
            <LawOfLargeNumbersSimulation />
          </section>
        )}

        {concept.id === 'maximum-likelihood-estimation' && (
          <section className="max-w-5xl mx-auto mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Interactive Simulation</h2>
              <p className="text-muted-foreground">An "Animalistic" look at Maximum Likelihood Estimation</p>
            </div>
            <MaximumLikelihoodEstimationSimulation />
          </section>
        )}

        {concept.id === 'regression-analysis' && (
          <section className="max-w-5xl mx-auto mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Interactive Simulation</h2>
              <p className="text-muted-foreground">An "Animalistic" look at Regression Analysis</p>
            </div>
            <RegressionAnalysisSimulation />
          </section>
        )}

        {concept.id === 'confidence-intervals' && (
          <section className="max-w-5xl mx-auto mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Interactive Simulation</h2>
              <p className="text-muted-foreground">An "Animalistic" look at Confidence Intervals</p>
            </div>
            <ConfidenceIntervalsSimulation />
          </section>
        )}

        {concept.id === 'bootstrapping' && (
          <section className="max-w-5xl mx-auto mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Interactive Simulation</h2>
              <p className="text-muted-foreground">An "Animalistic" look at Bootstrapping</p>
            </div>
            <BootstrappingSimulation />
          </section>
        )}

        {concept.id === 'bayesian-inference' && (
          <section className="max-w-5xl mx-auto mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Interactive Simulation</h2>
              <p className="text-muted-foreground">A "Mystical" look at Bayesian Inference</p>
            </div>
            <BayesianInferenceSimulation />
          </section>
        )}

        {concept.id === 'ab-testing' && (
          <section className="max-w-5xl mx-auto mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Interactive Simulation</h2>
              <p className="text-muted-foreground">An "Alchemical" look at A/B Testing</p>
            </div>
            <ABTestingSimulation />
          </section>
        )}
        
        {concept.id === 'mcmc-methods' && (
            <section className="max-w-5xl mx-auto mt-16">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold">Interactive Simulation</h2>
                    <p className="text-muted-foreground">A "Cryptid" look at MCMC</p>
                </div>
                <MCMCSimulation />
            </section>
        )}

        {concept.id === 'standard-deviation' && (
          <section className="max-w-5xl mx-auto mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Interactive Simulation</h2>
              <p className="text-muted-foreground">A "Fiery" look at Standard Deviation</p>
            </div>
            <StandardDeviationSimulation />
          </section>
        )}
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
