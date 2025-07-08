import { createClient } from '@supabase/supabase-js';

// Вставьте свой URL и ключ проекта
const supabaseUrl = 'https://fjzbgaflzavzcwfoozcs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqemJnYWZsemF2emN3Zm9vemNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczOTM4ODMsImV4cCI6MjA2Mjk2OTg4M30.mTC_-_hacoYgO4gAhXE1A9QoW-V6oS6UNfozzlrh_w4';
export const supabase = createClient(supabaseUrl, supabaseKey);
