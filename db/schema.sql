create table if not exists vibecoding_interest_responses (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 50),
  oikos text check (oikos is null or char_length(oikos) <= 50),
  interest text not null check (
    interest in ('열리면 참여할게요', '관심 있어요', '이번에는 어려워요')
  ),
  topics text[] not null check (cardinality(topics) between 1 and 6),
  ai_usage text,
  additional_topic text,
  created_at timestamptz not null default now()
);

alter table vibecoding_interest_responses
  add column if not exists ai_usage text,
  add column if not exists additional_topic text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'vibecoding_interest_responses_topics_allowed'
      and conrelid = 'vibecoding_interest_responses'::regclass
  ) then
    alter table vibecoding_interest_responses
      add constraint vibecoding_interest_responses_topics_allowed
      check (
        topics <@ array[
          'AI를 일상에서 더 잘 쓰기',
          '나만의 웹페이지 만들기',
          '모임에 필요한 도구 만들기',
          '반복되는 일 줄이기',
          'AI에게 일을 맡겨보기',
          '먼저 가능성 둘러보기'
        ]::text[]
      );
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'vibecoding_interest_responses_ai_usage_allowed'
      and conrelid = 'vibecoding_interest_responses'::regclass
  ) then
    alter table vibecoding_interest_responses
      add constraint vibecoding_interest_responses_ai_usage_allowed
      check (
        ai_usage is null or ai_usage in (
          '거의 사용하지 않아요',
          '가끔 사용해요',
          '자주 사용해요',
          '업무에 적극 활용해요'
        )
      );
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'vibecoding_interest_responses_additional_topic_length'
      and conrelid = 'vibecoding_interest_responses'::regclass
  ) then
    alter table vibecoding_interest_responses
      add constraint vibecoding_interest_responses_additional_topic_length
      check (additional_topic is null or char_length(additional_topic) <= 200);
  end if;
end $$;
