'use client';
import React, { useEffect, useState } from 'react';
import { ContentPage } from '@/components/ContentPage';
import { CONTENT_DATA } from '@/lib/contentData';
import NavigationBar from '@/components/Navbar';
import { Question } from '@/lib/types';
import Footer from '@/components/Footer';
import { SpinningText } from '@/components/ui/loader';

type Slug = keyof typeof CONTENT_DATA;

interface PageProps {
  params: Promise<{ slug: Slug }>;
}

export default function DynamicPage({ params }: PageProps) {
  const [data, setData] = React.useState<(typeof CONTENT_DATA)[Slug] | null>(
    null
  );
  const [questions, setQuestions] = useState<Question[]>([]);

  const resolvedParams = React.use(params);

  useEffect(() => {
    setData(CONTENT_DATA[resolvedParams.slug]);
  }, [resolvedParams.slug]);

  useEffect(() => {
    async function fetchQuestions() {
      const res = await fetch(`/api/questions?section=${resolvedParams.slug}`);
      const data = await res.json();
      setQuestions(data);
    }
    fetchQuestions();
  }, [resolvedParams.slug]);

  if (!data)
    return (
      <div className='fixed inset-0 flex items-center justify-center z-50'>
        <SpinningText className='text-4xl' duration={4} radius={4}>
          Loading data
        </SpinningText>
      </div>
    );

  return (
    <>
      <div className='sticky w-full top-10 z-20 px-4'>
        <NavigationBar />
      </div>
      <ContentPage {...data} questions={questions} />
      <Footer />
    </>
  );
}
