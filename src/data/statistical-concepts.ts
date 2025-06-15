
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
  }
];
