
export interface Concept {
  id: string;
  title: string;
  summary: string;
  description: string;
}

export const concepts: Concept[] = [
  {
    id: "hypothesis-testing",
    title: "Hypothesis Testing",
    summary: "A statistical method to test assumptions about a population parameter.",
    description: `Hypothesis testing is an act in statistics whereby an analyst tests an assumption regarding a population parameter. The methodology employed by the analyst depends on the nature of the data used and the reason for the analysis.

Hypothesis testing is used to assess the plausibility of a hypothesis by using sample data. Such data may come from a larger population, or from a data-generating process. The word "population" will be used for both of these cases in the following descriptions.`,
  },
  {
    id: "central-limit-theorem",
    title: "Central Limit Theorem",
    summary: "States that the distribution of sample means approximates a normal distribution.",
    description: `In probability theory, the central limit theorem (CLT) establishes that, in many situations, when independent random variables are added, their properly normalized sum tends toward a normal distribution (informally a "bell curve") even if the original variables themselves are not normally distributed.

The theorem is a key concept in probability theory because it implies that probabilistic and statistical methods that work for normal distributions can be applicable to many problems involving other types of distributions.`,
  },
  {
    id: "regression-analysis",
    title: "Regression Analysis",
    summary: "A set of statistical processes for estimating the relationships between variables.",
    description: `In statistics, regression analysis is a set of statistical processes for estimating the relationships between a dependent variable (often called the 'outcome' or 'response' variable) and one or more independent variables (often called 'predictors', 'covariates', 'explanatory variables' or 'features').

The most common form of regression analysis is linear regression, in which one finds the line (or a more complex linear combination) that most closely fits the data according to a specific mathematical criterion.`,
  },
  {
    id: "p-value",
    title: "P-Value",
    summary: "The probability of obtaining test results at least as extreme as the results actually observed.",
    description: `In null-hypothesis statistical testing, the p-value is the probability of obtaining test results at least as extreme as the results actually observed, under the assumption that the null hypothesis is correct. A very small p-value means that such an extreme observed outcome would be very unlikely under the null hypothesis.

Reporting p-values of statistical tests is common practice in many fields of quantitative research. Since the precise meaning of p-value is hard to grasp, misuse is widespread and has been a major topic in metascience.`,
  },
   {
    id: "confidence-interval",
    title: "Confidence Interval",
    summary: "A range of estimates for an unknown parameter, defined as an interval with a certain confidence level.",
    description: `In statistics, a confidence interval is a type of interval estimate, computed from the statistics of the observed data, that might contain the true value of an unknown population parameter. The interval has an associated confidence level that, loosely speaking, quantifies the level of confidence that the parameter lies in the interval.
    
The confidence level is designated prior to examining the data. Most commonly, the 95% confidence level is used. However, other confidence levels can be used, for example, 90% and 99%.`
  },
  {
    id: "bayesian-inference",
    title: "Bayesian Inference",
    summary: "A method of statistical inference in which Bayes' theorem is used to update the probability for a hypothesis.",
    description: `Bayesian inference is a method of statistical inference in which Bayes' theorem is used to update the probability for a hypothesis as more evidence or information becomes available. Bayesian inference is an important technique in statistics, and especially in mathematical statistics.

Bayesian updating is particularly important in the dynamic analysis of a sequence of data. Bayesian inference has found application in a wide range of activities, including science, engineering, philosophy, medicine, sport, and law.`
  },
  {
    id: "standard-deviation",
    title: "Standard Deviation",
    summary: "A measure of the amount of variation or dispersion of a set of values.",
    description: `In statistics, the standard deviation is a measure of the amount of variation or dispersion of a set of values. A low standard deviation indicates that the values tend to be close to the mean (also called the expected value) of the set, while a high standard deviation indicates that the values are spread out over a wider range.

Standard deviation may be abbreviated SD, and is most commonly represented in mathematical texts and equations by the lower case Greek letter sigma σ, for the population standard deviation, or the Latin letter s, for the sample standard deviation.`
  },
  {
    id: "correlation",
    title: "Correlation",
    summary: "A statistical measure that expresses the extent to which two variables are linearly related.",
    description: `Correlation or dependence is any statistical relationship, whether causal or not, between two random variables or bivariate data. In the broadest sense correlation is any statistical association, though it commonly refers to the degree to which a pair of variables are linearly related.

It's important to remember that correlation does not imply causation. Just because two variables are correlated does not mean that one causes the other.`
  },
  {
    id: "sampling",
    title: "Sampling",
    summary: "The selection of a subset of individuals from a statistical population to estimate characteristics of the whole population.",
    description: `In statistics, quality assurance, and survey methodology, sampling is the selection of a subset (a statistical sample) of individuals from within a statistical population to estimate characteristics of the whole population. Statisticians attempt for the samples to represent the population in question.

Two advantages of sampling are lower cost and faster data collection than measuring the entire population.`
  },
  {
    id: "normal-distribution",
    title: "Normal Distribution",
    summary: "A probability distribution that is symmetric about the mean, showing that data near the mean are more frequent.",
    description: `In probability theory, a normal (or Gaussian or Gauss or Laplace–Gauss) distribution is a type of continuous probability distribution for a real-valued random variable. The general form of its probability density function is determined by two parameters: the mean or expectation and the standard deviation.

The normal distribution is important in statistics and is often used in the natural and social sciences to represent real-valued random variables whose distributions are not known.`
  },
  {
    id: "type-i-and-type-ii-errors",
    title: "Type I & Type II Errors",
    summary: "Mistakes made in statistical hypothesis testing.",
    description: `In statistical hypothesis testing, a type I error is the mistaken rejection of an actually true null hypothesis (also known as a "false positive" finding or conclusion). A type II error is the mistaken failure to reject an actually false null hypothesis (also known as a "false negative" finding or conclusion).

The balance between these two types of errors is crucial in experimental design and decision-making.`
  },
  {
    id: "anova",
    title: "ANOVA (Analysis of Variance)",
    summary: "A collection of statistical models used to analyze the differences among group means.",
    description: `Analysis of variance (ANOVA) is a collection of statistical models and their associated estimation procedures (such as the "variation" among and between groups) used to analyze the differences among means. ANOVA was developed by the statistician Ronald Fisher.

ANOVA is based on the law of total variance, where the observed variance in a particular variable is partitioned into components attributable to different sources of variation.`
  },
  {
    id: "chi-squared-test",
    title: "Chi-Squared Test",
    summary: "A statistical test used to compare observed results with expected results.",
    description: `A chi-squared test, also written as χ² test, is any statistical hypothesis test where the sampling distribution of the test statistic is a chi-squared distribution when the null hypothesis is true. Without other qualification, 'chi-squared test' often is used as short for Pearson's chi-squared test.

The chi-squared test is used to determine whether there is a significant difference between the expected frequencies and the observed frequencies in one or more categories.`
  },
  {
    id: "linear-regression",
    title: "Linear Regression",
    summary: "A linear approach to modeling the relationship between a scalar response and one or more explanatory variables.",
    description: `In statistics, linear regression is a linear approach for modelling the relationship between a scalar response and one or more explanatory variables (also known as dependent and independent variables). The case of one explanatory variable is called simple linear regression; for more than one, the process is called multiple linear regression.

This term is distinct from multivariate linear regression, where multiple correlated dependent variables are predicted, rather than a single scalar variable.`
  },
  {
    id: "logistic-regression",
    title: "Logistic Regression",
    summary: "A statistical model used to model a binary dependent variable.",
    description: `In statistics, the logistic model (or logit model) is used to model the probability of a certain class or event existing such as pass/fail, win/lose, alive/dead or healthy/sick. This can be extended to model several classes of events such as determining whether an image contains a cat, dog, lion, etc.

Each object being detected in the image would be assigned a probability between 0 and 1, with a sum of one.`
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    summary: "The study of computer algorithms that can improve automatically through experience and by the use of data.",
    description: `Machine learning (ML) is a field of inquiry devoted to understanding and building methods that 'learn', that is, methods that leverage data to improve performance on some set of tasks. It is seen as a part of artificial intelligence.

Machine learning algorithms build a model based on sample data, known as training data, in order to make predictions or decisions without being explicitly programmed to do so.`
  },
  {
    id: "big-data",
    title: "Big Data",
    summary: "Large or complex data sets that are analyzed computationally to reveal patterns, trends, and associations.",
    description: `Big data is a field that treats ways to analyze, systematically extract information from, or otherwise deal with data sets that are too large or complex to be dealt with by traditional data-processing application software.

Data with many cases (rows) offer greater statistical power, while data with higher complexity (more attributes or columns) may lead to a higher false discovery rate.`
  },
  {
    id: "data-visualization",
    title: "Data Visualization",
    summary: "The graphical representation of information and data.",
    description: `Data visualization is an interdisciplinary field that deals with the graphic representation of data. It is a particularly efficient way of communicating when the data is numerous as for example a time series.

From an academic point of view, this representation can be considered as a mapping between the original data (usually numerical) and graphic elements (for example, lines or points in a chart).`
  },
  {
    id: "ab-testing",
    title: "A/B Testing",
    summary: "A randomized experiment with two variants, A and B.",
    description: `A/B testing is a user experience research methodology. A/B tests consist of a randomized experiment with two variants, A and B. It includes application of statistical hypothesis testing or "two-sample hypothesis testing" as used in the field of statistics.

A/B testing is a way to compare two versions of a single variable, typically by testing a subject's response to variant A against variant B, and determining which of the two variants is more effective.`
  },
  {
    id: "decision-tree",
    title: "Decision Tree",
    summary: "A decision support tool that uses a tree-like model of decisions and their possible consequences.",
    description: `A decision tree is a flowchart-like structure in which each internal node represents a "test" on an attribute (e.g. whether a coin flip comes up heads or tails), each branch represents the outcome of the test, and each leaf node represents a class label (decision taken after computing all attributes). The paths from root to leaf represent classification rules.
    
Decision tree learning is a method commonly used in data mining. The goal is to create a model that predicts the value of a target variable based on several input variables.`
  },
  {
    id: "time-series-analysis",
    title: "Time Series Analysis",
    summary: "A method for analyzing time-ordered data points.",
    description: `Time series analysis comprises methods for analyzing time series data (data points indexed in time order) in order to extract meaningful statistics and other characteristics of the data. Time series forecasting is the use of a model to predict future values based on previously observed values.
    
It is used in various fields such as econometrics, signal processing, and weather forecasting.`
  },
  {
    id: "monte-carlo-simulation",
    title: "Monte Carlo Simulation",
    summary: "A model used to predict the probability of different outcomes when the intervention of random variables is present.",
    description: `Monte Carlo simulations are a broad class of computational algorithms that rely on repeated random sampling to obtain numerical results. Their essential idea is using randomness to solve problems that might be deterministic in principle. They are often used in physical and mathematical problems and are most useful when it is difficult or impossible to use other approaches.`
  },
  {
    id: "principal-component-analysis",
    title: "Principal Component Analysis (PCA)",
    summary: "A technique for reducing the dimensionality of datasets, increasing interpretability but at the same time minimizing information loss.",
    description: `Principal component analysis (PCA) is a statistical procedure that uses an orthogonal transformation to convert a set of observations of possibly correlated variables into a set of values of linearly uncorrelated variables called principal components. This transformation is defined in such a way that the first principal component has the largest possible variance, and each succeeding component in turn has the highest variance possible under the constraint that it is orthogonal to the preceding components.`
  },
  {
    id: "cluster-analysis",
    title: "Cluster Analysis",
    summary: "The task of grouping a set of objects so that objects in the same group are more similar to each other than to those in other groups.",
    description: `Cluster analysis or clustering is the task of grouping a set of objects in such a way that objects in the same group (called a cluster) are more similar (in some sense) to each other than to those in other groups (clusters). It is a main task of exploratory data mining, and a common technique for statistical data analysis, used in many fields, including machine learning, pattern recognition, image analysis, information retrieval, bioinformatics, data compression, and computer graphics.`
  },
  {
    id: "factor-analysis",
    title: "Factor Analysis",
    summary: "A statistical method used to describe variability among observed, correlated variables in terms of a lower number of unobserved variables.",
    description: `Factor analysis is a statistical method used to describe variability among observed, correlated variables in terms of a potentially lower number of unobserved variables called factors. For example, it is possible that variations in six observed variables mainly reflect the variations in two unobserved (underlying) variables. Factor analysis searches for such joint variations in response to unobserved latent variables.`
  },
  {
    id: "survival-analysis",
    title: "Survival Analysis",
    summary: "A branch of statistics for analyzing the expected duration of time until one or more events happen.",
    description: `Survival analysis is a branch of statistics for analyzing the expected duration of time until one or more events happen, such as death in biological organisms and failure in mechanical systems. This topic is called reliability theory or reliability analysis in engineering, duration analysis or duration modelling in economics, and event history analysis in sociology. Survival analysis attempts to answer certain questions, such as what is the proportion of a population which will survive past a certain time?`
  },
  {
    id: "z-score",
    title: "Z-Score",
    summary: "A numerical measurement that describes a value's relationship to the mean of a group of values.",
    description: `A Z-score is a numerical measurement that describes a value's relationship to the mean of a group of values. Z-score is measured in terms of standard deviations from the mean. If a Z-score is 0, it indicates that the data point's score is identical to the mean score. A Z-score of 1.0 would indicate a value that is one standard deviation from the mean.`
  },
  {
    id: "t-test",
    title: "T-Test",
    summary: "A type of inferential statistic used to determine if there is a significant difference between the means of two groups.",
    description: `A t-test is an inferential statistic used to determine if there is a significant difference between the means of two groups and how they are related. T-tests are used when the data sets follow a normal distribution and have unknown variances. A t-test is a tool for evaluating the means of one or two populations using hypothesis testing.`
  },
  {
    id: "f-test",
    title: "F-Test",
    summary: "A statistical test in which the test statistic has an F-distribution under the null hypothesis.",
    description: `An F-test is any statistical test in which the test statistic has an F-distribution under the null hypothesis. It is most often used when comparing statistical models that have been fitted to a data set, in order to identify the model that best fits the population from which the data were sampled. F-tests arise in many different statistical settings, such as ANOVA and regression analysis.`
  },
  {
    id: "effect-size",
    title: "Effect Size",
    summary: "A quantitative measure of the magnitude of a phenomenon.",
    description: `In statistics, an effect size is a quantitative measure of the magnitude of a phenomenon. Examples of effect sizes include the correlation between two variables, the regression coefficient in a regression, the mean difference, or the risk of a particular event (such as a heart attack). Effect sizes complement statistical hypothesis testing, and play an important role in power analysis, sample size planning, and in meta-analyses.`
  },
  {
    id: "statistical-power",
    title: "Statistical Power",
    summary: "The probability that a hypothesis test will correctly reject the null hypothesis when it is false.",
    description: `In statistical hypothesis testing, the power of a binary hypothesis test is the probability that the test correctly rejects the null hypothesis (H₀) when a specific alternative hypothesis (H₁) is true. It is the probability of not committing a Type II error. The higher the statistical power, the lower the probability of making a Type II error. It is also known as the 'sensitivity' of the test.`
  },
  {
    id: "statistical-bias",
    title: "Statistical Bias",
    summary: "A systematic tendency which causes differences between results and facts.",
    description: `Bias is a systematic tendency which causes differences between results and facts. The bias of an estimator is the difference between this estimator's expected value and the true value of the parameter being estimated. An estimator or decision rule with zero bias is called unbiased. In statistics, "bias" is an objective property of an estimator. Bias can be introduced by a number of sources: sample selection, measurement error, or an algorithm.`
  },
  {
    id: "variance",
    title: "Variance",
    summary: "The expectation of the squared deviation of a random variable from its mean.",
    description: `In probability theory and statistics, variance is the expectation of the squared deviation of a random variable from its mean. Informally, it measures how far a set of numbers is spread out from their average value. Variance has a central role in statistics, where some ideas that use it include descriptive statistics, statistical inference, hypothesis testing, goodness of fit, and Monte Carlo sampling.`
  },
  {
    id: "covariance",
    title: "Covariance",
    summary: "A measure of the joint variability of two random variables.",
    description: `In probability theory and statistics, covariance is a measure of the joint variability of two random variables. If the greater values of one variable mainly correspond with the greater values of the other variable, and the same holds for the lesser values, the covariance is positive. In the opposite case, when the greater values of one variable mainly correspond to the lesser values of the other, the covariance is negative.`
  },
  {
    id: "bayes-theorem",
    title: "Bayes' Theorem",
    summary: "Describes the probability of an event, based on prior knowledge of conditions that might be related to the event.",
    description: `In probability theory and statistics, Bayes' theorem (alternatively Bayes' law or Bayes' rule) describes the probability of an event, based on prior knowledge of conditions that might be related to the event. For example, if the risk of developing health problems is known to increase with age, Bayes' theorem allows the risk to an individual of a known age to be assessed more accurately than simply assuming that the individual is typical of the population as a whole.`
  },
  {
    id: "maximum-likelihood-estimation",
    title: "Maximum Likelihood Estimation (MLE)",
    summary: "A method of estimating the parameters of a probability distribution by maximizing a likelihood function.",
    description: `In statistics, maximum likelihood estimation (MLE) is a method of estimating the parameters of an assumed probability distribution, given some observed data. This is achieved by maximizing a likelihood function so that, under the assumed statistical model, the observed data is most probable. The point in the parameter space that maximizes the likelihood function is called the maximum likelihood estimate.`
  },
  {
    id: "bootstrapping",
    title: "Bootstrapping",
    summary: "A method that relies on random sampling with replacement to estimate properties of a statistic.",
    description: `Bootstrapping is any test or metric that relies on random sampling with replacement. Bootstrapping allows assigning measures of accuracy (defined in terms of bias, variance, confidence intervals, prediction error, etc.) to sample estimates. This technique allows estimation of the sampling distribution of almost any statistic using random sampling methods.`
  },
  {
    id: "cross-validation",
    title: "Cross-Validation",
    summary: "A resampling procedure used to evaluate machine learning models on a limited data sample.",
    description: `Cross-validation, sometimes called rotation estimation or out-of-sample testing, is any of various similar model validation techniques for assessing how the results of a statistical analysis will generalize to an independent data set. It is mainly used in settings where the goal is prediction, and one wants to estimate how accurately a predictive model will perform in practice.`
  },
  {
    id: "overfitting-and-underfitting",
    title: "Overfitting & Underfitting",
    summary: "Common problems in machine learning where the model performs poorly on new data.",
    description: `In statistics and machine learning, one of the most common tasks is to fit a 'model' to a set of training data. Overfitting occurs when a statistical model or machine learning algorithm captures the noise of the data, meaning it fits the training data too well. Underfitting occurs when a model cannot capture the underlying trend of the data. An underfit model is a model where some parameters or terms that would appear in a correctly specified model are missing.`
  },
  {
    id: "regularization",
    title: "Regularization",
    summary: "A technique used to prevent overfitting by adding a penalty term to the loss function.",
    description: `In mathematics, statistics, and computer science, particularly in machine learning and inverse problems, regularization is the process of adding information in order to solve an ill-posed problem or to prevent overfitting. This information is usually a penalty for complexity, such as restrictions for smoothness or bounds on the vector space norm. A common example is ridge regression, which penalizes the sum of squares of the regression coefficients.`
  },
  {
    id: "k-means-clustering",
    title: "K-Means Clustering",
    summary: "A method of vector quantization that aims to partition n observations into k clusters.",
    description: `K-means clustering is a method of vector quantization, originally from signal processing, that aims to partition n observations into k clusters in which each observation belongs to the cluster with the nearest mean (cluster centers or cluster centroid), serving as a prototype of the cluster. This results in a partitioning of the data space into Voronoi cells.`
  },
  {
    id: "hierarchical-clustering",
    title: "Hierarchical Clustering",
    summary: "An alternative approach to k-means clustering that builds a hierarchy of clusters.",
    description: `In data mining and statistics, hierarchical clustering is a method of cluster analysis which seeks to build a hierarchy of clusters. Strategies for hierarchical clustering fall into two types: Agglomerative (bottom-up) and Divisive (top-down).`
  },
  {
    id: "dbscan",
    title: "DBSCAN",
    summary: "A density-based clustering algorithm.",
    description: `Density-based spatial clustering of applications with noise (DBSCAN) is a data clustering algorithm proposed by Martin Ester, Hans-Peter Kriegel, Jörg Sander and Xiaowei Xu in 1996. It is a density-based clustering non-parametric algorithm: given a set of points in some space, it groups together points that are closely packed together, marking as outliers points that lie alone in low-density regions.`
  },
  {
    id: "support-vector-machines",
    title: "Support Vector Machines (SVM)",
    summary: "Supervised learning models that analyze data for classification and regression analysis.",
    description: `In machine learning, support-vector machines are supervised learning models with associated learning algorithms that analyze data for classification and regression analysis. Given a set of training examples, each marked as belonging to one or the other of two categories, an SVM training algorithm builds a model that assigns new examples to one category or the other, making it a non-probabilistic binary linear classifier.`
  },
  {
    id: "naive-bayes-classifier",
    title: "Naive Bayes Classifier",
    summary: "A family of simple probabilistic classifiers based on applying Bayes' theorem.",
    description: `A naive Bayes classifier is a simple probabilistic classifier based on applying Bayes' theorem with strong (naive) independence assumptions between the features. They are among the simplest Bayesian network models, but coupled with kernel density estimation, they can achieve higher accuracy levels.`
  },
  {
    id: "random-forest",
    title: "Random Forest",
    summary: "An ensemble learning method for classification, regression and other tasks.",
    description: `Random forests or random decision forests are an ensemble learning method for classification, regression and other tasks that operate by constructing a multitude of decision trees at training time. For classification tasks, the output of the random forest is the class selected by most trees.`
  },
  {
    id: "gradient-boosting",
    title: "Gradient Boosting",
    summary: "A machine learning technique which produces a prediction model in the form of an ensemble of weak prediction models.",
    description: `Gradient boosting is a machine learning technique for regression and classification problems, which produces a prediction model in the form of an ensemble of weak prediction models, typically decision trees. It builds the model in a stage-wise fashion like other boosting methods do, and it generalizes them by allowing optimization of an arbitrary differentiable loss function.`
  },
  {
    id: "dimensionality-reduction",
    title: "Dimensionality Reduction",
    summary: "The process of reducing the number of random variables under consideration.",
    description: `Dimensionality reduction, or dimension reduction, is the transformation of data from a high-dimensional space into a low-dimensional space so that the low-dimensional representation retains some meaningful properties of the original data, ideally close to its intrinsic dimension.`
  },
  {
    id: "feature-engineering",
    title: "Feature Engineering",
    summary: "The process of using domain knowledge to extract features from raw data.",
    description: `Feature engineering is the process of using domain knowledge to extract features (characteristics, properties, attributes) from raw data. The motivation is to use these extra features to improve the quality of results from a machine learning process, compared with supplying only the raw data to the machine learning process.`
  },
  {
    id: "ensemble-learning",
    title: "Ensemble Learning",
    summary: "A machine learning paradigm where multiple models are trained to solve the same problem.",
    description: `In statistics and machine learning, ensemble methods use multiple learning algorithms to obtain better predictive performance than could be obtained from any of the constituent learning algorithms alone. Unlike a statistical ensemble in statistical mechanics, which is usually infinite, a machine learning ensemble refers to only a concrete finite set of alternative models, but typically allows for much more flexible structure to exist among those alternatives.`
  },
  {
    id: "supervised-learning",
    title: "Supervised Learning",
    summary: "A type of machine learning where the algorithm learns on a labeled dataset.",
    description: `Supervised learning is the machine learning task of learning a function that maps an input to an output based on example input-output pairs. It infers a function from labeled training data consisting of a set of training examples. In supervised learning, each example is a pair consisting of an input object (typically a vector) and a desired output value (also called the supervisory signal).`
  },
  {
    id: "unsupervised-learning",
    title: "Unsupervised Learning",
    summary: "A type of machine learning where the algorithm learns from unlabeled data.",
    description: `Unsupervised learning is a type of machine learning that looks for previously undetected patterns in a data set with no pre-existing labels and with a minimum of human supervision. In contrast to supervised learning that usually makes use of human-labeled data, unsupervised learning, also known as self-organization, allows for modeling of probability densities over inputs.`
  },
  {
    id: "reinforcement-learning",
    title: "Reinforcement Learning",
    summary: "An area of machine learning concerned with how intelligent agents ought to take actions in an environment.",
    description: `Reinforcement learning (RL) is an area of machine learning concerned with how intelligent agents ought to take actions in an environment in order to maximize the notion of cumulative reward. Reinforcement learning is one of three basic machine learning paradigms, alongside supervised learning and unsupervised learning.`
  },
  {
    id: "deep-learning",
    title: "Deep Learning",
    summary: "Part of a broader family of machine learning methods based on artificial neural networks.",
    description: `Deep learning is part of a broader family of machine learning methods based on artificial neural networks with representation learning. The adjective "deep" in deep learning refers to the use of multiple layers in the network. Methods used can be either supervised, semi-supervised or unsupervised.`
  },
  {
    id: "artificial-neural-network",
    title: "Artificial Neural Network (ANN)",
    summary: "Computing systems inspired by the biological neural networks that constitute animal brains.",
    description: `Artificial neural networks (ANNs), usually simply called neural networks (NNs), are computing systems inspired by the biological neural networks that constitute animal brains. An ANN is based on a collection of connected units or nodes called artificial neurons, which loosely model the neurons in a biological brain.`
  },
  {
    id: "convolutional-neural-network",
    title: "Convolutional Neural Network (CNN)",
    summary: "A class of deep neural networks, most commonly applied to analyzing visual imagery.",
    description: `In deep learning, a convolutional neural network (CNN, or ConvNet) is a class of artificial neural network, most commonly applied to analyze visual imagery. They have applications in image and video recognition, recommender systems, image classification, medical image analysis, natural language processing, and financial time series.`
  },
  {
    id: "recurrent-neural-network",
    title: "Recurrent Neural Network (RNN)",
    summary: "A class of artificial neural networks where connections between nodes form a directed graph along a temporal sequence.",
    description: `A recurrent neural network (RNN) is a class of artificial neural networks where connections between nodes form a directed or undirected graph along a temporal sequence. This allows it to exhibit temporal dynamic behavior. Derived from feedforward neural networks, RNNs can use their internal state (memory) to process variable length sequences of inputs.`
  },
  {
    id: "natural-language-processing",
    title: "Natural Language Processing (NLP)",
    summary: "A subfield of AI concerned with the interactions between computers and human language.",
    description: `Natural language processing (NLP) is a subfield of linguistics, computer science, and artificial intelligence concerned with the interactions between computers and human language, in particular how to program computers to process and analyze large amounts of natural language data.`
  },
  {
    id: "bag-of-words-model",
    title: "Bag-of-words Model",
    summary: "A simplifying representation used in natural language processing and information retrieval.",
    description: `The bag-of-words model is a simplifying representation used in natural language processing and information retrieval (IR). In this model, a text (such as a sentence or a document) is represented as the bag (multiset) of its words, disregarding grammar and even word order but keeping multiplicity.`
  },
  {
    id: "tf-idf",
    title: "TF-IDF",
    summary: "A numerical statistic that is intended to reflect how important a word is to a document in a collection or corpus.",
    description: `In information retrieval, tf–idf (also TF*IDF, TF-IDF, TFIDF, TF/IDF, or Tf-idf), short for term frequency–inverse document frequency, is a numerical statistic that is intended to reflect how important a word is to a document in a collection or corpus. It is often used as a weighting factor in searches of information retrieval, text mining, and user modeling.`
  },
  {
    id: "word-embedding",
    title: "Word Embedding",
    summary: "A term used for the representation of words for text analysis, typically in the form of a real-valued vector.",
    description: `Word embedding is the collective name for a set of language modeling and feature learning techniques in natural language processing where words or phrases from the vocabulary are mapped to vectors of real numbers. Conceptually it involves a mathematical embedding from a space with many dimensions per word to a continuous vector space with a much lower dimension.`
  },
  {
    id: "auc-roc-curve",
    title: "AUC-ROC Curve",
    summary: "A performance measurement for classification problem at various thresholds settings.",
    description: `In statistics, a receiver operating characteristic curve, or ROC curve, is a graphical plot that illustrates the diagnostic ability of a binary classifier system as its discrimination threshold is varied. The AUC (Area Under the ROC Curve) provides an aggregate measure of performance across all possible classification thresholds.`
  },
  {
    id: "confusion-matrix",
    title: "Confusion Matrix",
    summary: "A table used to describe the performance of a classification model on a set of test data.",
    description: `In the field of machine learning and specifically the problem of statistical classification, a confusion matrix, also known as an error matrix, is a specific table layout that allows visualization of the performance of an algorithm, typically a supervised learning one. Each row of the matrix represents the instances in an actual class while each column represents the instances in a predicted class, or vice versa.`
  },
  {
    id: "precision-and-recall",
    title: "Precision and Recall",
    summary: "Metrics for classification tasks.",
    description: `Precision and recall are two important metrics used to evaluate the performance of a classification model. Precision (also called positive predictive value) is the fraction of relevant instances among the retrieved instances, while recall (also known as sensitivity) is the fraction of relevant instances that were retrieved.`
  },
  {
    id: "f1-score",
    title: "F1 Score",
    summary: "The harmonic mean of precision and recall.",
    description: `In statistical analysis of binary classification, the F-score or F-measure is a measure of a test's accuracy. It is calculated from the precision and recall of the test, where the precision is the number of true positive results divided by the number of all positive results, including those not identified correctly, and the recall is the number of true positive results divided by the number of all samples that should have been identified as positive.`
  },
  {
    id: "bias-variance-tradeoff",
    title: "Bias-Variance Tradeoff",
    summary: "A central problem in supervised learning.",
    description: `The bias–variance tradeoff is the property of a set of predictive models whereby models with a lower bias in parameter estimation have a higher variance of the parameter estimates across samples, and vice versa. The bias–variance dilemma or problem is the conflict in trying to simultaneously minimize these two sources of error that prevent supervised learning algorithms from generalizing beyond their training set.`
  },
  {
    id: "kolmogorov-smirnov-test",
    title: "Kolmogorov-Smirnov Test",
    summary: "A nonparametric test of the equality of continuous, one-dimensional probability distributions.",
    description: `The Kolmogorov–Smirnov test (K–S test or KS test) is a nonparametric test of the equality of continuous, one-dimensional probability distributions that can be used to compare a sample with a reference probability distribution (one-sample K–S test), or to compare two samples (two-sample K–S test).`
  },
  {
    id: "mann-whitney-u-test",
    title: "Mann-Whitney U Test",
    summary: "A nonparametric test of the null hypothesis that two samples come from the same population.",
    description: `The Mann–Whitney U test (also called the Mann–Whitney–Wilcoxon (MWW), Wilcoxon rank-sum test, or Wilcoxon–Mann–Whitney test) is a nonparametric test of the null hypothesis that, for randomly selected values X and Y from two populations, the probability of X being greater than Y is equal to the probability of Y being greater than X.`
  },
  {
    id: "wilcoxon-signed-rank-test",
    title: "Wilcoxon Signed-Rank Test",
    summary: "A non-parametric statistical hypothesis test used to compare two related samples.",
    description: `The Wilcoxon signed-rank test is a non-parametric statistical hypothesis test used either to test the location of a population based on a sample of data, or to compare the locations of two populations using a paired sample.`
  },
  {
    id: "spearmans-rank-correlation",
    title: "Spearman's Rank Correlation",
    summary: "A nonparametric measure of rank correlation.",
    description: `In statistics, Spearman's rank correlation coefficient or Spearman's ρ, named after Charles Spearman and often denoted by the Greek letter ρ (rho) or as rs, is a nonparametric measure of rank correlation (statistical dependence between the rankings of two variables).`
  },
  {
    id: "kendalls-tau",
    title: "Kendall's Tau",
    summary: "A statistic used to measure the ordinal association between two measured quantities.",
    description: `In statistics, the Kendall rank correlation coefficient, commonly referred to as Kendall's τ coefficient (after the Greek letter τ, tau), is a statistic used to measure the ordinal association between two measured quantities. A τ test is a non-parametric hypothesis test for statistical dependence based on the τ coefficient.`
  },
  {
    id: "kruskal-wallis-test",
    title: "Kruskal-Wallis Test",
    summary: "A non-parametric method for testing whether samples originate from the same distribution.",
    description: `The Kruskal–Wallis test by ranks, Kruskal–Wallis H test, or one-way ANOVA on ranks is a non-parametric method for testing whether samples originate from the same distribution. It is used for comparing two or more independent samples of equal or different sample sizes.`
  },
  {
    id: "friedman-test",
    title: "Friedman Test",
    summary: "A non-parametric statistical test used to detect differences in treatments across multiple test attempts.",
    description: `The Friedman test is a non-parametric statistical test developed by Milton Friedman. Similar to the parametric repeated measures ANOVA, it is used to detect differences in treatments across multiple test attempts.`
  },
  {
    id: "shapiro-wilk-test",
    title: "Shapiro-Wilk Test",
    summary: "A test of normality in frequentist statistics.",
    description: `The Shapiro–Wilk test is a test of normality in frequentist statistics. It was published in 1965 by Samuel Sanford Shapiro and Martin Wilk.`
  },
  {
    id: "levenes-test",
    title: "Levene's Test",
    summary: "An inferential statistic used to assess the equality of variances for a variable.",
    description: `In statistics, Levene's test is an inferential statistic used to assess the equality of variances for a variable calculated for two or more groups. Some common statistical procedures assume that variances of the populations from which different samples are drawn are equal.`
  },
  {
    id: "bartletts-test",
    title: "Bartlett's Test",
    summary: "Used to test if multiple samples are from populations with equal variances.",
    description: `In statistics, Bartlett's test, named after Maurice Stevenson Bartlett, is used to test homoscedasticity, that is, if multiple samples are from populations with equal variances.`
  },
  {
    id: "outlier-detection",
    title: "Outlier Detection",
    summary: "The identification of rare items, events or observations which raise suspicions.",
    description: `In data mining, anomaly detection (also outlier detection) is the identification of rare items, events or observations which raise suspicions by differing significantly from the majority of the data. Typically the anomalous items will translate to some kind of problem such as bank fraud, a structural defect, medical problems or errors in a text.`
  },
  {
    id: "imputation",
    title: "Imputation",
    summary: "The process of replacing missing data with substituted values.",
    description: `In statistics, imputation is the process of replacing missing data with substituted values. When substituting for a data point, it is known as "unit imputation"; when substituting for a component of a data point, it is known as "item imputation".`
  },
  {
    id: "data-cleansing",
    title: "Data Cleansing",
    summary: "The process of detecting and correcting corrupt or inaccurate records from a record set.",
    description: `Data cleansing or data cleaning is the process of detecting and correcting (or removing) corrupt or inaccurate records from a record set, table, or database and refers to identifying incomplete, incorrect, inaccurate or irrelevant parts of the data and then replacing, modifying, or deleting the dirty or coarse data.`
  },
  {
    id: "etl",
    title: "ETL (Extract, Transform, Load)",
    summary: "A type of data integration used to blend data from multiple sources.",
    description: `In computing, extract, transform, load (ETL) is a three-phase data integration process in which data is extracted from a source system, transformed into a different format, and then loaded into a data warehousing system. The ETL process is often used to prepare data for analysis and business intelligence applications.`
  }
];

