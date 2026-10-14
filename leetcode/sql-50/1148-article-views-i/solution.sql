-- 1148. Article Views I
-- Authors who viewed their own article, deduplicated and sorted.
SELECT DISTINCT author_id AS id
FROM Views
WHERE author_id = viewer_id
ORDER BY id;
