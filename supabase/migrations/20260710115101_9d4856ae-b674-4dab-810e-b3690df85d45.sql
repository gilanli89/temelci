
DROP POLICY IF EXISTS "Anyone submits leads" ON public.leads;
CREATE POLICY "Anyone submits leads" ON public.leads FOR INSERT WITH CHECK (
  (email IS NULL OR char_length(email) <= 255)
  AND (name IS NULL OR char_length(name) <= 200)
  AND (phone IS NULL OR char_length(phone) <= 50)
  AND (message IS NULL OR char_length(message) <= 5000)
  AND source IN ('contact','whatsapp','xray','quote','landing','popup')
);

DROP POLICY IF EXISTS "Anyone submits xray requests" ON public.xray_requests;
CREATE POLICY "Anyone submits xray requests" ON public.xray_requests FOR INSERT WITH CHECK (
  char_length(patient_name) BETWEEN 1 AND 200
  AND char_length(phone) BETWEEN 3 AND 50
  AND (email IS NULL OR char_length(email) <= 255)
  AND char_length(xray_image_url) BETWEEN 1 AND 2000
  AND (message IS NULL OR char_length(message) <= 5000)
);
