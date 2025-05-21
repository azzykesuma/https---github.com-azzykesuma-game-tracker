'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';

const BackButton = () => {
    const router = useRouter();
  return (
    <Button onClick={() => router.back()}>
      Back
    </Button>
  )
}

export default BackButton
