'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Calendar } from '~/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

const DateSelector = ({title, paramName}: {title: string, paramName: string}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const dateParam = searchParams.get(paramName);
  const currentDate = dateParam ? new Date(dateParam) : new Date();

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      const formattedDate = newDate.toISOString();
      // Create a new URLSearchParams object with current parameters
      const updatedSearchParams = new URLSearchParams(searchParams.toString());
      
      // Update or add the date parameter
      updatedSearchParams.set(paramName, formattedDate);
      
      // Push the new URL with updated search params
      router.push(`?${updatedSearchParams.toString()}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={currentDate}
          onSelect={handleDateSelect}
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  );
};

export default DateSelector;