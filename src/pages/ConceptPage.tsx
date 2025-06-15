
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { concepts } from '@/data/statistical-concepts';
import NotFound from './NotFound';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import AnovaSimulation from '@/components/AnovaSimulation';
import ChiSquaredTestSimulation from '@/components/ChiSquaredTestSimulation';
import BayesianVsFrequentistSimulation from '@/components/BayesianVsFrequentistSimulation';
import PCASimulation from '@/components/PCASimulation';
import KMeansClusteringSimulation from '@/components/KMeansClusteringSimulation';
import DecisionTreesSimulation from '@/components/DecisionTreesSimulation';
import NaiveBayesSimulation from '@/components/NaiveBayesSimulation';
import SupportVectorMachineSimulation from '@/components/SupportVectorMachineSimulation';
import BigDataSimulation from '@/components/BigDataSimulation';
import DataVisualisationSimulation from '@/components/DataVisualisationSimulation';
import TimeSeriesAnalysisSimulation from '@/components/TimeSeriesAnalysisSimulation';
import LogisticRegressionSimulation from '@/components/LogisticRegressionSimulation';
import MachineLearningSimulation from '@/components/MachineLearningSimulation';
import SamplingSimulation from '@/components/SamplingSimulation';
import FactorAnalysisSimulation from '@/components/FactorAnalysisSimulation';

