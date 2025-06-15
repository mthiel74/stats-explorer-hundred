
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
  }
];
