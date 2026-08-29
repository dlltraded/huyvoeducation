-- Migration: validate_referral_code RPC
-- Cho phép form đăng ký (anonymous) kiểm tra mã giới thiệu
-- mà không expose toàn bộ bảng referrers công khai.
--
-- Trả về {referrer_name, discount_amount} nếu mã hợp lệ + is_active,
-- trả về empty result set nếu mã không tồn tại hoặc is_active = false.

create or replace function public.validate_referral_code(p_code text)
returns table(referrer_name text, discount_amount numeric)
language sql
security definer   -- chạy với quyền owner, bypass RLS của referrers
stable             -- không side-effect, có thể cache
as $$
  select
    r.name::text                  as referrer_name,
    s.default_discount_amount     as discount_amount
  from  public.referrers r
  cross join public.referral_settings s
  where upper(trim(r.referral_code)) = upper(trim(p_code))
    and r.is_active = true
  limit 1;
$$;

-- Cho phép anonymous (public form) gọi function này
grant execute on function public.validate_referral_code(text) to anon;
grant execute on function public.validate_referral_code(text) to authenticated;

comment on function public.validate_referral_code(text) is
  'Validates a referral code entered on the registration form. '
  'Returns (referrer_name, discount_amount) if the code is active, empty set otherwise. '
  'Safe for anon callers — does NOT expose phone/commission/other PII from the referrers table.';