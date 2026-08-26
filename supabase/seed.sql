insert into public.drugs (name, generic_name, manufacturer, indication, source, external_id, metadata)
values
  ('Keytruda', 'pembrolizumab', 'Merck', 'PD-1 inhibitor used in multiple cancers', 'demo', 'demo-drug-keytruda', '{"therapeutic_area":"oncology"}'::jsonb),
  ('Ozempic', 'semaglutide', 'Novo Nordisk', 'GLP-1 receptor agonist for type 2 diabetes', 'demo', 'demo-drug-ozempic', '{"therapeutic_area":"metabolism"}'::jsonb)
on conflict do nothing;

insert into public.publications (title, abstract, authors, journal, published_on, url, source, external_id)
values
  ('Pembrolizumab in advanced melanoma', 'Demo abstract summarizing checkpoint inhibition in melanoma.', 'Demo Author et al.', 'Demo Journal of Oncology', '2024-06-01', 'https://example.com/publications/pembrolizumab', 'demo', 'demo-pub-001'),
  ('Semaglutide outcomes in type 2 diabetes', 'Demo abstract on glycemic control and weight outcomes.', 'Demo Author et al.', 'Demo Endocrinology Review', '2024-09-15', 'https://example.com/publications/semaglutide', 'demo', 'demo-pub-002')
on conflict do nothing;

insert into public.clinical_trials (title, nct_id, status, phase, condition, sponsor, source, external_id)
values
  ('Pembrolizumab combination study in NSCLC', 'NCT00000001', 'Recruiting', 'Phase 3', 'Non-small cell lung cancer', 'Demo Oncology Network', 'demo', 'demo-trial-001'),
  ('Semaglutide cardiovascular outcomes study', 'NCT00000002', 'Active, not recruiting', 'Phase 3', 'Type 2 diabetes', 'Demo Cardiometabolic Group', 'demo', 'demo-trial-002')
on conflict do nothing;
