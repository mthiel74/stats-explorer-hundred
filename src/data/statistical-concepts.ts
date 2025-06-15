
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
  }
];
