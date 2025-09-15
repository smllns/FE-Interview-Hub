'use client';
import { useDarkMode } from '@/hooks/isDarkTheme';
import { useRef, useState } from 'react';
import ToggleFilter from './ToggleFilter';
import { DifficultyBento } from './DifficultyBento';
import { TopicsBento } from './TopicsBento';
import ContentPageHero from './ContentPageHero';
import { useScrollTo } from '@/hooks/useScrollTo';
import { useShuffledFilter } from '@/hooks/useShuffledFilter';
import { SkeletonList } from './SkeletonList';
import { Question } from '@/lib/types';
import ModeToggle from './ModeToggle';
import QuestionsList from './QuestionsList';

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

      <div className='min-h-screen w-full flex flex-col' ref={mainRef}>
        <div className='flex justify-center px-8 pt-32'>
          <ToggleFilter
            options={['complexity', 'topics', 'all']}
            selected={filterMode}
            onChange={setFilterMode}
            title='Filter by:'
          />
        </div>

        <div className='flex-1 flex items-center justify-center px-4'>
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
            <div className='w-full max-w-3xl space-y-6 py-8'>
              <ModeToggle
                questionsFilterMode={questionsFilterMode}
                setQuestionsFilterMode={setQuestionsFilterMode}
                pt={false}
              />
              {shuffledQuestions.length === 0 ? (
                <SkeletonList count={5} isDark={isDark} />
              ) : (
                <QuestionsList
                  questions={shuffledQuestions}
                  isDark={isDark}
                  questionsFilterMode={questionsFilterMode}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {filterMode !== 'all' && (
        <div
          className='min-h-screen flex flex-col justify-center items-center px-4'
          ref={filteredRef}
        >
          <ModeToggle
            questionsFilterMode={questionsFilterMode}
            setQuestionsFilterMode={setQuestionsFilterMode}
            pt={true}
          />
          <div className='w-full max-w-3xl space-y-6 pb-8 mx-auto'>
            {filteredQuestions.length === 0 ? (
              <SkeletonList count={5} isDark={isDark} />
            ) : (
              <QuestionsList
                questions={filteredQuestions}
                isDark={isDark}
                questionsFilterMode={questionsFilterMode}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