const ConceptPage = () => {
  const { id } = useParams<{ id: string }>();
  const concept = concepts.find((c) => c.id === id);

  if (!concept) {
    return <NotFound />;
  }
  
  const SimulationHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-serif font-bold">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );

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
                {concept.id === 'central-limit-theorem' && (
                  <section>
                    <SimulationHeader title="Interactive Simulation" subtitle="An 'Animalistic' take on the Central Limit Theorem" />
                    <CentralLimitTheoremSimulation />
                  </section>
                )}

                {concept.id === 'correlation' && (
                  <section>
                    <SimulationHeader title="Interactive Simulation" subtitle="An 'Animalistic' look at Correlation" />
                    <CorrelationSimulation />
                  </section>
                )}

                {concept.id === 'hypothesis-testing' && (
                  <section>
                    <SimulationHeader title="Interactive Simulation" subtitle="An 'Animalistic' look at Hypothesis Testing" />
                    <HypothesisTestingSimulation />
                  </section>
                )}

                {concept.id === 'p-value' && (
                  <section>
                    <SimulationHeader title="Interactive Simulation" subtitle="A 'Judgemental' look at p-values" />
                    <PValueSimulation />
                  </section>
                )}

                {concept.id === 'type-i-and-type-ii-errors' && (
                  <section>
                    <SimulationHeader title="Interactive Simulation" subtitle="The Oracle's Dilemma of Type I & II Errors" />
                    <TypeErrorsSimulation />
                  </section>
                )}

                {concept.id === 'law-of-large-numbers' && (
                  <section>
                    <SimulationHeader title="Interactive Simulation" subtitle="A 'Draconic' look at the Law of Large Numbers" />
                    <LawOfLargeNumbersSimulation />
                  </section>
                )}

                {concept.id === 'maximum-likelihood-estimation' && (
                  <section>
                    <SimulationHeader title="Interactive Simulation" subtitle="An 'Animalistic' look at Maximum Likelihood Estimation" />
                    <MaximumLikelihoodEstimationSimulation />
                  </section>
                )}

                {(concept.id === 'regression-analysis' || concept.id === 'linear-regression') && (
                  <section>
                    <SimulationHeader title="Interactive Simulation" subtitle="An 'Animalistic' look at Regression Analysis" />
                    <RegressionAnalysisSimulation />
                  </section>
                )}

                {concept.id === 'logistic-regression' && (
                    <section>
                        <SimulationHeader title="Interactive Simulation" subtitle="A 'Predictive' look at Logistic Regression" />
                        <LogisticRegressionSimulation />
                    </section>
                )}

                {concept.id === 'confidence-intervals' && (
                  <section>
                    <SimulationHeader title="Interactive Simulation" subtitle="An 'Animalistic' look at Confidence Intervals" />
                    <ConfidenceIntervalsSimulation />
                  </section>
                )}

                {concept.id === 'bootstrapping' && (
                  <section>
                    <SimulationHeader title="Interactive Simulation" subtitle="An 'Animalistic' look at Bootstrapping" />
                    <BootstrappingSimulation />
                  </section>
                )}

                {concept.id === 'bayesian-inference' && (
                  <section>
                    <SimulationHeader title="Interactive Simulation" subtitle="A 'Mystical' look at Bayesian Inference" />
                    <BayesianInferenceSimulation />
                  </section>
                )}

                {concept.id === 'ab-testing' && (
                  <section>
                    <SimulationHeader title="Interactive Simulation" subtitle="An 'Alchemical' look at A/B Testing" />
                    <ABTestingSimulation />
                  </section>
                )}
                
                {(concept.id === 'mcmc-methods' || concept.id === 'monte-carlo-simulation') && (
                    <section>
                        <SimulationHeader title="Interactive Simulation" subtitle="A 'Cryptid' look at MCMC" />
                        <MCMCSimulation />
                    </section>
                )}

                {concept.id === 'standard-deviation' && (
                  <section>
                    <SimulationHeader title="Interactive Simulation" subtitle="A 'Fiery' look at Standard Deviation" />
                    <StandardDeviationSimulation />
                  </section>
                )}

                {concept.id === 'anova' && (
                    <section>
                        <SimulationHeader title="Interactive Simulation" subtitle="A 'Bestial' look at ANOVA" />
                        <AnovaSimulation />
                    </section>
                )}

                {concept.id === 'chi-squared-test' && (
                    <section>
                        <SimulationHeader title="Interactive Simulation" subtitle="A 'Cartographical' look at the Chi-Squared Test" />
                        <ChiSquaredTestSimulation />
                    </section>
                )}

                {concept.id === 'bayesian-vs-frequentist' && (
                    <section>
                        <SimulationHeader title="Interactive Simulation" subtitle="An 'Oracular' look at Bayesian vs. Frequentist methods" />
                        <BayesianVsFrequentistSimulation />
                    </section>
                )}

                {(concept.id === 'dimensionality-reduction' || concept.id === 'pca') && (
                    <section>
                        <SimulationHeader title="Interactive Simulation" subtitle="A 'Drifting' look at Dimensionality Reduction (PCA)" />
                        <PCASimulation />
                    </section>
                )}

                {(concept.id === 'k-means-clustering' || concept.id === 'cluster-analysis') && (
                    <section>
                        <SimulationHeader title="Interactive Simulation" subtitle="A 'Kingdom' view of K-Means Clustering" />
                        <KMeansClusteringSimulation />
                    </section>
                )}

                {concept.id === 'decision-trees' && (
                    <section>
                        <SimulationHeader title="Interactive Simulation" subtitle="An 'Oracle's Grove' look at Decision Trees" />
                        <DecisionTreesSimulation />
                    </section>
                )}

                {concept.id === 'naive-bayes' && (
                    <section>
                        <SimulationHeader title="Interactive Simulation" subtitle="A 'Scribe's Filter' for Naive Bayes" />
                        <NaiveBayesSimulation />
                    </section>
                )}

                {concept.id === 'svm' && (
                    <section>
                        <SimulationHeader title="Interactive Simulation" subtitle="A 'Guardian's Blade' view of Support Vector Machines" />
                        <SupportVectorMachineSimulation />
                    </section>
                )}

                {concept.id === 'machine-learning' && (
                    <section>
                        <SimulationHeader title="Interactive Simulation" subtitle="A 'Conceptual' look at Machine Learning" />
                        <MachineLearningSimulation />
                    </section>
                )}

                {concept.id === 'sampling' && (
                    <section>
                        <SimulationHeader title="Interactive Simulation" subtitle="A 'Wild' look at Sampling" />
                        <SamplingSimulation />
                    </section>
                )}

                {concept.id === 'big-data' && (
                    <section>
                        <SimulationHeader title="Interactive Simulation" subtitle="The Leviathan's Data (Big Data)" />
                        <BigDataSimulation />
                    </section>
                )}

                {concept.id === 'data-visualisation' && (
                    <section>
                        <SimulationHeader title="Interactive Simulation" subtitle="The Scryer's Easel (Data Visualisation)" />
                        <DataVisualisationSimulation />
                    </section>
                )}

                {concept.id === 'time-series-analysis' && (
                    <section>
                        <SimulationHeader title="Interactive Simulation" subtitle="The Oracle's Chronometer (Time Series Analysis)" />
                        <TimeSeriesAnalysisSimulation />
                    </section>
                )}

                {concept.id === 'factor-analysis' && (
                    <section>
                        <SimulationHeader title="Interactive Simulation" subtitle="The Alchemist's Essence (Factor Analysis)" />
                        <FactorAnalysisSimulation />
                    </section>
                )}
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
