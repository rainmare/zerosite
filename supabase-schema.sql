-- Run this in your Supabase SQL Editor to set up the database

-- Bookings table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  service_tier TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  platform TEXT NOT NULL,
  notes TEXT,
  stripe_session_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blocked slots (for the reader to mark unavailable times)
CREATE TABLE blocked_slots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(date, time)
);

-- Indexes for fast lookups
CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_bookings_date_time ON bookings(date, time);
CREATE INDEX idx_blocked_slots_date ON blocked_slots(date);

-- Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_slots ENABLE ROW LEVEL SECURITY;

-- Only the service role can read/write bookings (no public access)
CREATE POLICY "Service role only" ON bookings
  FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role only" ON blocked_slots
  FOR ALL
  USING (auth.role() = 'service_role');
