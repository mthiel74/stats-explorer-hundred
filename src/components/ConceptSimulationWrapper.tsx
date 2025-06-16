
import React, { Suspense } from 'react';
const CentralLimitTheoremSimulation = React.lazy(() => import('@/components/CentralLimitTheoremSimulation'));
const CorrelationSimulation = React.lazy(() => import('@/components/CorrelationSimulation'));
const HypothesisTestingSimulation = React.lazy(() => import('@/components/HypothesisTestingSimulation'));
const MaximumLikelihoodEstimationSimulation = React.lazy(() => import('@/components/MaximumLikelihoodEstimationSimulation'));
const RegressionAnalysisSimulation = React.lazy(() => import('@/components/RegressionAnalysisSimulation'));
const ConfidenceIntervalsSimulation = React.lazy(() => import('@/components/ConfidenceIntervalsSimulation'));
const BootstrappingSimulation = React.lazy(() => import('@/components/BootstrappingSimulation'));
const BayesianInferenceSimulation = React.lazy(() => import('@/components/BayesianInferenceSimulation'));
const ABTestingSimulation = React.lazy(() => import('@/components/ABTestingSimulation'));
const MCMCSimulation = React.lazy(() => import('@/components/MCMCSimulation'));
const StandardDeviationSimulation = React.lazy(() => import('@/components/StandardDeviationSimulation'));
const NormalDistributionSimulation = React.lazy(() => import('@/components/NormalDistributionSimulation'));
const PValueSimulation = React.lazy(() => import('@/components/PValueSimulation'));
const TypeErrorsSimulation = React.lazy(() => import('@/components/TypeErrorsSimulation'));
const LawOfLargeNumbersSimulation = React.lazy(() => import('@/components/LawOfLargeNumbersSimulation'));
const AnovaSimulation = React.lazy(() => import('@/components/AnovaSimulation'));
const ChiSquaredTestSimulation = React.lazy(() => import('@/components/ChiSquaredTestSimulation'));
const BayesianVsFrequentistSimulation = React.lazy(() => import('@/components/BayesianVsFrequentistSimulation'));
const PCASimulation = React.lazy(() => import('@/components/PCASimulation'));
const KMeansClusteringSimulation = React.lazy(() => import('@/components/KMeansClusteringSimulation'));
const DecisionTreesSimulation = React.lazy(() => import('@/components/DecisionTreesSimulation'));
const NaiveBayesSimulation = React.lazy(() => import('@/components/NaiveBayesSimulation'));
const SupportVectorMachineSimulation = React.lazy(() => import('@/components/SupportVectorMachineSimulation'));
const BigDataSimulation = React.lazy(() => import('./BigDataSimulation'));
const DataVisualisationSimulation = React.lazy(() => import('./DataVisualisationSimulation'));
const TimeSeriesAnalysisSimulation = React.lazy(() => import('./TimeSeriesAnalysisSimulation'));
const LogisticRegressionSimulation = React.lazy(() => import('@/components/LogisticRegressionSimulation'));
const MachineLearningSimulation = React.lazy(() => import('@/components/MachineLearningSimulation'));
const SamplingSimulation = React.lazy(() => import('@/components/SamplingSimulation'));
const FactorAnalysisSimulation = React.lazy(() => import('@/components/FactorAnalysisSimulation'));
const SurvivalAnalysisSimulation = React.lazy(() => import('@/components/SurvivalAnalysisSimulation'));
const ZScoreSimulation = React.lazy(() => import('@/components/ZScoreSimulation'));
const TTestSimulation = React.lazy(() => import('@/components/TTestSimulation'));
const FTestSimulation = React.lazy(() => import('@/components/FTestSimulation'));
const VarianceSimulation = React.lazy(() => import('@/components/VarianceSimulation'));
const BiasSimulation = React.lazy(() => import('@/components/BiasSimulation'));
const CovarianceSimulation = React.lazy(() => import('@/components/CovarianceSimulation'));
const BayesTheoremSimulation = React.lazy(() => import('@/components/BayesTheoremSimulation'));
const CrossValidationSimulation = React.lazy(() => import('@/components/CrossValidationSimulation'));
const OverfittingUnderfittingSimulation = React.lazy(() => import('@/components/OverfittingUnderfittingSimulation'));
const RegularisationSimulation = React.lazy(() => import('@/components/RegularisationSimulation'));
const HierarchicalClusteringSimulation = React.lazy(() => import('@/components/HierarchicalClusteringSimulation'));
const DBSCANSimulation = React.lazy(() => import('@/components/DBSCANSimulation'));
const RandomForestSimulation = React.lazy(() => import('./RandomForestSimulation'));
const GradientBoostingSimulation = React.lazy(() => import('./GradientBoostingSimulation'));
const FeatureEngineeringSimulation = React.lazy(() => import('./FeatureEngineeringSimulation'));
const ReinforcementLearningSimulation = React.lazy(() => import('./ReinforcementLearningSimulation'));
const ConvolutionalNeuralNetworkSimulation = React.lazy(() => import('./ConvolutionalNeuralNetworkSimulation'));
const ArtificialNeuralNetworkSimulation = React.lazy(() => import('./ArtificialNeuralNetworkSimulation'));
const RecurrentNeuralNetworkSimulation = React.lazy(() => import('./RecurrentNeuralNetworkSimulation'));
const DeepLearningSimulation = React.lazy(() => import('./DeepLearningSimulation'));
const NLPSimulation = React.lazy(() => import('./NLPSimulation'));
const BagOfWordsSimulation = React.lazy(() => import('./BagOfWordsSimulation'));
const TfIdfSimulation = React.lazy(() => import('./TfIdfSimulation'));
const WordEmbeddingSimulation = React.lazy(() => import('./WordEmbeddingSimulation'));
const AUCRocCurveSimulation = React.lazy(() => import('./AUCRocCurveSimulation'));
const ClassificationMetricsSimulation = React.lazy(() => import('./ClassificationMetricsSimulation'));
const BiasVarianceTradeoffSimulation = React.lazy(() => import('./BiasVarianceTradeoffSimulation'));
const SpearmansRankCorrelationSimulation = React.lazy(() => import('./SpearmansRankCorrelationSimulation'));
const KendallsTauSimulation = React.lazy(() => import('./KendallsTauSimulation'));
const KruskalWallisTestSimulation = React.lazy(() => import('./KruskalWallisTestSimulation'));
const FriedmanTestSimulation = React.lazy(() => import('./FriedmanTestSimulation'));
const ShapiroWilkTestSimulation = React.lazy(() => import('./ShapiroWilkTestSimulation'));
const LevenesTestSimulation = React.lazy(() => import('./LevenesTestSimulation'));
const KolmogorovSmirnovTestSimulation = React.lazy(() => import('./KolmogorovSmirnovTestSimulation'));
const MannWhitneyUTestSimulation = React.lazy(() => import('./MannWhitneyUTestSimulation'));
const WilcoxonSignedRankTestSimulation = React.lazy(() => import('./WilcoxonSignedRankTestSimulation'));
const BartlettsTestSimulation = React.lazy(() => import('./BartlettsTestSimulation'));
const OutlierDetectionSimulation = React.lazy(() => import('./OutlierDetectionSimulation'));
const ImputationSimulation = React.lazy(() => import('./ImputationSimulation'));
const DataCleansingSimulation = React.lazy(() => import('./DataCleansingSimulation'));
const ETLSimulation = React.lazy(() => import('./ETLSimulation'));
const BayesianNetworkSimulation = React.lazy(() => import('./BayesianNetworkSimulation'));
const GibbsSamplingSimulation = React.lazy(() => import('./GibbsSamplingSimulation'));
const MetropolisHastingsAlgorithmSimulation = React.lazy(() => import('./MetropolisHastingsAlgorithmSimulation'));
const HiddenMarkovModelSimulation = React.lazy(() => import('./HiddenMarkovModelSimulation'));
const KalmanFilterSimulation = React.lazy(() => import('./KalmanFilterSimulation'));
const AutoregressiveModelSimulation = React.lazy(() => import('./AutoregressiveModelSimulation'));
const MovingAverageModelSimulation = React.lazy(() => import('./MovingAverageModelSimulation'));
const ARMAModelSimulation = React.lazy(() => import('./ARMAModelSimulation'));
const ARIMAModelSimulation = React.lazy(() => import('./ARIMAModelSimulation'));
const GarchModelSimulation = React.lazy(() => import('./GarchModelSimulation'));
const ExponentialSmoothingSimulation = React.lazy(() => import('./ExponentialSmoothingSimulation'));
const SplineRegressionSimulation = React.lazy(() => import('./SplineRegressionSimulation'));
const KernelDensityEstimationSimulation = React.lazy(() => import('./KernelDensityEstimationSimulation'));
const ParametricVsNonParametricSimulation = React.lazy(() => import('./ParametricVsNonParametricSimulation'));
const LikelihoodRatioTestSimulation = React.lazy(() => import('./LikelihoodRatioTestSimulation'));
const ModelSelectionCriteriaSimulation = React.lazy(() => import('./ModelSelectionCriteriaSimulation'));
const MulticollinearitySimulation = React.lazy(() => import('./MulticollinearitySimulation'));
const HomoscedasticitySimulation = React.lazy(() => import('./HomoscedasticitySimulation'));
const CramersVSimulation = React.lazy(() => import('./CramersVSimulation'));
const PhiCoefficientSimulation = React.lazy(() => import('./PhiCoefficientSimulation'));
const PointBiserialCorrelationSimulation = React.lazy(() => import('./PointBiserialCorrelationSimulation'));
const RobustStatisticsSimulation = React.lazy(() => import('./RobustStatisticsSimulation'));
const WinsorizingSimulation = React.lazy(() => import('./WinsorizingSimulation'));
const TrimmingSimulation = React.lazy(() => import('./TrimmingSimulation'));
const SurvivalFunctionSimulation = React.lazy(() => import('./SurvivalFunctionSimulation'));
const HazardFunctionSimulation = React.lazy(() => import('./HazardFunctionSimulation'));
const ProportionalHazardsModelSimulation = React.lazy(() => import('./ProportionalHazardsModelSimulation'));
const PropensityScoreMatchingSimulation = React.lazy(() => import('./PropensityScoreMatchingSimulation'));
const InstrumentalVariableSimulation = React.lazy(() => import('./InstrumentalVariableSimulation'));
const DifferenceInDifferencesSimulation = React.lazy(() => import('./DifferenceInDifferencesSimulation'));
const RegressionDiscontinuitySimulation = React.lazy(() => import('./RegressionDiscontinuitySimulation'));
const MediationAnalysisSimulation = React.lazy(() => import('./MediationAnalysisSimulation'));
const ModerationAnalysisSimulation = React.lazy(() => import('./ModerationAnalysisSimulation'));
const StructuralEquationModellingSimulation = React.lazy(() => import('./StructuralEquationModellingSimulation'));
const PathAnalysisSimulation = React.lazy(() => import('./PathAnalysisSimulation'));


