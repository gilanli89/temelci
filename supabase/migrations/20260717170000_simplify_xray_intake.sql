-- Capture the patient's earliest realistic travel date as a structured field
-- so the clinical and coordination teams can prioritize actionable cases.
alter table public.xray_requests
  add column if not exists preferred_visit_date date;

create index if not exists xray_requests_preferred_visit_idx
  on public.xray_requests (preferred_visit_date, created_at desc)
  where status <> 'archived';

drop policy if exists "Patients submit private xray cases" on public.xray_requests;
create policy "Patients submit private xray cases" on public.xray_requests for insert to anon
  with check (
    status = 'new'
    and doctor_id is null
    and annotated_image_url is null
    and coalesce(annotations, '[]'::jsonb) = '[]'::jsonb
    and doctor_notes is null
    and coalesce(price_total, 0) = 0
    and patient_consent_at is not null
    and char_length(patient_name) between 1 and 200
    and char_length(phone) between 7 and 50
    and (email is null or char_length(email) <= 255)
    and (message is null or char_length(message) <= 5000)
    and preferred_visit_date is not null
    and preferred_visit_date >= current_date
    and xray_image_url like 'requests/%'
  );

comment on column public.xray_requests.preferred_visit_date is
  'Earliest date the patient says they can attend the clinic.';
