-- Create a table for memos based on the existing Memo interface
create table memos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  category text not null,
  tags jsonb default '[]'::jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create an index on created_at for efficient sorting
create index idx_memos_created_at on memos(created_at desc);

-- Create an index on category for efficient filtering
create index idx_memos_category on memos(category);

-- Create a GIN index on tags for efficient tag searching
create index idx_memos_tags on memos using gin(tags);

-- Enable Row Level Security (RLS) - uncomment if you want to add user-specific access later
-- alter table memos enable row level security;

-- Create a function to automatically update updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create a trigger to automatically update updated_at
create trigger update_memos_updated_at
  before update on memos
  for each row
  execute function update_updated_at_column();