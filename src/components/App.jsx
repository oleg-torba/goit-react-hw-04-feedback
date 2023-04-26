import { useState } from 'react';
import { FeedbackOptions } from './feedback/FeedbackOptions';
import { Statistic } from './statistic/Statistic';
import { Section } from './section/Section';
import { Notification } from './notification/Notification';

export function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;

  const onLeaveFeedback = e => {
    const name = e.target.name;

    // eslint-disable-next-line default-case
    switch (name) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;

      case 'neutral':
        setNeutral(prevState => prevState + 1);
    }
  };
  const countPositiveFeedbackPercentage = () => {
    return Math.round((good * 100) / total);
  };

  const positive = countPositiveFeedbackPercentage();

  return (
    <div className="feedback">
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys({ good, bad, neutral })}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      <Section>
        {total !== 0 ? (
          <Statistic
            good={good}
            bad={bad}
            neutral={neutral}
            total={total}
            positive={positive}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
}
