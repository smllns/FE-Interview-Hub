// content section shown on every learning page
'use client';
import { useDarkMode } from '@/hooks/isDarkTheme';
import { useRef, useState } from 'react';
import ToggleFilter from './ToggleFilter';
import { DifficultyBento } from './DifficultyBento';
import { TopicsBento } from './TopicsBento';
import ContentPageHero from './ContentPageHero';
import { useScrollTo } from '@/hooks/useScrollTo';
import { useShuffledFilter } from '@/hooks/useShuffledFilter';
import { Question } from '@/lib/types';
import QuestionComponent from './QuestionComponent';

interface ContentPageProps {
  title: string;
  description: string;
  topics: string[];
  questions: Question[];
}

export function ContentPage({
  title,
  description,
  topics,
  questions,
}: ContentPageProps) {
  const [filterMode, setFilterMode] = useState('complexity');
  const [questionsFilterMode, setQuestionsFilterMode] = useState('practice');
  const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);

  const mainRef = useRef<HTMLDivElement | null>(null);
  const filteredRef = useRef<HTMLDivElement | null>(null);

  const isDark = useDarkMode();

  const scrollToMain = useScrollTo(mainRef);
  const scrollToFiltered = useScrollTo(filteredRef);

  const shuffledQuestions = useShuffledFilter(questions);

  const filteredQuestionsDifficulty = useShuffledFilter(
    questions,
    'difficulty',
    selectedDifficulty
  );

  const filteredQuestionsTopics = useShuffledFilter(
    questions,
    'topic',
    selectedTopic
  );

  const filteredQuestions =
    filterMode === 'complexity'
      ? filteredQuestionsDifficulty
      : filterMode === 'topics'
      ? filteredQuestionsTopics
      : shuffledQuestions;

  return (
    <div className='w-screen'>
      <ContentPageHero
        isDark={isDark}
        title={title}
        description={description}
        scrollToMain={scrollToMain}
      />

      <div
        className='min-h-screen max-w-dvw overflow-x-hidden flex  flex-col'
        ref={mainRef}
      >
        <div className='flex justify-center px-8 pt-32'>
          <ToggleFilter
            options={['complexity', 'topics', 'all']}
            selected={filterMode}
            onChange={setFilterMode}
            title='Filter by:'
          />
        </div>

        <div className='flex-1 flex items-center justify-center '>
          {filterMode === 'complexity' && (
            <DifficultyBento
              isDark={isDark}
              selectedDifficulty={selectedDifficulty}
              onSelectedDifficulty={(level) => {
                setSelectedDifficulty(level);
                scrollToFiltered();
              }}
            />
          )}
          {filterMode === 'topics' && (
            <TopicsBento
              isDark={isDark}
              topics={topics}
              selectedTopic={selectedTopic}
              onSelectedTopic={(topic) => {
                setSelectedTopic(topic);
                scrollToFiltered();
              }}
            />
          )}
          {filterMode === 'all' && (
            <QuestionComponent
              isDark={isDark}
              questions={shuffledQuestions}
              questionsFilterMode={questionsFilterMode}
              setQuestionsFilterMode={setQuestionsFilterMode}
              count={300}
              pt={false}
            />
          )}
        </div>
      </div>

      {filterMode !== 'all' && (
        <QuestionComponent
          isDark={isDark}
          questions={filteredQuestions}
          questionsFilterMode={questionsFilterMode}
          setQuestionsFilterMode={setQuestionsFilterMode}
          count={80}
          ref={filteredRef}
          pt={true}
        />
      )}
    </div>
  );
}
