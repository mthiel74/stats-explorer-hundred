
import React from 'react';
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
import SurvivalAnalysisSimulation from '@/components/SurvivalAnalysisSimulation';
import ZScoreSimulation from '@/components/ZScoreSimulation';
import TTestSimulation from '@/components/TTestSimulation';
import FTestSimulation from '@/components/FTestSimulation';
import VarianceSimulation from '@/components/VarianceSimulation';
import BiasSimulation from '@/components/BiasSimulation';
import CovarianceSimulation from '@/components/CovarianceSimulation';
import BayesTheoremSimulation from '@/components/BayesTheoremSimulation';
import CrossValidationSimulation from '@/components/CrossValidationSimulation';
import OverfittingUnderfittingSimulation from '@/components/OverfittingUnderfittingSimulation';
import RegularisationSimulation from '@/components/RegularisationSimulation';
import HierarchicalClusteringSimulation from '@/components/HierarchicalClusteringSimulation';
import DBSCANSimulation from '@/components/DBSCANSimulation';
import RandomForestSimulation from './RandomForestSimulation';
import GradientBoostingSimulation from './GradientBoostingSimulation';
import FeatureEngineeringSimulation from './FeatureEngineeringSimulation';
import ReinforcementLearningSimulation from './ReinforcementLearningSimulation';
import ConvolutionalNeuralNetworkSimulation from './ConvolutionalNeuralNetworkSimulation';
import ArtificialNeuralNetworkSimulation from './ArtificialNeuralNetworkSimulation';
import RecurrentNeuralNetworkSimulation from './RecurrentNeuralNetworkSimulation';
import DeepLearningSimulation from './DeepLearningSimulation';
import NLPSimulation from './NLPSimulation';
import BagOfWordsSimulation from './BagOfWordsSimulation';
import TfIdfSimulation from './TfIdfSimulation';
import WordEmbeddingSimulation from './WordEmbeddingSimulation';
import AUCRocCurveSimulation from './AUCRocCurveSimulation';
import ClassificationMetricsSimulation from './ClassificationMetricsSimulation';
import BiasVarianceTradeoffSimulation from './BiasVarianceTradeoffSimulation';
import SpearmansRankCorrelationSimulation from './SpearmansRankCorrelationSimulation';
import KendallsTauSimulation from './KendallsTauSimulation';
import KruskalWallisTestSimulation from './KruskalWallisTestSimulation';
import FriedmanTestSimulation from './FriedmanTestSimulation';
import ShapiroWilkTestSimulation from './ShapiroWilkTestSimulation';
import LevenesTestSimulation from './LevenesTestSimulation';
import KolmogorovSmirnovTestSimulation from './KolmogorovSmirnovTestSimulation';


