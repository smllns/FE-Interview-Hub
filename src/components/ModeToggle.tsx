import React from 'react';
import ToggleFilter from './ToggleFilter';

type ModeToggleProps = {
  questionsFilterMode: string;
  setQuestionsFilterMode: (value: string) => void;
  pt?: boolean;
};

const ModeToggle: React.FC<ModeToggleProps> = ({
  questionsFilterMode,
  setQuestionsFilterMode,
  pt,
}) => {
  return (
    <div className={`flex justify-center px-8 pb-8 ${pt ? 'pt-32' : ''}`}>
      <ToggleFilter
        options={['practice', 'study']}
        selected={questionsFilterMode}
        onChange={setQuestionsFilterMode}
        title='Display mode'
      />
    </div>
  );
};

export default ModeToggle;