const simulationMap: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
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
    'confidence-interval': ConfidenceIntervalsSimulation,
    'bootstrapping': BootstrappingSimulation,
    'bayesian-inference': BayesianInferenceSimulation,
    'ab-testing': ABTestingSimulation,
    'mcmc-methods': MCMCSimulation,
    'monte-carlo-simulation': MCMCSimulation,
    'normal-distribution': NormalDistributionSimulation,
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
    'support-vector-machines': SupportVectorMachineSimulation,
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
    'regularization': RegularisationSimulation,
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
    'mann-whitney-u-test': MannWhitneyUTestSimulation,
    'wilcoxon-signed-rank-test': WilcoxonSignedRankTestSimulation,
    'bartletts-test': BartlettsTestSimulation,
    'outlier-detection': OutlierDetectionSimulation,
    'imputation': ImputationSimulation,
    'data-cleansing': DataCleansingSimulation,
    'etl': ETLSimulation,
    'bayesian-networks': BayesianNetworkSimulation,
    'mcmc': MCMCSimulation,
    'gibbs-sampling': GibbsSamplingSimulation,
    'metropolis-hastings-algorithm': MetropolisHastingsAlgorithmSimulation,
    'hidden-markov-model': HiddenMarkovModelSimulation,
    'kalman-filter': KalmanFilterSimulation,
    'autoregressive-model': AutoregressiveModelSimulation,
    'moving-average-model': MovingAverageModelSimulation,
    'arma-model': ARMAModelSimulation,
    'arima-model': ARIMAModelSimulation,
    'garch-model': GarchModelSimulation,
    'exponential-smoothing': ExponentialSmoothingSimulation,
    'spline-regression': SplineRegressionSimulation,
    'kernel-density-estimation': KernelDensityEstimationSimulation,
    'non-parametric-statistics': ParametricVsNonParametricSimulation,
    'parametric-statistics': ParametricVsNonParametricSimulation,
    'likelihood-ratio-test': LikelihoodRatioTestSimulation,
    'model-selection-criteria': ModelSelectionCriteriaSimulation,
    'aic': ModelSelectionCriteriaSimulation,
    'bic': ModelSelectionCriteriaSimulation,
    'akaike-information-criterion': ModelSelectionCriteriaSimulation,
    'bayesian-information-criterion': ModelSelectionCriteriaSimulation,
    'multicollinearity': MulticollinearitySimulation,
    'homoscedasticity': HomoscedasticitySimulation,
    'heteroscedasticity': HomoscedasticitySimulation,
    'cramers-v': CramersVSimulation,
    'phi-coefficient': PhiCoefficientSimulation,
    'point-biserial-correlation': PointBiserialCorrelationSimulation,
    'robust-statistics': RobustStatisticsSimulation,
    'winsorizing': WinsorizingSimulation,
    'trimming': TrimmingSimulation,
    'truncating': TrimmingSimulation,
    'survival-function': SurvivalFunctionSimulation,
    'hazard-function': HazardFunctionSimulation,
    'proportional-hazards-model': ProportionalHazardsModelSimulation,
    'propensity-score-matching': PropensityScoreMatchingSimulation,
    'instrumental-variable': InstrumentalVariableSimulation,
    'difference-in-differences': DifferenceInDifferencesSimulation,
    'did': DifferenceInDifferencesSimulation,
    'regression-discontinuity-design': RegressionDiscontinuitySimulation,
    'mediation-analysis': MediationAnalysisSimulation,
    'moderation-analysis': ModerationAnalysisSimulation,
    'structural-equation-modelling': StructuralEquationModellingSimulation,
    'structural-equation-modeling': StructuralEquationModellingSimulation,
    'path-analysis': PathAnalysisSimulation,
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
            <Suspense fallback={<div>Loading...</div>}>
                <SimulationComponent />
            </Suspense>
        </section>
    );
};

export default ConceptSimulationWrapper;