const simulationMap: Record<string, React.ComponentType> = {
    'central-limit-theorem': CentralLimitTheoremSimulation,
    'correlation': CorrelationSimulation,
    'hypothesis-testing': HypothesisTestingSimulation,
    'p-value': PValueSimulation,
    'type-i-and-type-ii-errors': TypeErrorsSimulation,
    'effect-size': TypeErrorsSimulation,
    'statistical-power': TypeErrorsSimulation,
    'law-of-large-numbers': LawOfLargeNumbersSimulation,
    'maximum-likelihood-estimation': MaximumLikelihoodEstimationSimulation,
    'regression-analysis': RegressionAnalysisSimulation,
    'linear-regression': RegressionAnalysisSimulation,
    'logistic-regression': LogisticRegressionSimulation,
    'confidence-intervals': ConfidenceIntervalsSimulation,
    'bootstrapping': BootstrappingSimulation,
    'bayesian-inference': BayesianInferenceSimulation,
    'ab-testing': ABTestingSimulation,
    'mcmc-methods': MCMCSimulation,
    'monte-carlo-simulation': MCMCSimulation,
    'standard-deviation': StandardDeviationSimulation,
    'anova': AnovaSimulation,
    'chi-squared-test': ChiSquaredTestSimulation,
    'bayesian-vs-frequentist': BayesianVsFrequentistSimulation,
    'dimensionality-reduction': PCASimulation,
    'pca': PCASimulation,
    'principal-component-analysis': PCASimulation,
    'k-means-clustering': KMeansClusteringSimulation,
    'cluster-analysis': KMeansClusteringSimulation,
    'decision-tree': DecisionTreesSimulation,
    'decision-trees': DecisionTreesSimulation,
    'naive-bayes': NaiveBayesSimulation,
    'naive-bayes-classifier': NaiveBayesSimulation,
    'svm': SupportVectorMachineSimulation,
    'support-vector-machine': SupportVectorMachineSimulation,
    'machine-learning': MachineLearningSimulation,
    'supervised-learning': MachineLearningSimulation,
    'unsupervised-learning': MachineLearningSimulation,
    'sampling': SamplingSimulation,
    'big-data': BigDataSimulation,
    'data-visualisation': DataVisualisationSimulation,
    'data-visualization': DataVisualisationSimulation,
    'time-series-analysis': TimeSeriesAnalysisSimulation,
    'factor-analysis': FactorAnalysisSimulation,
    'survival-analysis': SurvivalAnalysisSimulation,
    'z-score': ZScoreSimulation,
    't-test': TTestSimulation,
    'f-test': FTestSimulation,
    'statistical-bias': BiasSimulation,
    'variance': VarianceSimulation,
    'covariance': CovarianceSimulation,
    'bayes-theorem': BayesTheoremSimulation,
    'cross-validation': CrossValidationSimulation,
    'overfitting-and-underfitting': OverfittingUnderfittingSimulation,
    'overfitting': OverfittingUnderfittingSimulation,
    'underfitting': OverfittingUnderfittingSimulation,
    'regularisation': RegularisationSimulation,
    'hierarchical-clustering': HierarchicalClusteringSimulation,
    'dbscan': DBSCANSimulation,
    'random-forest': RandomForestSimulation,
    'ensemble-learning': RandomForestSimulation,
    'gradient-boosting': GradientBoostingSimulation,
    'feature-engineering': FeatureEngineeringSimulation,
    'reinforcement-learning': ReinforcementLearningSimulation,
    'convolutional-neural-network': ConvolutionalNeuralNetworkSimulation,
    'cnn': ConvolutionalNeuralNetworkSimulation,
    'artificial-neural-network': ArtificialNeuralNetworkSimulation,
    'ann': ArtificialNeuralNetworkSimulation,
    'recurrent-neural-network': RecurrentNeuralNetworkSimulation,
    'rnn': RecurrentNeuralNetworkSimulation,
    'deep-learning': DeepLearningSimulation,
    'natural-language-processing': NLPSimulation,
    'nlp': NLPSimulation,
    'bag-of-words-model': BagOfWordsSimulation,
    'bag-of-words': BagOfWordsSimulation,
    'tf-idf': TfIdfSimulation,
    'word-embedding': WordEmbeddingSimulation,
    'word-embeddings': WordEmbeddingSimulation,
    'auc-roc-curve': AUCRocCurveSimulation,
    'confusion-matrix': ClassificationMetricsSimulation,
    'precision-and-recall': ClassificationMetricsSimulation,
    'f1-score': ClassificationMetricsSimulation,
    'bias-variance-tradeoff': BiasVarianceTradeoffSimulation,
    'spearmans-rank-correlation': SpearmansRankCorrelationSimulation,
    'kendalls-tau': KendallsTauSimulation,
    'kruskal-wallis-test': KruskalWallisTestSimulation,
    'friedman-test': FriedmanTestSimulation,
    'shapiro-wilk-test': ShapiroWilkTestSimulation,
    'levenes-test': LevenesTestSimulation,
    'kolmogorov-smirnov-test': KolmogorovSmirnovTestSimulation,
};

const SimulationHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-serif font-bold">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
    </div>
);

const ConceptSimulationWrapper = ({ conceptId, conceptTitle }: { conceptId: string, conceptTitle: string }) => {
    const SimulationComponent = simulationMap[conceptId];

    if (!SimulationComponent) {
        return null;
    }

    return (
        <section>
            <SimulationHeader title="Interactive Simulation" subtitle={`An interactive look at ${conceptTitle}`} />
            <SimulationComponent />
        </section>
    );
};

export default ConceptSimulationWrapper;
