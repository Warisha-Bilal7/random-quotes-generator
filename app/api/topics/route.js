import { NextResponse } from 'next/server';

// Available topics for quotes
const topics = [
  'motivation',
  'success',
  'life',
  'love',
  'wisdom',
  'inspirational',
  'friendship',
  'happiness',
  'leadership',
  'business',
  'education',
  'family'
];

export async function GET() {
  return NextResponse.json({ topics });
}