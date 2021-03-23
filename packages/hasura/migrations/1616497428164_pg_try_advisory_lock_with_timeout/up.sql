CREATE FUNCTION pg_try_advisory_lock_with_timeout(key1 int, key2 int, l_tmp_lock_timeout text) RETURNS boolean
AS $$
BEGIN
  EXECUTE format('SET lock_timeout = %L', l_tmp_lock_timeout);
  PERFORM pg_advisory_lock(key1, key2);
  RETURN true;
EXCEPTION
  WHEN lock_not_available OR deadlock_detected THEN
    RETURN false;
END;
$$
LANGUAGE plpgsql;
